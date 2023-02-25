import { Professor } from "../domain/entity/professor"
import { ProfessorRepository } from "../domain/repository/professorRepository"
import { Encrypter } from "../utils/encrypter"

export class InserirProfessor {
  constructor(private professorRepositoryImp: ProfessorRepository) { }

  async execute(professor: Professor): Promise<Professor> {
    const { nome, sobrenome, email, senha } = professor
    const encrypter = new Encrypter()
    const encryptedPassword = encrypter.encryptPassword(senha)
    const newProfessor = await this.professorRepositoryImp.inserir(new Professor(nome, sobrenome, email, encryptedPassword))
    return newProfessor
  }
}
