using Ardalis.Specification;
using Microsoft.EntityFrameworkCore;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Specifications;
using System.Linq.Expressions;

public sealed class AnnouncementSpec : BaseSpec<AnnouncementSpec, Announcement, AnnouncementDTO>
{
    protected override Expression<Func<Announcement, AnnouncementDTO>> Spec => e => new()
    {
        Id = e.Id,
        Title = e.Title,
        Description = e.Description,
        Price = e.Price,
        IsActive = e.IsActive,
        UserId = e.UserId,
        Building = new()
        {
            Id = e.Id,
            Address = new()
            {
                Id = e.Building.Address.Id,
                County = e.Building.Address.County,
                City = e.Building.Address.City,
                Street = e.Building.Address.Street,
                Number = e.Building.Address.Number,
            },
            Surface = e.Building.Surface,
            RoomsNumber = e.Building.RoomsNumber,
            Year = e.Building.Year,
        },
    };
    public AnnouncementSpec(Guid id) : base(id)
    {
    }

    public AnnouncementSpec(string? search, bool? active, bool? forCurrentUser, Guid userId)
    {
        search = !string.IsNullOrWhiteSpace(search) ? search.Trim() : null;

        if (search == null)
        {
            if (active != null && forCurrentUser == true)
            {
                Query.Where(e => e.IsActive == active && e.UserId == userId);
            }
            else if (active != null)
            {
                Query.Where(e => e.IsActive == active);
            }
            else if (forCurrentUser == true)
            {
                Query.Where(e => e.UserId == userId);
            }
        }
        else
        {
            var searchExpr = $"%{search.Replace(" ", "%")}%";

            if (active != null && forCurrentUser == true)
            {
                Query.Where(e => EF.Functions.ILike(e.Title, searchExpr) && e.IsActive == active && e.UserId == userId);
            }
            else if (active != null)
            {
                Query.Where(e => EF.Functions.ILike(e.Title, searchExpr) && e.IsActive == active);
            }
            else if (forCurrentUser == true)
            {
                Query.Where(e => EF.Functions.ILike(e.Title, searchExpr) && e.UserId == userId);
            }
            else
            {
                Query.Where(e => EF.Functions.ILike(e.Title, searchExpr));
            }
        }
    }
}