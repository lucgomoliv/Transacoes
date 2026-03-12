using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Transacoes.Server.BancoDeDados.Migrations
{
    /// <inheritdoc />
    public partial class Mudanças : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transacoes_Categorias_IdCategoria",
                table: "Transacoes");

            migrationBuilder.DropForeignKey(
                name: "FK_Transacoes_Pessoas_IdPessoa",
                table: "Transacoes");

            migrationBuilder.AlterColumn<int>(
                name: "IdPessoa",
                table: "Transacoes",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "IdCategoria",
                table: "Transacoes",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Transacoes_Categorias_IdCategoria",
                table: "Transacoes",
                column: "IdCategoria",
                principalTable: "Categorias",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Transacoes_Pessoas_IdPessoa",
                table: "Transacoes",
                column: "IdPessoa",
                principalTable: "Pessoas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transacoes_Categorias_IdCategoria",
                table: "Transacoes");

            migrationBuilder.DropForeignKey(
                name: "FK_Transacoes_Pessoas_IdPessoa",
                table: "Transacoes");

            migrationBuilder.AlterColumn<int>(
                name: "IdPessoa",
                table: "Transacoes",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AlterColumn<int>(
                name: "IdCategoria",
                table: "Transacoes",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddForeignKey(
                name: "FK_Transacoes_Categorias_IdCategoria",
                table: "Transacoes",
                column: "IdCategoria",
                principalTable: "Categorias",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Transacoes_Pessoas_IdPessoa",
                table: "Transacoes",
                column: "IdPessoa",
                principalTable: "Pessoas",
                principalColumn: "Id");
        }
    }
}
