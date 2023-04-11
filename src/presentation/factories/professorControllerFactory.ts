import { Conexao } from "../../infra/database/conexao"
import { ProfessorRepositoryImp } from "../../infra/repository/professorRepositoryImp"
import { ProfessorController } from "../../presentation/controller/professorController"
import { GetAllProfessor } from "../../usecases/getAllProfessor"
import { GetByIdProfessor } from "../../usecases/getByIdProfessor"
import { InserirProfessor } from "../../usecases/inserirProfessor"

export class ProfessorControllerFactory {
  constructor(private conexao: Conexao) { }

  criarProfessorController(): ProfessorController {
    const professorRepository = new ProfessorRepositoryImp(this.conexao)
    const getByIdProfessor = new GetByIdProfessor(professorRepository)
    const getAllProfessor = new GetAllProfessor(professorRepository)
    const inserirProfessor = new InserirProfessor(professorRepository)
    return new ProfessorController(getByIdProfessor, getAllProfessor, inserirProfessor)
  }
}
