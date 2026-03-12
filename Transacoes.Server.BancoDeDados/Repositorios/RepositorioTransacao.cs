using Microsoft.EntityFrameworkCore;
using Transacoes.Server.BancoDeDados.Entidades;

namespace Transacoes.Server.BancoDeDados.Repositorios
{
    public class RepositorioTransacao : Repositorio<Transacao>
    {
        public override IEnumerable<Transacao> Consultar()
        {
            return ContextoBanco.Transacoes
                .Include(x => x.Categoria)
                .Include(x => x.Pessoa);
        }
    }
}
