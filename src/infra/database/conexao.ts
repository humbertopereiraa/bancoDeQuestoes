import { DataBase } from "./database"
import { Configuracao } from "../../configuracao"
const Pool = require('pg-pool')

export class Conexao implements DataBase {
  private readonly pg: any
  static instance: Conexao
  private constructor() {
    this.pg = new Pool({
      database: Configuracao.bd.database,
      user: Configuracao.bd.user,
      password: Configuracao.bd.password,
      port: Configuracao.bd.port,
      ssl: false,
      max: Configuracao.bd.pool_max
    })
  }

  static getInstance() {
    if (!Conexao.instance) {
      Conexao.instance = new Conexao()
    }
    return Conexao.instance
  }

  query(query: string, parameters: any): any {
    return this.pg.query(query, parameters) as Promise<any>
  }
}
