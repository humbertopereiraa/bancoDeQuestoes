import { Professor } from "../domain/entity/professor"
import { ProfessorRepository } from "../domain/repository/professorRepository"
import { Encrypter } from "../utils/encrypter"
import { Token } from "../utils/token"

export class Autenticacao {
  constructor(private tokenProvider: Token, private professorRepositoryImp: ProfessorRepository, private encrypter: Encrypter, private chave: string) { }

  async execute(email: string, senha: string): Promise<Professor | undefined> {
    const professor = await this.professorRepositoryImp.getByEmail(email)
    const valido = professor && await this.encrypter.comparePassword(senha, professor.senha)
    if (valido) {
      professor.token = await this.tokenProvider.gerar({ id: professor.id }, this.chave, { expiresIn: 300 }) // 5min
      return professor
    }
    return undefined
  }
}
