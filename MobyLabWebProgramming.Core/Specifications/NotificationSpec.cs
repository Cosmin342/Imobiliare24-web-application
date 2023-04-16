﻿using Ardalis.Specification;
using MobyLabWebProgramming.Core.Specifications;
using System.Linq.Expressions;

public sealed class NotificationSpec : BaseSpec<NotificationSpec, Notification, NotificationDTO>
{
    protected override Expression<Func<Notification, NotificationDTO>> Spec => e => new()
    {
        Id = e.Id,
        Title = e.Title,
        Content = e.Content,
    };

    public NotificationSpec(Guid id) : base(id)
    {
    }
}