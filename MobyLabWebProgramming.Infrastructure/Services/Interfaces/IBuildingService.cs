
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Responses;

public interface IBuildingService
{
    public Task<ServiceResponse<BuildingDTO>> GetBuilding(Guid id, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<Building>> GetBuildingNonDTO(Guid id, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<BuildingDTO>> GetBuildingsWithAddress(Address address, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<BuildingDTO>> AddBuilding(BuildingAddDTO building, UserDTO? requestingUser, CancellationToken cancellationToken = default);
}