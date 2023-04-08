import { PostgresConexao } from './infra/database/postgresConexao'
import { ExpressAdapter } from './infra/http/expressAdapter'
import { Http } from './infra/http/http'
import { ProfessorController } from './presentation/controller/professorController'
import { ProfessorControllerFactory } from './presentation/factories/professorControllerFactory'

interface Servidor {
  app: Http
  professorController: ProfessorController
}

const conexao = PostgresConexao.getInstance()
const professorControllerFactory = new ProfessorControllerFactory(conexao)
export const servidor: Servidor = {
  app: new ExpressAdapter(),
  professorController: professorControllerFactory.criarProfessorController()
}
