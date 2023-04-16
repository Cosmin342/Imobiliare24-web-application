using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Requests;
using MobyLabWebProgramming.Core.Responses;

public interface IAnnouncementUserService
{
    public Task<ServiceResponse<List<UserDTO>>> GetUsersForAnnouncement(Guid announcementId, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> AddAnnouncementUserAssociation(AnnouncementUserAddDTO announcementUser, CancellationToken cancellationToken = default);
}
