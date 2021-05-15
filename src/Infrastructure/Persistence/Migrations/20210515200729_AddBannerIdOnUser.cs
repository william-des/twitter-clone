using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TwitterClone.Infrastructure.Persistence.Migrations
{
    public partial class AddBannerIdOnUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "BannerId",
                table: "DomainUsers",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_DomainUsers_BannerId",
                table: "DomainUsers",
                column: "BannerId");

            migrationBuilder.AddForeignKey(
                name: "FK_DomainUsers_Medias_BannerId",
                table: "DomainUsers",
                column: "BannerId",
                principalTable: "Medias",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DomainUsers_Medias_BannerId",
                table: "DomainUsers");

            migrationBuilder.DropIndex(
                name: "IX_DomainUsers_BannerId",
                table: "DomainUsers");

            migrationBuilder.DropColumn(
                name: "BannerId",
                table: "DomainUsers");
        }
    }
}
