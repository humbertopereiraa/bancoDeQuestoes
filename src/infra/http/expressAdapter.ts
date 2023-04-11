import HTTP from "./http"
import express, { Application } from 'express'
import cors from "cors"
import helmet from "helmet"
import { RequestParams, validacao } from "../../utils/request-validador"
import { BAD_REQUEST, OK, SERVER_ERROR } from "../../utils/error"

export class ExpressAdapter extends HTTP {
  app: Application
  constructor() {
    super()
    this.app = express()
    this.config()
  }

  private config(): void {
    this.app.use(helmet())
    this.app.use(cors())
    this.app.use(express.json())
  }

  on(url: string, metodo: string, validacoes: RequestParams[], fn: (req: any) => Promise<any>): void {
    // @ts-ignore
    this.app[metodo](url, async (req: any, res: any) => {
      try {
        if (validacoes.length) {
          const parametros = Object.keys(req.query).length ? req.query : req.body
          const errors = validacao(validacoes, parametros)
          if (errors.length) {
            return res.status(BAD_REQUEST).json({ erros: errors })
          }
        }
        const output = await fn(req)
        return res.status(OK).json(output)
      } catch (error) {
        return res.status(SERVER_ERROR).json(error)
      }
    })
  }

  listen(porta: number): void {
    this.app.listen(porta)
    console.log(`Servidor Express rodando na porta: ${porta}`)
  }
}
