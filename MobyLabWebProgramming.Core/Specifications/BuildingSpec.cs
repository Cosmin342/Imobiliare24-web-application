using Ardalis.Specification;
using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Specifications;

public sealed class BuildingSpec : BaseSpec<BuildingSpec, Building>
{
    public BuildingSpec(Guid id) : base(id)
    {
    }

    public BuildingSpec(int surface, int roomsNumber, int year, Guid addressId)
    {
        Query.Where(e => e.Surface == surface && e.RoomsNumber == roomsNumber && e.Surface == surface && e.AddressId == addressId && e.Announcement != null);
    }
}
