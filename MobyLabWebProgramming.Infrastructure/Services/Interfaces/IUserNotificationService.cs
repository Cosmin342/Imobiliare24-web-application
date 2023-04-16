using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Requests;
using MobyLabWebProgramming.Core.Responses;

public interface IUserNotificationService {
    public Task<ServiceResponse> AddUserNotificationAssociations(Guid notificationId, List<UserDTO> users, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<PagedResponse<NotificationDTO>>> GetNotificationsForUser(PaginationSearchQueryParams pagination, Guid userId, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> DeleteNotificationForUser(Guid notificationId, Guid userId, CancellationToken cancellationToken = default);
}