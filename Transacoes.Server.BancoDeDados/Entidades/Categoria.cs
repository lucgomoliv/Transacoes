using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Transacoes.Server.BancoDeDados.Enumeradores;
using Transacoes.Server.BancoDeDados.Interfaces;

namespace Transacoes.Server.BancoDeDados.Entidades
{
    public class Categoria : IEntidade
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string Descricao { get; set; } = string.Empty;

        [Required]
        public EnumFinalidadeCategoria Finalidade { get; set; }

        [InverseProperty("Categoria")]
        public List<Transacao> Transacoes { get; set; } = [];
    }
}
