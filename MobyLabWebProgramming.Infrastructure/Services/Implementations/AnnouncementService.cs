using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Enums;
using MobyLabWebProgramming.Core.Errors;
using MobyLabWebProgramming.Core.Requests;
using MobyLabWebProgramming.Core.Responses;
using MobyLabWebProgramming.Infrastructure.Database;
using MobyLabWebProgramming.Infrastructure.Repositories.Interfaces;
using System.Net;

public class AnnouncementService : IAnnouncementService
{
    private readonly IRepository<WebAppDatabaseContext> _repository;
    private readonly IBuildingService _buildingService;
    private readonly IAnnouncementUserService _announcementUserService;
    private readonly INotificationService _notificationService;

    public AnnouncementService(IRepository<WebAppDatabaseContext> repository, IBuildingService buildingService,
        IAnnouncementUserService announcementUserService, INotificationService notificationService)
    {
        _repository = repository;
        _buildingService = buildingService;
        _announcementUserService = announcementUserService;
        _notificationService = notificationService;
    }
    public async Task<ServiceResponse<AnnouncementDTO>> GetAnnouncement(Guid id, CancellationToken cancellationToken = default)
    {
        var result = await _repository.GetAsync(new AnnouncementProjectionSpec(id), cancellationToken);

        return result != null ?
            ServiceResponse<AnnouncementDTO>.ForSuccess(result) :
            ServiceResponse<AnnouncementDTO>.FromError(CommonErrors.AnnouncementNotFound);
    }

    public async Task<ServiceResponse<PagedResponse<AnnouncementDTO>>> GetAnnouncements(PaginationSearchQueryParams pagination, bool? active, bool? forCurrentUser, Guid userId, CancellationToken cancellationToken = default)
    {
        var result = await _repository.PageAsync(pagination, new AnnouncementProjectionSpec(pagination.Search, active, forCurrentUser, userId), cancellationToken);

        return ServiceResponse<PagedResponse<AnnouncementDTO>>.ForSuccess(result);
    }

    public async Task<ServiceResponse<PagedResponse<AnnouncementDTO>>> GetAnnouncementsSubscribed(PaginationSearchQueryParams pagination, Guid userId, CancellationToken cancellationToken = default)
    {
        var result = await _repository.PageAsync(pagination, new FollowedAnnouncementsSpec(userId), cancellationToken);

        return ServiceResponse<PagedResponse<AnnouncementDTO>>.ForSuccess(result);
    }

