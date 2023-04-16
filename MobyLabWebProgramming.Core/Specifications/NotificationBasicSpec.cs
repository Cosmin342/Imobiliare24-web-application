using Ardalis.Specification;
using MobyLabWebProgramming.Core.Specifications;
using System.Linq.Expressions;

public sealed class NotificationBasicSpec : BaseSpec<NotificationBasicSpec, Notification>
{
    public NotificationBasicSpec(Guid id) : base(id)
    {
    }
}