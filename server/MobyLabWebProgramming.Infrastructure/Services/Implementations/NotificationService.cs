using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Enums;
using MobyLabWebProgramming.Core.Errors;
using MobyLabWebProgramming.Core.Requests;
using MobyLabWebProgramming.Core.Responses;
using MobyLabWebProgramming.Infrastructure.Database;
using MobyLabWebProgramming.Infrastructure.Repositories.Interfaces;
using System.Net;

public class NotificationService : INotificationService
{
    private readonly IRepository<WebAppDatabaseContext> _repository;
    private readonly IAnnouncementUserService _announcementUserService;
    private readonly IUserNotificationService _userNotificationService;

    public NotificationService(IRepository<WebAppDatabaseContext> repository, IAnnouncementUserService announcementUserService, IUserNotificationService userNotificationService)
    {
        _repository = repository;
        _announcementUserService = announcementUserService;
        _userNotificationService = userNotificationService;
    }

    public async Task<ServiceResponse<NotificationDTO>> GetNotification(Guid id, CancellationToken cancellationToken = default)
    {
        var result = await _repository.GetAsync(new NotificationProjectionSpec(id), cancellationToken);

        return result != null ?
            ServiceResponse<NotificationDTO>.ForSuccess(result) :
            ServiceResponse<NotificationDTO>.FromError(CommonErrors.NotificationNotFound);
    }

    public async Task<ServiceResponse<PagedResponse<NotificationDTO>>> GetNotifications(PaginationSearchQueryParams pagination, Guid userId, CancellationToken cancellationToken = default)
    {
        return await _userNotificationService.GetNotificationsForUser(pagination, userId, cancellationToken);
    }

    public async Task<ServiceResponse> AddNotificationForAnnouncement(NotificationAddDTO notification, bool automaticNotification,
        Guid announcementId, UserDTO? requestingUser, List<UserDTO>? subscribers, CancellationToken cancellationToken = default)
    {
        if (!automaticNotification)
        {
            if (requestingUser == null || (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin))
            {
                return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "You haven't permissions to add notifications!", ErrorCodes.CannotAdd));
            }
        }

        var newNotification = new Notification
        {
            Title = notification.Title,
            Content = notification.Content,
        };

        await _repository.AddAsync(newNotification, cancellationToken);

        var users = subscribers != null?
            subscribers:
            (await _announcementUserService.GetUsersForAnnouncement(announcementId)).Result;

        if (users == null)
        {
            return ServiceResponse.ForSuccess();
        }

        await _userNotificationService.AddUserNotificationAssociations(newNotification.Id, users, cancellationToken);

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> DeleteNotification(Guid notificationId, UserDTO? requestingUser = default, CancellationToken cancellationToken = default)
    {
        return await _userNotificationService.DeleteNotificationForUser(notificationId, requestingUser!.Id, cancellationToken);
    }

    public async Task<ServiceResponse> Update(NotificationDTO notification, UserDTO? requestingUser = default, CancellationToken cancellationToken = default)
    {
        if (requestingUser == null || (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin))
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "You haven't permissions to update notifications!", ErrorCodes.CannotAdd));
        }

        var newNotification = await _repository.GetAsync(new NotificationSpec(notification.Id), cancellationToken);

        if (newNotification != null)
        {
            newNotification.Title = notification.Title;
            newNotification.Content = notification.Content;

            await _repository.UpdateAsync(newNotification, cancellationToken);

            return ServiceResponse.ForSuccess();
        }

        return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "This notification doesn't exist!", ErrorCodes.EntityNotFound));
    }
}