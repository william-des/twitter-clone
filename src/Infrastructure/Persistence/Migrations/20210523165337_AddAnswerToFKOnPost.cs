using Microsoft.EntityFrameworkCore.Migrations;

namespace TwitterClone.Infrastructure.Persistence.Migrations
{
    public partial class AddAnswerToFKOnPost : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AnswerToId",
                table: "Posts",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Posts_AnswerToId",
                table: "Posts",
                column: "AnswerToId");

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_Posts_AnswerToId",
                table: "Posts",
                column: "AnswerToId",
                principalTable: "Posts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Posts_Posts_AnswerToId",
                table: "Posts");

            migrationBuilder.DropIndex(
                name: "IX_Posts_AnswerToId",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "AnswerToId",
                table: "Posts");
        }
    }
}
