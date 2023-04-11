import { Conexao } from "../../infra/database/conexao"
import { ProfessorRepositoryImp } from "../../infra/repository/professorRepositoryImp"
import { Autenticacao } from "../../usecases/autenticacao"
import { Encrypter } from "../../utils/encrypter"
import { JwtTokenAdapter } from "../../utils/jwtTokenAdapter"
import { AuthController } from "../controller/authController"

export class AuthControllerFactory {
  constructor(private conexao: Conexao, private chave: string) { }

  criarAuthController(): AuthController {
    const token = new JwtTokenAdapter()
    const encrypter = new Encrypter()
    const professorRepository = new ProfessorRepositoryImp(this.conexao)
    const autenticacao = new Autenticacao(token, professorRepository, encrypter, this.chave)
    return new AuthController(autenticacao)
  }
}
