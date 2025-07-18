using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LeetcodeStudyPlanner.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Problems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Url = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Difficulty = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Date1 = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Date2 = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Date3 = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Date4 = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Date5 = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Problems", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Problems");
        }
    }
}
