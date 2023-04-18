using MobyLabWebProgramming.Core.Entities;

public class UserNotification : BaseEntity
{
    public Guid NotificationId { get; set; }
    public Notification Notification { get; set; } = default!;

    public Guid UserId { get; set; }
    public User User { get; set; } = default!;
}