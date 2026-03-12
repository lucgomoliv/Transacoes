using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Transacoes.Server.BancoDeDados.Interfaces;

namespace Transacoes.Server.BancoDeDados.Entidades
{
    public class Pessoa : IEntidade
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string Nome { get; set; } = string.Empty;

        [Required]
        public int Idade { get; set; }

        [InverseProperty("Pessoa")]
        public List<Transacao> Transacoes { get; set; } = [];
    }
}
