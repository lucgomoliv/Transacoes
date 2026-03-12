using AutoMapper;
using Transacoes.Server.BancoDeDados.Entidades;
using Transacoes.Server.BancoDeDados.Interfaces;
using Transacoes.Server.Dtos;

namespace Transacoes.Server.Controllers
{
    public class PessoaController(IRepositorio<Pessoa> repositorio, IMapper mapeador)
        : BaseController<Pessoa, PessoaDto>(repositorio, mapeador)
    {
    }
}
