import { Professor } from "../entity/professor"

export interface ProfessorRepository {
  getById: (id: number) => Promise<Professor | undefined>
  getAll: () => Promise<Professor[]>
  insert: (professor: Professor) => Promise<Professor>
  update: (professor: Professor) => Promise<void>
  delete: (id: number) => Promise<void>
}
