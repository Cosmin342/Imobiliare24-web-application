using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

public interface IBuildingRepository
{
    public Task<Building> GetBuildingWithAnnouncement(Guid id, CancellationToken cancellationToken = default);
}
