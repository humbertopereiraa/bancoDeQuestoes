import { Professor } from "../domain/entity/professor"
import { ProfessorRepository } from "../domain/repository/professorRepository"

export class GetByIdProfessor {
  constructor(private professorRepositoryImp: ProfessorRepository) {}

  async execute(id: number): Promise<Professor | undefined> {
    const professor = await this.professorRepositoryImp.getById(id)
    return professor
  }
}
