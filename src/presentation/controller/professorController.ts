import { GetByIdProfessor } from "../../usecases/getByIdProfessor"
import { GetAllProfessor } from '../../usecases/getAllProfessor'
import { InserirProfessor } from "../../usecases/inserirProfessor"
import { Professor } from "../../domain/entity/professor"

export class ProfessorController {
  constructor(private getByIdProfessor: GetByIdProfessor, private getAllProfessor: GetAllProfessor,
    private inserirProfessor: InserirProfessor) {
  }

  getById(req: any): Promise<Professor> {
    return new Promise<Professor>(async (resolve, reject) => {
      try {
        const parametro = req.query
        const idProfessor = typeof parametro.id === 'string' ? parseInt(parametro.id) : parametro.id
        const professor = await this.getByIdProfessor.execute(idProfessor as number) as Professor
        if (professor) {
          professor.senha = ''
        }
        resolve(professor)
      } catch (error) {
        reject(error)
      }
    })
  }

  getAll(): Promise<Professor[]> {
    return new Promise<Professor[]>(async (resolve, reject) => {
      try {
        let professores = await this.getAllProfessor.execute()
        if (Array.isArray(professores)) {
          professores = professores.map(p => {
            p.senha = ''
            return p
          })
        }
        resolve(professores)
      } catch (error) {
        reject(error)
      }
    })
  }

  inserir(req: Request): Promise<Professor> {
    return new Promise<Professor>(async (resolve, reject) => {
      try {
        const professor: unknown = req.body
        const newProfessor = await this.inserirProfessor.execute(professor as Professor)
        if (newProfessor) {
          newProfessor.senha = ''
        }
        resolve(newProfessor)
      } catch (error) {
        reject(error)
      }
    })
  }
}
