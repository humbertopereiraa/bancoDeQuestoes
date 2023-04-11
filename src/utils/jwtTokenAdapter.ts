import { Token } from "./token"
import jwt from "jsonwebtoken"

export class JwtTokenAdapter implements Token {
  gerar(payload: any, chavePrivada: string, options?: any): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, chavePrivada, options, (erro, token) => {
        erro ? reject(erro) : resolve(token as string)
      })
    })
  }

  verificar(token: string, chavePrivada: string, options?: any): Promise<boolean> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, chavePrivada, options, (erro, tokenDecodificado) => {
        tokenDecodificado ? resolve(true as boolean) : reject(erro)
      })
    })
  }
}
