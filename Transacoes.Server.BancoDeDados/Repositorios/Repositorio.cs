using Transacoes.Server.BancoDeDados.Interfaces;

namespace Transacoes.Server.BancoDeDados.Repositorios
{
    public abstract class Repositorio<T> : IRepositorio<T>
        where T : IEntidade
    {
        protected ContextoBanco ContextoBanco { get; }

        public Repositorio()
        {
            ContextoBanco = new ContextoBanco();
        }

        public T Cadastrar(T objeto)
        {
            ContextoBanco.Add(objeto);
            ContextoBanco.SaveChanges();

            return objeto;
        }

        public void Atualizar(T objeto)
        {
            ContextoBanco.Update(objeto);
            ContextoBanco.SaveChanges();
        }

        public void Remover(int id)
        {
            var objeto = Consultar(id) ?? throw new Exception("Objeto não existe no banco de dados.");

            ContextoBanco.Remove(objeto);
            ContextoBanco.SaveChanges();
        }

        public T? Consultar(int id)
        {
            return (T?)ContextoBanco.Find(typeof(T), id);
        }

        public abstract IEnumerable<T> Consultar();
    }
}
