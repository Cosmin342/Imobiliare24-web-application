public class BuildingDTO
{
    public Guid Id { get; set; }
    public int Surface { get; set; } = default!;
    public int RoomsNumber { get; set; } = default!;
    public int? Year { get; set; } = default!;
    public AddressDTO Address { get; set; } = default!;
}
