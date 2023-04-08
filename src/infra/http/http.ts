import { RequestParams } from "../../utils/request-validador"

export interface Http {
  on: (url: string, metodo: string, validacoes: RequestParams[], fn: any) => any
  listen: (porta: number) => void
}
