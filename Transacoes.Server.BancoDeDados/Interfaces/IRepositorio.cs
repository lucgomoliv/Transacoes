namespace Transacoes.Server.BancoDeDados.Interfaces
{
    public interface IRepositorio<T> where T : IEntidade
    {
        T Cadastrar(T objeto);


        void Atualizar(T objeto);


        void Remover(int id);


        T? Consultar(int id);


        IEnumerable<T> Consultar();
    }
}
