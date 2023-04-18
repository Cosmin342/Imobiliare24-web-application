using Microsoft.EntityFrameworkCore;
using MobyLabWebProgramming.Infrastructure.Database;
using MobyLabWebProgramming.Infrastructure.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

public sealed class AddressRepository : IAddressRepository
{
    public AddressRepository(WebAppDatabaseContext dbContext) => DbContext = dbContext;

    public WebAppDatabaseContext DbContext { get; }

    public async Task<Address> GetAddressWithBuildings(Guid id, CancellationToken cancellationToken = default) =>
        await DbContext
            .Set<Address>()
            .Include(e => e.Buildings)
            .FirstOrDefaultAsync(e => e.Id == id, cancellationToken);
}
