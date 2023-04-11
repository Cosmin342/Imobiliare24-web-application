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
    public BuildingAddDTO Building { get; set; }
}
