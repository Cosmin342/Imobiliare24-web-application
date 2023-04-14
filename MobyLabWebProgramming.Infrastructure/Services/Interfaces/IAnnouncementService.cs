using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Requests;
using MobyLabWebProgramming.Core.Responses;

public interface IAnnouncementService
{
    public Task<ServiceResponse<AnnouncementDTO>> GetAnnouncement(Guid id, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<PagedResponse<AnnouncementDTO>>> GetAnnouncements(PaginationSearchQueryParams pagination, bool? active, bool? forCurrentUser, Guid userId, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<PagedResponse<AnnouncementDTO>>> GetAnnouncementsSubscribed(PaginationSearchQueryParams pagination, Guid userId, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> AddAnnouncement(AnnouncementAddDTO announcement, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> DeleteAnnouncement(Guid id, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> DisableAnnouncement(Guid id, UserDTO requestingUser, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> Update(AnnouncementUpdateDTO announcement, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> SubscribeToAnnouncement(AnnouncementUserAddDTO announcementUser, CancellationToken cancellationToken = default);
}