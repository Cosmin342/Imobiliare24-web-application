using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

public interface IAddressRepository
{
    public Task<Address> GetAddressWithBuildings(Guid id, CancellationToken cancellationToken = default);
}
