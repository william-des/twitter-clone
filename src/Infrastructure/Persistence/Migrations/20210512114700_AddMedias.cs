using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TwitterClone.Infrastructure.Persistence.Migrations
{
    public partial class AddMedias : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "PictureId",
                table: "DomainUsers",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Medias",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Content = table.Column<byte[]>(type: "bytea", maxLength: 1024, nullable: true),
                    ContentType = table.Column<string>(type: "text", nullable: true),
                    FileName = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Medias", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DomainUsers_PictureId",
                table: "DomainUsers",
                column: "PictureId");

            migrationBuilder.AddForeignKey(
                name: "FK_DomainUsers_Medias_PictureId",
                table: "DomainUsers",
                column: "PictureId",
                principalTable: "Medias",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DomainUsers_Medias_PictureId",
                table: "DomainUsers");

            migrationBuilder.DropTable(
                name: "Medias");

            migrationBuilder.DropIndex(
                name: "IX_DomainUsers_PictureId",
                table: "DomainUsers");

            migrationBuilder.DropColumn(
                name: "PictureId",
                table: "DomainUsers");
        }
    }
}
