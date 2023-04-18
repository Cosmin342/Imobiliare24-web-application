using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Requests;
using MobyLabWebProgramming.Core.Responses;

public interface INotificationService
{
    public Task<ServiceResponse<NotificationDTO>> GetNotification(Guid id, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<PagedResponse<NotificationDTO>>> GetNotifications(PaginationSearchQueryParams pagination, Guid userId, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> AddNotificationForAnnouncement(NotificationAddDTO notification, bool automaticNotification, Guid announcementId, UserDTO? requestingUser, List<UserDTO>? subscribers, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> DeleteNotification(Guid notificationId, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> Update(NotificationDTO notification, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);
}
