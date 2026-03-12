# Transações

Sistema de gerenciamento de transações.

## Funcionalidades

- [x] Pessoa
  - [x] Listagem
  - [x] Cadastro
  - [x] Alteração
  - [x] Exclusão
  - [x] Validação
     
- [x] Categoria
  - [x] Listagem 
  - [x] Cadastro
  - [x] Alteração
  - [x] Exclusão
  - [x] Validação

- [x] Transação
  - [x] Listagem 
  - [x] Cadastro
  - [x] Alteração
  - [x] Exclusão
  - [ ] Validação
    - [ ] Idade
    - [ ] Tipo da categoria
       
- [ ] Relatórios
  - [ ] Total por pessoa
  - [ ] Total por categoria

### TODO

- [ ] Implementar validação do CRUD da transação
- [ ] Implementar relatórios
- [ ] Generalizar funcionalidades
- [ ] Melhorar campos númericos e de moeda
- [ ] Melhorar visualização dos registros das funcionalidades
  - [ ] Paginação
  - [ ] Busca por coluna
  - [ ] Ajustar tamanho das colunas
- [ ] Adicionar pesquisa na seleção de pessoa e categoria
- [ ] Autenticação
  - [ ] Cadastro de usuário
  - [ ] Painel administrador
  - [ ] Permissões

## Building

### Visual Studio

1. Instale os componentes de ASP.NET e desenvolvimento web
2. Abra a solução `Transacoes.slnx`
3. Defina o projeto `Transacoes.Server` como projeto de inicialização padrão
4. Execute

### CLI

`dotnet run --project Transacoes.Server`

Com isso, o servidor e o cliente irão iniciar, o servidor na porta `7227` (https) e `5262` (http) e o cliente na porta `5173`
