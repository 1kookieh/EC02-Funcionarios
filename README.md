# EC02 - Gestão de Funcionários

Aluno: Igor Santos Chediack Pimenta Bueno
Professor: Daniel Correa da Silva
Disciplina: Tecnologia e Construção de Software I

## Sobre

Sistema web para cadastrar, editar, excluir e listar funcionários de uma startup, com relatórios sobre os dados. Feito em HTML e JavaScript puro, sem bibliotecas. Os dados ficam em memória, então somem ao recarregar a página.

O que o sistema faz:

- Formulário com nome, idade, cargo e salário.
- Tabela com os funcionários, botões Editar e Excluir em cada linha e busca por nome.
- Classe `Funcionario` com construtor, getters e setters e `toString()`.
- Eventos `onclick` com funções anônimas e arrow functions para buscar por id e por nome, remover e atualizar.
- Relatórios com `filter`, `map`, `reduce` e `Set`: salário acima de R$ 5.000, média salarial, cargos únicos e nomes em maiúsculo. O relatório aberto se atualiza sozinho quando os dados mudam.

## Exercícios do enunciado

- Exercício 1: formulário, tabela e array de `Funcionario` em `index.html` e `app.js`. A classe fica em `Funcionario.js`, com construtor, getters, setters e `toString()`.
- Exercício 2: botões Editar e Excluir com `onclick` e funções anônimas, em `app.js`.
- Exercício 3: arrow functions para buscar por id, buscar por nome, remover e atualizar, em `app.js`. A seção abaixo mostra a troca de função anônima por arrow function.
- Exercício 4: relatórios com `filter`, `map`, `reduce` e `Set`, no objeto `relatorios` em `app.js`.

## Como testar

Cadastre alguns funcionários pelo formulário, clique em Editar para mudar um salário e em Excluir para remover outro. Digite parte de um nome em "Buscar por nome" para filtrar a tabela. Depois use os botões de relatório.

## Função anônima e arrow function

A função anônima tradicional usada no clique dos botões:

```js
b.onclick = function () {
  acao();
};
```

A mesma coisa como arrow function:

```js
b.onclick = () => acao();
```

Nas funções de busca, remoção e atualização do array o código usa arrow functions:

```js
const buscarPorId = (id) => funcionarios.find((f) => f.id === id);
```

## O que baixar

- Git, para clonar o repositório: https://git-scm.com/downloads
- Docker Desktop, para rodar em container: https://www.docker.com/products/docker-desktop
- Um navegador comum (Chrome, Edge ou Firefox).

## Como rodar com Docker

Clone o repositório e entre na pasta:

```bash
git clone https://github.com/1kookieh/EC02-Funcionarios.git
cd EC02-Funcionarios
```

Abra o Docker Desktop, espere ele iniciar e suba o container:

```bash
docker compose up --build
```

Acesse http://localhost:8080 no navegador.

Se a porta 8080 já estiver em uso, troque o primeiro número de `"8080:80"` no `docker-compose.yml`.

Para parar:

```bash
docker compose down
```

## Como rodar sem Docker

Basta abrir o arquivo `index.html` no navegador. Não precisa instalar nada.

## Arquivos

- `index.html`: formulário, tabela e botões de relatório.
- `Funcionario.js`: classe `Funcionario`.
- `app.js`: cadastro, edição, exclusão, renderização da tabela e relatórios.
- `Dockerfile`: imagem com nginx servindo os arquivos.
- `docker-compose.yml`: sobe o container na porta 8080.
