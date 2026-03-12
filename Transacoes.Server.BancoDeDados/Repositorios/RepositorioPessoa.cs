using Transacoes.Server.BancoDeDados.Entidades;

namespace Transacoes.Server.BancoDeDados.Repositorios
{
    public class RepositorioPessoa : Repositorio<Pessoa>
    {
        public override IEnumerable<Pessoa> Consultar()
        {
            return ContextoBanco.Pessoas.AsEnumerable();
        }
    }
}
