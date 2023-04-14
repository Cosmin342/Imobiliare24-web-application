public class AnnouncementAddDTO
{
    public string Title { get; set; } = default!;
    public string Description { get; set; } = default!;
    public int Price { get; set; } = default!;
    public BuildingAddDTO Building { get; set; }
}
