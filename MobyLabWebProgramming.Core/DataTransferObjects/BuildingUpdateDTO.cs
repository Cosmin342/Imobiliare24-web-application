public class BuildingUpdateDTO
{
    public Guid Id { get; set; }
    public int Surface { get; set; } = default!;
    public int RoomsNumber { get; set; } = default!;
    public int? Year { get; set; } = default!;
    public string? SpecificCharacteristics { get; set; } = default!;
    public int? Floor { get; set; } = default!;
}