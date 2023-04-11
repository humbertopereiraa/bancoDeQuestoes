import { Configuracao } from './configuracao'
import { PostgresConexao } from './infra/database/postgresConexao'
import { ExpressAdapter } from './infra/http/expressAdapter'
import HTTP from './infra/http/http'
import { AuthController } from './presentation/controller/authController'
import { ProfessorController } from './presentation/controller/professorController'
import { AuthControllerFactory } from './presentation/factories/authControllerFactory'
import { ProfessorControllerFactory } from './presentation/factories/professorControllerFactory'

export interface Servidor {
  app: HTTP
  professorController: ProfessorController
  authController: AuthController
}

const conexao = PostgresConexao.getInstance()
const professorControllerFactory = new ProfessorControllerFactory(conexao)
const authControllerFactory = new AuthControllerFactory(conexao, Configuracao.token.chave as string)
export const servidor: Servidor = {
  app: new ExpressAdapter(),
  professorController: professorControllerFactory.criarProfessorController(),
  authController: authControllerFactory.criarAuthController()
}
