using Ardalis.Specification;
using MobyLabWebProgramming.Core.Specifications;
using System.Linq.Expressions;

public sealed class UserNotificationSpec : BaseSpec<UserNotificationSpec, UserNotification>
{
    public UserNotificationSpec(Guid userId, Guid notificationId)
    {
        Query.Where(e => e.UserId == userId && e.NotificationId == notificationId);
    }
}