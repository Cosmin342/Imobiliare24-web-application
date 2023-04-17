using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Errors;
using MobyLabWebProgramming.Core.Requests;
using MobyLabWebProgramming.Core.Responses;
using MobyLabWebProgramming.Infrastructure.Database;
using MobyLabWebProgramming.Infrastructure.Repositories.Interfaces;
using System.Net;
public class BuildingService : IBuildingService
{
    private readonly IRepository<WebAppDatabaseContext> _repository;
    private readonly IAddressService _addressService;

    public BuildingService(IRepository<WebAppDatabaseContext> repository, IAddressService addressService)
    {
        _repository = repository;
        _addressService = addressService;
    }

    public async Task<ServiceResponse<BuildingDTO>> GetBuilding(Guid id, CancellationToken cancellationToken = default)
    {
        var result = await _repository.GetAsync(new BuildingProjectionSpec(id), cancellationToken);

        return result != null ?
            ServiceResponse<BuildingDTO>.ForSuccess(result) :
            ServiceResponse<BuildingDTO>.FromError(CommonErrors.BuildingNotFound);
    }

    public async Task<ServiceResponse<PagedResponse<BuildingDTO>>> GetBuildings(PaginationSearchQueryParams pagination, int? roomsNumber, CancellationToken cancellationToken = default)
    {
        var result = await _repository.PageAsync(pagination, new BuildingProjectionSpec(roomsNumber), cancellationToken);

        return ServiceResponse<PagedResponse<BuildingDTO>>.ForSuccess(result);
    }

    public async Task<ServiceResponse<Building>> GetBuildingNonDTO(Guid id, CancellationToken cancellationToken = default)
    {
        var result = await _repository.GetAsync(new BuildingSpec(id), cancellationToken);

        return result != null ?
            ServiceResponse<Building>.ForSuccess(result) :
            ServiceResponse<Building>.FromError(CommonErrors.BuildingNotFound);
    }

    public async Task<ServiceResponse<BuildingDTO>> AddBuilding(BuildingAddDTO building, UserDTO? requestingUser, CancellationToken cancellationToken = default)
    {
        if (building.Surface <= 0)
        {
            return ServiceResponse<BuildingDTO>.FromError(new(HttpStatusCode.Conflict,
                "Surface of a building cannot be negative or 0!", ErrorCodes.CannotAdd));
        }

        if (building.RoomsNumber <= 0)
        {
            return ServiceResponse<BuildingDTO>.FromError(new(HttpStatusCode.Conflict,
                "Number of the rooms for a building cannot be negative or 0!", ErrorCodes.CannotAdd));
        }

        var address = await _addressService.AddAddress(building.Address, requestingUser);
        if (!address.IsOk)
        {
            address.Result = (await _addressService.GetAddressByFields(building.Address.County, building.Address.City, building.Address.Street, building.Address.Number, cancellationToken)).Result;
        }

        var newBuilding = await _repository.GetAsync(new BuildingSpec(building.Surface, building.RoomsNumber, building.Year, address.Result!.Id), cancellationToken);

        if (newBuilding != null)
        {
            return ServiceResponse<BuildingDTO>.FromError(new(HttpStatusCode.Conflict, "There is already a building at that address!", ErrorCodes.CannotAdd));
        }

        newBuilding = new Building()
        {
            Surface = building.Surface,
            RoomsNumber = building.RoomsNumber,
            Year = building.Year,
            AddressId = address.Result.Id,
        };

        var addedBuilding = await _repository.AddAsync(newBuilding, cancellationToken);

        return ServiceResponse<BuildingDTO>.ForSuccess(new BuildingDTO
        {
            Id = addedBuilding.Id,
            RoomsNumber = addedBuilding.RoomsNumber,
            Surface = addedBuilding.Surface,
            Year = addedBuilding.Year,
        });
    }

    public async Task<ServiceResponse> Update(BuildingUpdateDTO building, UserDTO? requestingUser = default, CancellationToken cancellationToken = default)
    {
        var newBuilding = await _repository.GetAsync(new BuildingSpec(building.Id), cancellationToken);

        if (newBuilding != null)
        {
            newBuilding.Surface = building.Surface;
            newBuilding.RoomsNumber = building.RoomsNumber;
            newBuilding.Year = building.Year;

            await _repository.UpdateAsync(newBuilding, cancellationToken);

            return ServiceResponse.ForSuccess();
        }

        return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "This building doesn't exist!", ErrorCodes.EntityNotFound));
    }

    public async Task<ServiceResponse> DeleteBuilding(Guid id, UserDTO? requestingUser = default, CancellationToken cancellationToken = default)
    {
        var building = await _repository.GetAsync(new BuildingSpec(id), cancellationToken);

        if (building == null)
        {
            return ServiceResponse<BuildingDTO>.FromError(CommonErrors.BuildingNotFound);
        }

        if (building.AnnouncementId != Guid.Empty)
        {
            return ServiceResponse<BuildingDTO>.FromError(new(HttpStatusCode.Conflict, "There is an announcement for this building!", ErrorCodes.CannotDelete));
        }

        await _repository.DeleteAsync<Building>(id, cancellationToken);

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> UpdateAnnouncementId(Guid anouncementId, Guid buildingId, UserDTO? requestingUser = default, CancellationToken cancellationToken = default)
    {
        var newBuilding = await _repository.GetAsync(new BuildingSpec(buildingId), cancellationToken);

        if (newBuilding != null)
        {
            newBuilding.AnnouncementId = anouncementId;

            await _repository.UpdateAsync(newBuilding, cancellationToken);

            return ServiceResponse.ForSuccess();
        }

        return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "This building doesn't exist!", ErrorCodes.EntityNotFound));
    }
}

