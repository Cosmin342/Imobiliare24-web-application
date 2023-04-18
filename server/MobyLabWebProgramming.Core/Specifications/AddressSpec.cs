using Ardalis.Specification;
using MobyLabWebProgramming.Core.Specifications;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

public sealed class AddressSpec : BaseSpec<AddressSpec, Address>
{
    public AddressSpec(Guid id) : base(id)
    {
    }
}