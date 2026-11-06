// Aluno: Igor Santos Chediack Pimenta Bueno
// Professor: Daniel Correa da Silva
class Funcionario {
  // Campos privados (#): só os getters e setters da classe mexem neles.
  #id;
  #nome;
  #idade;
  #cargo;
  #salario;

  constructor(id, nome, idade, cargo, salario) {
    this.#id = id;
    this.#nome = nome;
    this.#idade = idade;
    this.#cargo = cargo;
    this.#salario = salario;
  }

  get id() {
    return this.#id;
  }

  get nome() {
    return this.#nome;
  }

  set nome(nome) {
    this.#nome = nome;
  }

  get idade() {
    return this.#idade;
  }

  set idade(idade) {
    this.#idade = idade;
  }

  get cargo() {
    return this.#cargo;
  }

  set cargo(cargo) {
    this.#cargo = cargo;
  }

  get salario() {
    return this.#salario;
  }

  set salario(salario) {
    this.#salario = salario;
  }

  toString() {
    const valor = this.#salario.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    return `${this.#nome}, ${this.#idade} anos, ${this.#cargo}, ${valor}`;
  }
}
