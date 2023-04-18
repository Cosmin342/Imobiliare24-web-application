using Ardalis.Specification;
using Microsoft.EntityFrameworkCore;
using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Specifications;
using System.Linq.Expressions;

public sealed class AddressProjectionSpec : BaseSpec<AddressProjectionSpec, Address, AddressDTO>
{
    protected override Expression<Func<Address, AddressDTO>> Spec => e => new()
    {
        Id = e.Id,
        City = e.City,
        County = e.County,
        Number = e.Number,
        Street = e.Street
    };

    public AddressProjectionSpec(Guid id) : base(id)
    {
    }

    public AddressProjectionSpec(string city, string county, string street, int streetNumber)
    {
        Query.Where(e => e.City == city && e.County == county && e.Street == street && e.Number == streetNumber);
    }

    public AddressProjectionSpec(string? search)
    {
        search = !string.IsNullOrWhiteSpace(search) ? search.Trim() : null;

        if (search == null)
        {
            return;
        }

        var searchExpr = $"%{search.Replace(" ", "%")}%";

        Query.Where(e => EF.Functions.ILike(e.Street, searchExpr));
    }
}
