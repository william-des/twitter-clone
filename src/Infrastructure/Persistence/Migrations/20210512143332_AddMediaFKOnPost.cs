using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TwitterClone.Infrastructure.Persistence.Migrations
{
    public partial class AddMediaFKOnPost : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "MediaId",
                table: "Posts",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Posts_MediaId",
                table: "Posts",
                column: "MediaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_Medias_MediaId",
                table: "Posts",
                column: "MediaId",
                principalTable: "Medias",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Posts_Medias_MediaId",
                table: "Posts");

            migrationBuilder.DropIndex(
                name: "IX_Posts_MediaId",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "MediaId",
                table: "Posts");
        }
    }
}
