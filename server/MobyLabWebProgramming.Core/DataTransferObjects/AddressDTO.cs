using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

public class AddressDTO
{
    public Guid Id { get; set; }
    public string County { get; set; } = default!;
    public string City { get; set; } = default!;
    public string Street { get; set; } = default!;
    public int Number { get; set; } = default!;
}
