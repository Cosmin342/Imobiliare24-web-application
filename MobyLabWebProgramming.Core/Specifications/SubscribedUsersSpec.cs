using Ardalis.Specification;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Specifications;
using System;
using System.Linq.Expressions;

public sealed class SubscribedUsersSpec : BaseSpec<SubscribedUsersSpec, AnnouncementUser, UserDTO>
{
    protected override Expression<Func<AnnouncementUser, UserDTO>> Spec => e => new()
    {
        Id = e.User.Id,
        Name = e.User.Name,
    };

    public SubscribedUsersSpec(Guid announcementId)
    {
        Query.Where(e => e.AnnouncementId == announcementId)
             .Include(e => e.User);
    }
}