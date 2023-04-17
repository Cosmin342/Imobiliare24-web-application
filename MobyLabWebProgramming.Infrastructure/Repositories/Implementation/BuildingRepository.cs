using Microsoft.EntityFrameworkCore;
using MobyLabWebProgramming.Infrastructure.Database;
using MobyLabWebProgramming.Infrastructure.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

public sealed class BuildingRepository : IBuildingRepository
{
    public BuildingRepository(WebAppDatabaseContext dbContext) => DbContext = dbContext;

    public WebAppDatabaseContext DbContext { get; }

    public async Task<Building> GetBuildingWithAnnouncement(Guid id, CancellationToken cancellationToken = default) =>
        await DbContext
            .Set<Building>()
            .Include(e => e.Announcement)
            .FirstOrDefaultAsync(e => e.Id == id, cancellationToken);
}
