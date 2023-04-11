import { Professor } from "../../domain/entity/professor"
import { Autenticacao } from "../../usecases/autenticacao"

export class AuthController {
  constructor(private autenticacao: Autenticacao) { }

  auth(req: any): Promise<Professor | string> {
    return new Promise<Professor | string>(async (resolve, reject) => {
      try {
        const { email, senha } = req.body
        const professor = await this.autenticacao.execute(email, senha)
        if (!professor) {
          resolve('Email ou senha inválidos!')
          return
        }
        professor.senha = ''
        resolve(professor)
      } catch (error) {
        reject(error)
      }
    })
  }
}
