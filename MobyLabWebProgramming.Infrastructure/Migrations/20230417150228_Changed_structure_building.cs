using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MobyLabWebProgramming.Infrastructure.Migrations
{
    public partial class Changed_structure_building : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Floor",
                table: "Building",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SpecificCharacteristics",
                table: "Building",
                type: "character varying(1023)",
                maxLength: 1023,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Floor",
                table: "Building");

            migrationBuilder.DropColumn(
                name: "SpecificCharacteristics",
                table: "Building");
        }
    }
}
