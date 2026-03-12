using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Transacoes.Server.BancoDeDados.Interfaces;

namespace Transacoes.Server.Controllers
{
    [ApiController]
    [Route("api")]
    public class BaseController<Entidade, Dto>(IRepositorio<Entidade> repositorio, IMapper mapeador) : ControllerBase
        where Entidade : IEntidade
    {
        [HttpPost("[controller]/cadastrar")]
        public virtual IActionResult Cadastrar([FromBody] Dto dto)
        {
            try
            {
                var objeto = mapeador.Map<Entidade>(dto);
                var objetoCadastrado = repositorio.Cadastrar(objeto);
                var dtoCadastrado = mapeador.Map<Entidade>(objeto);

                return Created(nameof(Consultar), dtoCadastrado);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("[controller]/atualizar")]
        public IActionResult Atualizar([FromBody] Dto dto)
        {
            try
            {
                var objeto = mapeador.Map<Entidade>(dto);

                repositorio.Atualizar(objeto);

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


        [HttpGet("[controller]/remover/{id}")]
        public IActionResult Remover(int id)
        {
            try
            {
                repositorio.Remover(id);

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


        [HttpGet("[controller]/{id}")]
        public IActionResult Consultar(int id)
        {
            try
            {
                var objeto = repositorio.Consultar(id);
                var dto = mapeador.Map<Dto>(objeto);

                return Ok(dto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("[controller]")]
        public IActionResult Consultar()
        {
            try
            {
                var objetos = repositorio.Consultar();
                var dtos = mapeador.Map<IEnumerable<Dto>>(objetos);

                return Ok(dtos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
