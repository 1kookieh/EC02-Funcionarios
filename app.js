// Aluno: Igor Santos Chediack Pimenta Bueno
// Professor: Daniel Correa da Silva
let funcionarios = [];
// Contador próprio de ids, para não reaproveitar o número de quem foi excluído.
let proximoId = 1;
let editandoId = null;
let relatorioAtual = null;

const form = document.getElementById("form");
const corpo = document.getElementById("corpo");
const saida = document.getElementById("saida");
const botaoSalvar = document.getElementById("salvar");
const busca = document.getElementById("busca");
const vazio = document.getElementById("vazio");

const moeda = (valor) => valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

// Arrow function: faria o mesmo que function (id) { return ... }, só que mais curta.
const buscarPorId = (id) => funcionarios.find((f) => f.id === id);

// Outra arrow function, agora com filter: busca pelo nome sem diferenciar maiúscula de minúscula.
const buscarPorNome = (nome) =>
  funcionarios.filter((f) => f.nome.toLowerCase().includes(nome.trim().toLowerCase()));

const removerPorId = (id) => {
  funcionarios = funcionarios.filter((f) => f.id !== id);
};

const atualizar = (id, nome, idade, cargo, salario) => {
  const f = buscarPorId(id);
  f.nome = nome;
  f.idade = idade;
  f.cargo = cargo;
  f.salario = salario;
};

const celula = (linha, texto) => {
  const td = document.createElement("td");
  td.textContent = texto;
  linha.appendChild(td);
};

const botao = (texto, acao) => {
  const b = document.createElement("button");
  b.type = "button";
  // Função anônima tradicional. A versão arrow seria b.onclick = () => acao();
  b.textContent = texto;
  b.onclick = function () {
    acao();
  };
  return b;
};

const renderizar = () => {
  corpo.innerHTML = "";
  const lista = buscarPorNome(busca.value);
  vazio.hidden = lista.length > 0;
  vazio.textContent = funcionarios.length ? "Nenhum funcionário encontrado." : "Nenhum funcionário cadastrado.";
  lista.forEach((f) => {
    const tr = document.createElement("tr");
    celula(tr, f.id);
    celula(tr, f.nome);
    celula(tr, f.idade);
    celula(tr, f.cargo);
    celula(tr, moeda(f.salario));
    const acoes = document.createElement("td");
    acoes.appendChild(botao("Editar", () => editar(f.id)));
    acoes.appendChild(botao("Excluir", () => excluir(f.id)));
    tr.appendChild(acoes);
    corpo.appendChild(tr);
  });
  atualizarRelatorio();
};

const limpar = () => {
  form.reset();
  editandoId = null;
  botaoSalvar.textContent = "Cadastrar";
};

const salvarFuncionario = () => {
  if (!form.reportValidity()) return;
  const { nome, idade, cargo, salario } = form.elements;
  const dados = [nome.value.trim(), Number(idade.value), cargo.value.trim(), Number(salario.value)];
  if (editandoId !== null) {
    atualizar(editandoId, ...dados);
  } else {
    funcionarios.push(new Funcionario(proximoId++, ...dados));
  }
  limpar();
  renderizar();
};

const editar = (id) => {
  const f = buscarPorId(id);
  const { nome, idade, cargo, salario } = form.elements;
  nome.value = f.nome;
  idade.value = f.idade;
  cargo.value = f.cargo;
  salario.value = f.salario;
  editandoId = id;
  botaoSalvar.textContent = "Salvar edição";
};

const excluir = (id) => {
  removerPorId(id);
  if (editandoId === id) limpar();
  renderizar();
};

const relatorios = {
  altos: () =>
    "Salário maior que R$ 5.000,00:\n" +
    (funcionarios.filter((f) => f.salario > 5000).map((f) => f.toString()).join("\n") || "Nenhum funcionário."),
  media: () => {
    const total = funcionarios.reduce((soma, f) => soma + f.salario, 0);
    return "Média salarial: " + moeda(funcionarios.length ? total / funcionarios.length : 0);
  },
  // O Set descarta os cargos repetidos.
  cargos: () =>
    "Cargos únicos:\n" +
    ([...new Set(funcionarios.map((f) => f.cargo))].join("\n") || "Nenhum funcionário."),
  maiusculo: () =>
    "Nomes em maiúsculo:\n" +
    (funcionarios.map((f) => f.nome.toUpperCase()).join("\n") || "Nenhum funcionário."),
};

const atualizarRelatorio = () => {
  if (relatorioAtual) saida.textContent = relatorios[relatorioAtual]();
};

botaoSalvar.onclick = function () {
  salvarFuncionario();
};

busca.oninput = function () {
  renderizar();
};

document.getElementById("cancelar").onclick = function () {
  limpar();
};

document.querySelectorAll("[data-relatorio]").forEach((b) => {
  b.onclick = function () {
    relatorioAtual = b.dataset.relatorio;
    atualizarRelatorio();
  };
});
