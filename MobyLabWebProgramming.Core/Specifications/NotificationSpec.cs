using Ardalis.Specification;
using MobyLabWebProgramming.Core.Specifications;
using System.Linq.Expressions;

public sealed class NotificationSpec : BaseSpec<NotificationSpec, Notification>
{
    public NotificationSpec(Guid id) : base(id)
    {
    }
}