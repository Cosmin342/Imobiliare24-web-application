using Ardalis.Specification;
using MobyLabWebProgramming.Core.Specifications;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

public sealed class AddressAddSpec : BaseSpec<AddressAddSpec, Address>
{
    public AddressAddSpec(Guid id) : base(id)
    {
    }

    public AddressAddSpec(string city, string county, string street, int streetNumber)
    {
        Query.Where(e => e.City == city && e.County == county && e.Street == street && e.Number == streetNumber);
    }
}