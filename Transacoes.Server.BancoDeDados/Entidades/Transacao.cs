using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Transacoes.Server.BancoDeDados.Enumeradores;
using Transacoes.Server.BancoDeDados.Interfaces;

namespace Transacoes.Server.BancoDeDados.Entidades
{
    public class Transacao : IEntidade
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string Descricao { get; set; } = string.Empty;

        [Required]
        public decimal Valor { get; set; }

        [Required]
        public EnumTipoTransacao Tipo { get; set; }

        [ForeignKey("Categoria")]
        public int IdCategoria { get; set; }

        [ForeignKey("Pessoa")]
        public int IdPessoa { get; set; }

        public Categoria? Categoria { get; set; }

        public Pessoa? Pessoa { get; set; }
    }
}
