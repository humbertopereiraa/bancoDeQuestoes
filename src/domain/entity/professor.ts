export class Professor {
  id: number | null
  nome: string
  sobrenome: string
  email: string
  senha: string
  token?: string
  constructor(nome: string, sobrenome: string, email: string, senha: string) {
    this.id = null
    this.nome = nome
    this.sobrenome = sobrenome
    this.email = email
    this.senha = senha
  }
}
