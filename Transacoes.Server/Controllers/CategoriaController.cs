using AutoMapper;
using Transacoes.Server.BancoDeDados.Entidades;
using Transacoes.Server.BancoDeDados.Interfaces;
using Transacoes.Server.Dtos;

namespace Transacoes.Server.Controllers
{
    public class CategoriaController(IRepositorio<Categoria> repositorio, IMapper mapeador)
        : BaseController<Categoria, CategoriaDto>(repositorio, mapeador)
    {
    }
}
