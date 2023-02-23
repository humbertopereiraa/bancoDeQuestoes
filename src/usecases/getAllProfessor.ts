import { Professor } from "../domain/entity/professor"
import { ProfessorRepository } from "../domain/repository/professorRepository"

export class GetAllProfessor {
  constructor(private professorRepositoryImp: ProfessorRepository) {}

  async execute(): Promise<Professor[]> {
    const professores = await this.professorRepositoryImp.getAll()
    return professores
  }
}
