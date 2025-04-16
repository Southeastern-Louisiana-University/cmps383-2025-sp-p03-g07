using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Selu383.SP25.P03.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddScreensAndMovieShowtimeUpdates : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "MovieScheduleId",
                table: "Tickets",
                newName: "MovieShowtimeId");

            migrationBuilder.RenameColumn(
                name: "TheaterId",
                table: "MovieShowtimes",
                newName: "ScreenId");

            migrationBuilder.AlterColumn<string>(
                name: "CustomerName",
                table: "Tickets",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "Screens",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SeatCount = table.Column<int>(type: "int", nullable: false),
                    TheaterId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Screens", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Screens_Theaters_TheaterId",
                        column: x => x.TheaterId,
                        principalTable: "Theaters",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_MovieShowtimeId_SeatNumber",
                table: "Tickets",
                columns: new[] { "MovieShowtimeId", "SeatNumber" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_MovieShowtimes_ScreenId",
                table: "MovieShowtimes",
                column: "ScreenId");

            migrationBuilder.CreateIndex(
                name: "IX_Screens_TheaterId",
                table: "Screens",
                column: "TheaterId");

            migrationBuilder.AddForeignKey(
                name: "FK_MovieShowtimes_Screens_ScreenId",
                table: "MovieShowtimes",
                column: "ScreenId",
                principalTable: "Screens",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_MovieShowtimes_MovieShowtimeId",
                table: "Tickets",
                column: "MovieShowtimeId",
                principalTable: "MovieShowtimes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MovieShowtimes_Screens_ScreenId",
                table: "MovieShowtimes");

            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_MovieShowtimes_MovieShowtimeId",
                table: "Tickets");

            migrationBuilder.DropTable(
                name: "Screens");

            migrationBuilder.DropIndex(
                name: "IX_Tickets_MovieShowtimeId_SeatNumber",
                table: "Tickets");

            migrationBuilder.DropIndex(
                name: "IX_MovieShowtimes_ScreenId",
                table: "MovieShowtimes");

            migrationBuilder.RenameColumn(
                name: "MovieShowtimeId",
                table: "Tickets",
                newName: "MovieScheduleId");

            migrationBuilder.RenameColumn(
                name: "ScreenId",
                table: "MovieShowtimes",
                newName: "TheaterId");

            migrationBuilder.AlterColumn<string>(
                name: "CustomerName",
                table: "Tickets",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");
        }
    }
}
