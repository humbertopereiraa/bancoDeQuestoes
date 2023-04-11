import { BAD_REQUEST } from "../../utils/error"
import { RequestParams, validacao } from "../../utils/request-validador"
import HTTP from "./http"

const Hapi = require('@hapi/hapi')

export default class HapiAdapter extends HTTP {
  app: any
  constructor() {
    super()
    this.app = Hapi.server({
      host: 'localhost'
    })
  }

  on(url: string, metodo: string, validacoes: RequestParams[], fn: (req: any) => Promise<any>): void {
    this.app.route({
      method: metodo,
      path: url,
      handler: async (req: any, reply: any) => {
        try {
          if (validacoes.length) {
            const parametros = req.query || req.body
            const errors = validacao(validacoes, parametros)
            if (errors.length) {
              return reply.response({ erros: errors }).code(BAD_REQUEST)
            }
          }
          const data = await fn(req)
          return data
        } catch (error: any) {
          return reply.response({ message: error.message }).code(422)
        }
      }
    })
  }

  async listen(porta: number): Promise<void> {
    this.app.settings.port = porta
    await this.app.start()
    console.log('Servidor Hapi rodando %s', this.app.info.uri)
  }
}
