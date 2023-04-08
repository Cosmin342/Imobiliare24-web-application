using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Specifications;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

public sealed class AnnouncementUpdateSpec : BaseSpec<AnnouncementUpdateSpec, Announcement>
{
    public AnnouncementUpdateSpec(Guid id) : base(id)
    {
    }
}