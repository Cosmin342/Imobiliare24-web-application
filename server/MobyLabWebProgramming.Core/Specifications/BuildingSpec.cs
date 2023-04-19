using Ardalis.Specification;
using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Specifications;
using System.Linq.Expressions;

public sealed class BuildingSpec : BaseSpec<BuildingSpec, Building>
{
    public BuildingSpec(Guid id) : base(id)
    {
    }

    public BuildingSpec(int surface, int roomsNumber, int year, Guid addressId, bool withAnnouncement)
    {
        if (withAnnouncement)
        {
            Query.Where(e => e.Surface == surface && e.RoomsNumber == roomsNumber && e.Surface == surface && e.AddressId == addressId && e.AnnouncementId != Guid.Empty);
            return;
        }
        Query.Where(e => e.Surface == surface && e.RoomsNumber == roomsNumber && e.Surface == surface && e.AddressId == addressId);
    }
}
