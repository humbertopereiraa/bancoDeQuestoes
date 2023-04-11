import { RequestParams } from "../../utils/request-validador"
import path from "path"
import fs from 'fs'
import { Servidor } from "../../app"

export default abstract class HTTP {
  abstract on(url: string, metodo: string, validacoes: RequestParams[], fn: any): any
  abstract listen(porta: number): void

  carregarRotas(servidor: Servidor): void {
    const diretorio = `${path.join(__dirname, '../../', 'presentation//routes')}`
    fs.readdirSync(diretorio).forEach((arquivo) => {
      console.log(`/${arquivo}`)
      const caminhoDoArquivo = path.join(diretorio, arquivo)
      const includeFn = require(caminhoDoArquivo)
      includeFn(servidor)
    })
  }
}
