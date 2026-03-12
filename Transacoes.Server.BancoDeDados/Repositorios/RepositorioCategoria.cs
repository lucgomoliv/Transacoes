using Transacoes.Server.BancoDeDados.Entidades;

namespace Transacoes.Server.BancoDeDados.Repositorios
{
    public class RepositorioCategoria : Repositorio<Categoria>
    {
        public override IEnumerable<Categoria> Consultar()
        {
            return ContextoBanco.Categorias.AsEnumerable();
        }
    }
}
