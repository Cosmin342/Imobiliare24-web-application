using Ardalis.Specification;
using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Specifications;
using System.Linq.Expressions;

public sealed class BuildingProjectionSpec : BaseSpec<BuildingProjectionSpec, Building, BuildingDTO>
{
    protected override Expression<Func<Building, BuildingDTO>> Spec => e => new()
    {
        Id = e.Id,
        Surface = e.Surface,
        RoomsNumber = e.RoomsNumber,
        Year = e.Year,
        Address = new AddressDTO()
        {
            Id = e.Address.Id,
            City = e.Address.City,
            County = e.Address.County,
            Street = e.Address.Street,
            Number = e.Address.Number,
        }
    };

    public BuildingProjectionSpec(Guid id) : base(id)
    {
    }

    public BuildingProjectionSpec(Address address)
    {
        Query.Where(e => e.AddressId == address.Id);
    }
    public BuildingProjectionSpec(int? roomsNumber)
    {
        if (roomsNumber == null)
        {
            return;
        }
        Query.Where(e => e.RoomsNumber >= roomsNumber);
    }

    public BuildingProjectionSpec(int surface, int roomsNumber, int year, Guid addressId)
    {
        Query.Where(e => e.Surface == surface && e.RoomsNumber == roomsNumber && e.Surface == surface && e.AddressId == addressId && e.Announcement != null);
    }
}
