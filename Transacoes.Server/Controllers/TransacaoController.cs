using AutoMapper;
using Transacoes.Server.BancoDeDados.Entidades;
using Transacoes.Server.BancoDeDados.Interfaces;
using Transacoes.Server.Dtos;

namespace Transacoes.Server.Controllers
{
    public class TransacaoController(IRepositorio<Transacao> repositorio, IMapper mapeador, IRepositorio<Pessoa> repositorioPessoa, IRepositorio<Categoria> repositorioCategoria)
        : BaseController<Transacao, TransacaoDto>(repositorio, mapeador)
    {
        //public override IActionResult Cadastrar([FromBody] TransacaoDto dto)
        //{
        //    try
        //    {
        //        var objeto = mapeador.Map<Transacao>(dto);

        //        objeto.Pessoa = null;
        //        objeto.Categoria = null;

        //        var objetoCadastrado = repositorio.Cadastrar(objeto);
        //        var dtoCadastrado = mapeador.Map<TransacaoDto>(objeto);

        //        return Created(nameof(Consultar), dtoCadastrado);
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, ex.Message);
        //    }
        //}
    }
}
