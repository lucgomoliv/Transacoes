using Microsoft.EntityFrameworkCore;
using Transacoes.Server.BancoDeDados.Entidades;

namespace Transacoes.Server.BancoDeDados
{
    public class ContextoBanco : DbContext
    {
        private string CaminhoBanco { get; }

        public DbSet<Pessoa> Pessoas { get; set; }
        public DbSet<Categoria> Categorias { get; set; }
        public DbSet<Transacao> Transacoes { get; set; }

        public ContextoBanco()
        {
            var pastaLocal = Environment.SpecialFolder.LocalApplicationData;
            var caminhoPastaBanco = Environment.GetFolderPath(pastaLocal) + "\\Transacoes";

            if (!Directory.Exists(caminhoPastaBanco))
                Directory.CreateDirectory(caminhoPastaBanco);

            CaminhoBanco = Path.Join(caminhoPastaBanco, "aplicacao.db");
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.UseSqlite($"Data Source={CaminhoBanco}");
    }
}
