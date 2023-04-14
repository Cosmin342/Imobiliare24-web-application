
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Requests;
using MobyLabWebProgramming.Core.Responses;

public interface IBuildingService
{
    public Task<ServiceResponse<BuildingDTO>> GetBuilding(Guid id, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<Building>> GetBuildingNonDTO(Guid id, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<PagedResponse<BuildingDTO>>> GetBuildings(PaginationSearchQueryParams pagination, int? roomsNumber, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<BuildingDTO>> AddBuilding(BuildingAddDTO building, UserDTO? requestingUser, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> DeleteBuilding(Guid id, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> UpdateAnnouncementId(Guid anouncementId, Guid buildingId, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> Update(BuildingUpdateDTO building, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);
}