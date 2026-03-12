using Transacoes.Server.BancoDeDados.Enumeradores;

namespace Transacoes.Server.Dtos
{
    public class TransacaoDto
    {
        public int? Id { get; set; }

        public string Descricao { get; set; } = string.Empty;

        public decimal Valor { get; set; }

        public EnumTipoTransacao Tipo { get; set; }

        public int IdPessoa { get; set; }

        public int IdCategoria { get; set; }

        public PessoaDto? Pessoa { get; set; }

        public CategoriaDto? Categoria { get; set; }
    }
}
