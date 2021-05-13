using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TwitterClone.Infrastructure.Persistence.Migrations
{
    public partial class AddCreatedAndLastModifiedOnMedias : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "Created",
                table: "Medias",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "LastModified",
                table: "Medias",
                type: "timestamp without time zone",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Created",
                table: "Medias");

            migrationBuilder.DropColumn(
                name: "LastModified",
                table: "Medias");
        }
    }
}
