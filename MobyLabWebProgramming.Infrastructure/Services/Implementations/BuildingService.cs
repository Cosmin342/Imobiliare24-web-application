using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Errors;
using MobyLabWebProgramming.Core.Responses;
using MobyLabWebProgramming.Infrastructure.Database;
using MobyLabWebProgramming.Infrastructure.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
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
        var result = await _repository.GetAsync(new BuildingSpec(id), cancellationToken);

        return result != null ?
            ServiceResponse<BuildingDTO>.ForSuccess(result) :
            ServiceResponse<BuildingDTO>.FromError(CommonErrors.AnnouncementNotFound);
    }

    public async Task<ServiceResponse<BuildingDTO>> GetBuildingsWithAddress(Address address, CancellationToken cancellationToken = default)
    {
        var result = await _repository.GetAsync(new BuildingSpec(address), cancellationToken);

        return result != null ?
            ServiceResponse<BuildingDTO>.ForSuccess(result) :
            ServiceResponse<BuildingDTO>.FromError(CommonErrors.AnnouncementNotFound);
    }

    public async Task<ServiceResponse<Building>> GetBuildingNonDTO(Guid id, CancellationToken cancellationToken = default)
    {
        var result = await _repository.GetAsync(new BuildingAddSpec(id), cancellationToken);

        return result != null ?
            ServiceResponse<Building>.ForSuccess(result) :
            ServiceResponse<Building>.FromError(CommonErrors.AnnouncementNotFound);
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

        var newBuilding = await _repository.GetAsync(new BuildingAddSpec(building.Surface, building.RoomsNumber, building.Year, address.Result!.Id), cancellationToken);
        
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

        var result = await _repository.AddAsync(newBuilding, cancellationToken);

        return ServiceResponse<BuildingDTO>.ForSuccess(new BuildingDTO
        {
            Id = result.Id,
            RoomsNumber = result.RoomsNumber,
            Surface = result.Surface,
            Year = result.Year,
        });
    }
}

