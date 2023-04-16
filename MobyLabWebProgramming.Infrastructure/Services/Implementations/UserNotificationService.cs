
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Errors;
using MobyLabWebProgramming.Core.Requests;
using MobyLabWebProgramming.Core.Responses;
using MobyLabWebProgramming.Infrastructure.Database;
using MobyLabWebProgramming.Infrastructure.Repositories.Interfaces;
using System.Net;

public class UserNotificationService : IUserNotificationService
{
    private readonly IRepository<WebAppDatabaseContext> _repository;

    public UserNotificationService(IRepository<WebAppDatabaseContext> repository)
    {
        _repository = repository;
    }
    public async Task<ServiceResponse> AddUserNotificationAssociations(Guid notificationId, List<UserDTO> users, CancellationToken cancellationToken = default)
    {
        foreach (var user in users)
        {
            await _repository.AddAsync(new UserNotification
            {
                UserId = user.Id,
                NotificationId = notificationId,
            }, cancellationToken);
        }

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse<PagedResponse<NotificationDTO>>> GetNotificationsForUser(PaginationSearchQueryParams pagination, Guid userId, CancellationToken cancellationToken = default)
    {
        var result = await _repository.PageAsync(pagination, new NotificationForUserSpec(pagination.Search, userId), cancellationToken);

        return result != null ?
            ServiceResponse<PagedResponse<NotificationDTO>>.ForSuccess(result):
            ServiceResponse<PagedResponse<NotificationDTO>>.FromError(CommonErrors.NotificationsNotFound);
    }

    public async Task<ServiceResponse> DeleteNotificationForUser(Guid notificationId, Guid userId, CancellationToken cancellationToken = default)
    {
        var result = await _repository.GetAsync(new UserNotificationSpec(userId, notificationId), cancellationToken);

        if (result == null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "We couldn't find this notification!", ErrorCodes.CannotDelete));
        }

        await _repository.DeleteAsync<UserNotification>(result.Id, cancellationToken);

        return ServiceResponse.ForSuccess();
    }
}