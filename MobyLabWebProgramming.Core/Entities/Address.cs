using MobyLabWebProgramming.Core.Entities;

public class Address : BaseEntity
{
	public string County { get; set; } = default!;
    public string City { get; set; } = default!;
    public string Street { get; set; } = default!;    
    public int Number { get; set; } = default!;

    public ICollection<Building> Buildings { get; set; } = default!;
}