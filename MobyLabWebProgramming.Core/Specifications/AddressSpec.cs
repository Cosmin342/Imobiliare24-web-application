using Ardalis.Specification;
using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Specifications;
using System.Linq.Expressions;

public sealed class AddressSpec : BaseSpec<AddressSpec, Address, AddressDTO>
{
    protected override Expression<Func<Address, AddressDTO>> Spec => e => new()
    {
        Id = e.Id,
        City = e.City,
        County = e.County,
        Number = e.Number,
        Street = e.Street
    };

    public AddressSpec(Guid id) : base(id)
    {
    }

    public AddressSpec(string city, string county, string street, int streetNumber)
    {
        Query.Where(e => e.City == city && e.County == county && e.Street == street && e.Number == streetNumber);
    }
}
