using Ardalis.Specification;
using MobyLabWebProgramming.Core.Specifications;

public sealed class AnnouncementUserAddSpec : BaseSpec<AnnouncementUserAddSpec, AnnouncementUser>
{
    public AnnouncementUserAddSpec(Guid id) : base(id)
    {
    }

    public AnnouncementUserAddSpec(Guid announcementId, Guid userId)
    {
        Query.Where(e => e.UserId == userId && e.AnnouncementId == announcementId);
    }
}