using MobyLabWebProgramming.Core.Entities;

public class Notification : BaseEntity
{
    public string Title { get; set; } = default!;
    public string Content { get; set; } = default!;
    public ICollection<UserNotification> Users { get; set; } = default!;
}