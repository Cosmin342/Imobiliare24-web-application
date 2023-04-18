using Ardalis.Specification;
using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Specifications;
using System;
using System.Linq.Expressions;

public sealed class FollowedAnnouncementsSpec : BaseSpec<FollowedAnnouncementsSpec, AnnouncementUser, AnnouncementDTO>
{
    protected override Expression<Func<AnnouncementUser, AnnouncementDTO>> Spec => e => new()
    {
        Id = e.Announcement.Id,
        Title = e.Announcement.Title,
        Description = e.Announcement.Description,
        Price = e.Announcement.Price,
        IsActive = e.Announcement.IsActive,
        UserId = e.UserId,
        Building = new()
        {
            Id = e.Announcement.Building.Id,
            Address = new()
            {
                Id = e.Announcement.Building.Address.Id,
                County = e.Announcement.Building.Address.County,
                City = e.Announcement.Building.Address.City,
                Street = e.Announcement.Building.Address.Street,
                Number = e.Announcement.Building.Address.Number,
            },
            Surface = e.Announcement.Building.Surface,
            RoomsNumber = e.Announcement.Building.RoomsNumber,
            Year = e.Announcement.Building.Year,
        },
    };

    public FollowedAnnouncementsSpec(Guid userId)
    {
        Query.Where(e => e.UserId == userId)
             .Include(e => e.Announcement)
                .ThenInclude(a => a.Building)
                    .ThenInclude(ad => ad.Address);
    }
}