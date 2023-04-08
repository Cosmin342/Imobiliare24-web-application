using Ardalis.Specification;
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
    private readonly IAddressService _addressService;

    public AnnouncementService(IRepository<WebAppDatabaseContext> repository, IBuildingService buildingService, IAddressService addressService)
    {
        _repository = repository;
        _buildingService = buildingService;
        _addressService = addressService;
    }
    public async Task<ServiceResponse<AnnouncementDTO>> GetAnnouncement(Guid id, CancellationToken cancellationToken = default)
    {
        var result = await _repository.GetAsync(new AnnouncementSpec(id), cancellationToken);
        
        return result != null ?
            ServiceResponse<AnnouncementDTO>.ForSuccess(result) :
            ServiceResponse<AnnouncementDTO>.FromError(CommonErrors.AnnouncementNotFound);
    }

    public async Task<ServiceResponse<PagedResponse<AnnouncementDTO>>> GetAnnouncements(PaginationSearchQueryParams pagination, bool? active, bool? forCurrentUser, Guid userId, CancellationToken cancellationToken = default)
    {
        var result = await _repository.PageAsync(pagination, new AnnouncementSpec(pagination.Search, active, forCurrentUser, userId), cancellationToken);

        return ServiceResponse<PagedResponse<AnnouncementDTO>>.ForSuccess(result);
    }

    public async Task<ServiceResponse> AddAnnouncement(AnnouncementAddDTO announcement, UserDTO? requestingUser, CancellationToken cancellationToken = default)
    {
        if (requestingUser != null && (requestingUser.Role != UserRoleEnum.Admin && requestingUser.Role != UserRoleEnum.Personnel))
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin or a personnel user can add announcements!", ErrorCodes.CannotAdd));
        }

        //var address = await _repository.GetAsync(new AddressSpec(announcement.City, announcement.County, announcement.Street, announcement.StreetNumber), cancellationToken);

        //if (address == null)
        //{
        //    address = new Address
        //    {
        //        City = announcement.City,
        //        County = announcement.County,
        //        Street = announcement.Street,
        //        Number = announcement.StreetNumber
        //    };
        //    await _repository.AddAsync(address, cancellationToken);
        //}

        await _addressService.AddAddress(new()
        {
            Street = announcement.Street,
            City = announcement.City,
            County = announcement.County,
            Number = announcement.StreetNumber,
        }, requestingUser);

        var address = _addressService.GetAddressByFields(announcement.County, announcement.City, announcement.Street, announcement.StreetNumber);

        var building = await _repository.GetAsync(new BuildingSpec(announcement.Surface, announcement.RoomsNumber, announcement.Year, address.Id), cancellationToken);

        if (building != null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Conflict, "There is already an announcement for this building!", ErrorCodes.CannotAdd));
        }
        
        building = new Building
        {
            Surface = announcement.Surface,
            RoomsNumber = announcement.RoomsNumber,
            Year = announcement.Year,
            Address = address,
            AddressId = address.Id,
        };
        await _repository.AddAsync(building, cancellationToken);

        await _repository.AddAsync(new Announcement
        {
            Title = announcement.Title,
            Description = announcement.Description,
            Price = announcement.Price,
            IsActive = true,
            BuildingId = building.Id,
            Building = building,
            UserId = requestingUser.Id,
        }, cancellationToken);

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> DeleteAnnouncement(Guid id, UserDTO? requestingUser = default, CancellationToken cancellationToken = default)
    {
        var announcement = await _repository.GetAsync(new AnnouncementSpec(id), cancellationToken);

        if (announcement != null && announcement.UserId != requestingUser.Id)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the user who posted announcement can delete the announcement!", ErrorCodes.CannotDelete));
        }

        await _repository.DeleteAsync<Announcement>(id, cancellationToken);

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> DisableAnnouncement(Guid id, UserDTO? requestingUser = default, CancellationToken cancellationToken = default)
    {
        var announcement = await _repository.GetAsync(new AnnouncementUpdateSpec(id), cancellationToken);

        if (announcement != null)
        {
            if (announcement.UserId != requestingUser.Id || requestingUser.Role != UserRoleEnum.Admin)
            {
                return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the user who posted this announcement on an administrator can disable it!", ErrorCodes.CannotUpdate));
            }
            
            announcement.IsActive = false;

            await _repository.UpdateAsync(announcement, cancellationToken);

            return ServiceResponse.ForSuccess();
        }

        return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "This announcement doesn't exist!", ErrorCodes.EntityNotFound));
    }

    public async Task<ServiceResponse> Update(AnnouncementUpdateDTO announcement, UserDTO? requestingUser = default, CancellationToken cancellationToken = default)
    {
        var newAnnouncement = await _repository.GetAsync(new AnnouncementUpdateSpec(announcement.Id), cancellationToken);

        if (newAnnouncement != null)
        {
            if (newAnnouncement.UserId != requestingUser.Id)
            {
                return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the user who posted this announcement can update it!", ErrorCodes.CannotUpdate));
            }

            newAnnouncement.Price = announcement.Price;
            newAnnouncement.Title = announcement.Title;
            newAnnouncement.Description = announcement.Description;

            await _repository.UpdateAsync(newAnnouncement, cancellationToken);

            return ServiceResponse.ForSuccess();
        }

        return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "This announcement doesn't exist!", ErrorCodes.EntityNotFound));
    }
}