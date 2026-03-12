using Microsoft.EntityFrameworkCore;
using Transacoes.Server.BancoDeDados;
using Transacoes.Server.BancoDeDados.Entidades;
using Transacoes.Server.BancoDeDados.Interfaces;
using Transacoes.Server.BancoDeDados.Repositorios;
using Transacoes.Server.Dtos;

namespace Transacoes.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            //.AddJsonOptions(opcoes =>
            //{
            //    opcoes.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter(allowIntegerValues: false));
            //});
            // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
            builder.Services.AddOpenApi();

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddScoped<IRepositorio<Pessoa>, RepositorioPessoa>();
            builder.Services.AddScoped<IRepositorio<Categoria>, RepositorioCategoria>();
            builder.Services.AddScoped<IRepositorio<Transacao>, RepositorioTransacao>();
            builder.Services.AddScoped<ContextoBanco>();

            builder.Services.AddAutoMapper(config =>
            {
                config.CreateMap<Pessoa, PessoaDto>().ReverseMap();
                config.CreateMap<Categoria, CategoriaDto>().ReverseMap();
                config.CreateMap<Transacao, TransacaoDto>().ReverseMap();
            });

            var app = builder.Build();

            app.UseDefaultFiles();
            app.MapStaticAssets();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            //app.UseHttpsRedirection();

            //app.UseAuthorization();

            app.MapControllers();

            app.MapFallbackToFile("/index.html");

            using (var serviceScope = app.Services.CreateScope())
            {
                serviceScope.ServiceProvider.GetRequiredService<ContextoBanco>().Database.EnsureCreated();
            }

            app.Run();
        }
    }
}
