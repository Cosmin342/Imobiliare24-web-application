using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

public class AnnouncementAddDTO
{
    public string Title { get; set; } = default!;
    public string Description { get; set; } = default!;
    public int Price { get; set; } = default!;
    public int Surface { get; set; } = default!;
    public int RoomsNumber { get; set; } = default!;
    public int Year { get; set; } = default!;
    public string City { get; set; } = default!;
    public string County { get; set; } = default!;
    public string Street { get; set; } = default!;
    public int StreetNumber { get; set; } = default!;
}
