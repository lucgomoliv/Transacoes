using Transacoes.Server.BancoDeDados.Enumeradores;

namespace Transacoes.Server.Dtos
{
    public class CategoriaDto
    {
        public int? Id { get; set; }

        public string Descricao { get; set; } = string.Empty;

        public EnumFinalidadeCategoria Finalidade { get; set; }
    }
}
