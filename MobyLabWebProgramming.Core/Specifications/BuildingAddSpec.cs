using Ardalis.Specification;
using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Specifications;
using System.Linq.Expressions;

public sealed class BuildingAddSpec : BaseSpec<BuildingAddSpec, Building>
{
    public BuildingAddSpec(Guid id) : base(id)
    {
    }

    public BuildingAddSpec(int surface, int roomsNumber, int year, Guid addressId)
    {
        Query.Where(e => e.Surface == surface && e.RoomsNumber == roomsNumber && e.Surface == surface && e.AddressId == addressId && e.Announcement != null);
    }
}
