import { Professor } from "../../domain/entity/professor"
import { ProfessorRepository } from "../../domain/repository/professorRepository"
import { ProfessorRepositoryImp } from "../../infra/repository/professorRepositoryImp"

export class GetByIdProfessor {
  private professorRepositoryImp: ProfessorRepository
  constructor() {
    this.professorRepositoryImp = new ProfessorRepositoryImp()
  }

  async execute(id: number): Promise<Professor | undefined> {
    const professor = await this.professorRepositoryImp.getById(id)
    return professor
  }
}
