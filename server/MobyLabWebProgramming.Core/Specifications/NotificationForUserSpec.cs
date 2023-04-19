using Ardalis.Specification;
using Microsoft.EntityFrameworkCore;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Specifications;
using System;
using System.Linq.Expressions;

public sealed class NotificationForUserSpec : BaseSpec<NotificationForUserSpec, UserNotification, NotificationDTO>
{
    protected override Expression<Func<UserNotification, NotificationDTO>> Spec => e => new()
    {
        Id = e.Notification.Id,
        Title = e.Notification.Title,
        Content = e.Notification.Content,
        CreatedAt = e.Notification.CreatedAt,
    };

    public NotificationForUserSpec(string? search, Guid userId)
    {
        search = !string.IsNullOrWhiteSpace(search) ? search.Trim() : null;

        if (search == null)
        {
            Query.Where(e => e.UserId == userId)
                 .Include(e => e.Notification);
            return;
        }

        var searchExpr = $"%{search.Replace(" ", "%")}%";

        Query.Where(e => e.UserId == userId && EF.Functions.ILike(e.Notification.Title, searchExpr))
             .Include(e => e.Notification);
    }
}