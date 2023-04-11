import { Professor } from "../entity/professor"

export interface ProfessorRepository {
  getById: (id: number) => Promise<Professor | undefined>
  getByEmail: (email: string) => Promise<Professor | undefined>
  getAll: () => Promise<Professor[]>
  inserir: (professor: Professor) => Promise<Professor>
  atualizar: (professor: Professor) => Promise<void>
  deletar: (id: number) => Promise<void>
}
