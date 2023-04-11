public class BuildingAddDTO
{
    public int Surface { get; set; } = default!;
    public int RoomsNumber { get; set; } = default!;
    public int Year { get; set; } = default!;
    public AddressAddDTO Address { get; set; }
}