    private ServiceResponse checkRequirements(string title, string description, int price)
    {
        if (title.Length < 16 || title.Length > 255)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden,
                "Title of an announcement must have minimum 16 and maximum 255 characters!", ErrorCodes.CannotAdd));
        }

        if (description.Length < 80 || description.Length > 1023)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden,
                "Description of an announcement must have minimum 80 and maximum 1023 characters!", ErrorCodes.CannotAdd));
        }

        if (price <= 0)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden,
                "Price of an announcement cannot be negative or 0!", ErrorCodes.CannotAdd));
        }

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> AddAnnouncement(AnnouncementAddDTO announcement, UserDTO? requestingUser, CancellationToken cancellationToken = default)
    {
        if (requestingUser != null && (requestingUser.Role != UserRoleEnum.Admin && requestingUser.Role != UserRoleEnum.Personnel))
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only an admin or a personnel user can add announcements!", ErrorCodes.CannotAdd));
        }

        var result = checkRequirements(announcement.Title, announcement.Description, announcement.Price);
        if (!result.IsOk)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Conflict, result.Error!.Message, ErrorCodes.CannotAdd));
        }

        var building = await _buildingService.AddBuilding(announcement.Building, requestingUser);

        if (!building.IsOk)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Conflict, building.Error!.Message, ErrorCodes.CannotAdd));
        }

        var newAnnouncement = new Announcement
        {
            Title = announcement.Title,
            Description = announcement.Description,
            Price = announcement.Price,
            IsActive = true,
            BuildingId = building.Result!.Id,
            UserId = requestingUser!.Id
        };

        await _repository.AddAsync(newAnnouncement, cancellationToken);

        var resultBuilding = await _buildingService.UpdateAnnouncementId(newAnnouncement.Id, building.Result.Id);

        if (!resultBuilding.IsOk)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Conflict, resultBuilding.Error.Message, ErrorCodes.CannotAdd));
        }

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> DeleteAnnouncement(Guid id, UserDTO? requestingUser = default, CancellationToken cancellationToken = default)
    {
        var announcement = await _repository.GetAsync(new AnnouncementProjectionSpec(id), cancellationToken);

        if (announcement != null && requestingUser != null && announcement.UserId != requestingUser.Id)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the user who posted announcement can delete the announcement!", ErrorCodes.CannotDelete));
        }

        await _repository.DeleteAsync<Announcement>(id, cancellationToken);

        var result = await _notificationService.AddNotificationForAnnouncement(new NotificationAddDTO
        {
            Title = "Announcement deleted",
            Content = "Announcement \"" + announcement!.Title + "\" was deleted"
        }, true, id, requestingUser);

        if (!result.IsOk)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Conflict, result.Error.Message, ErrorCodes.CannotAdd));
        }

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> DisableAnnouncement(Guid id, UserDTO requestingUser, CancellationToken cancellationToken = default)
    {
        var announcement = await _repository.GetAsync(new AnnouncementSpec(id), cancellationToken);

        if (announcement != null)
        {
            if (announcement.UserId != requestingUser.Id || requestingUser.Role != UserRoleEnum.Admin)
            {
                return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the user who posted this announcement on an administrator can disable it!", ErrorCodes.CannotUpdate));
            }

            announcement.IsActive = false;

            await _repository.UpdateAsync(announcement, cancellationToken);

            var result = await _notificationService.AddNotificationForAnnouncement(new NotificationAddDTO
            {
                Title = "Announcement disabled",
                Content = "Announcement \"" + announcement.Title + "\" was disabled"
            }, true, announcement.Id, requestingUser);

            if (!result.IsOk)
            {
                return ServiceResponse.FromError(new(HttpStatusCode.Conflict, result.Error.Message, ErrorCodes.CannotAdd));
            }

            return ServiceResponse.ForSuccess();
        }

        return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "This announcement doesn't exist!", ErrorCodes.EntityNotFound));
    }

    public async Task<ServiceResponse> Update(AnnouncementUpdateDTO announcement, UserDTO? requestingUser = default, CancellationToken cancellationToken = default)
    {
        var result = checkRequirements(announcement.Title, announcement.Description, announcement.Price);
        if (!result.IsOk)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Conflict, result.Error!.Message, ErrorCodes.CannotAdd));
        }

        var newAnnouncement = await _repository.GetAsync(new AnnouncementSpec(announcement.Id), cancellationToken);

        if (newAnnouncement != null)
        {
            if (requestingUser != null && newAnnouncement.UserId != requestingUser.Id)
            {
                return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the user who posted this announcement can update it!", ErrorCodes.CannotUpdate));
            }

            var oldTitle = newAnnouncement.Title;

            newAnnouncement.Price = announcement.Price;
            newAnnouncement.Title = announcement.Title ?? newAnnouncement.Title;
            newAnnouncement.Description = announcement.Description ?? newAnnouncement.Description;
            newAnnouncement.IsActive = announcement.IsActive;

            await _repository.UpdateAsync(newAnnouncement, cancellationToken);

            var resultNotification = await _notificationService.AddNotificationForAnnouncement(new NotificationAddDTO
            {
                Title = "Announcement updated",
                Content = "Announcement \"" + oldTitle + "\" was updated"
            }, true, announcement.Id, requestingUser);

            if (!resultNotification.IsOk)
            {
                return ServiceResponse.FromError(new(HttpStatusCode.Conflict, resultNotification.Error.Message, ErrorCodes.CannotAdd));
            }

            return ServiceResponse.ForSuccess();
        }

        return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "This announcement doesn't exist!", ErrorCodes.EntityNotFound));
    }

    public async Task<ServiceResponse> SubscribeToAnnouncement(AnnouncementUserAddDTO announcementUser, CancellationToken cancellationToken = default)
    {
        var announcement = await GetAnnouncement(announcementUser.AnnouncementId);

        if (announcement.Result != null && announcement.Result.UserId == announcementUser.UserId)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "An user can not subscribe to his own announcement!", ErrorCodes.CannotAdd));
        }

        var result = await _announcementUserService.AddAnnouncementUserAssociation(announcementUser);

        if (!result.IsOk)
        {
            return ServiceResponse.FromError(result.Error);
        }

        return ServiceResponse.ForSuccess();
    }
}