import { Conexao } from "./conexao"
import { Configuracao } from "../../configuracao"
const Pool = require('pg-pool')

export class PostgresConexao implements Conexao {
  private readonly pg: any
  static instance: Conexao
  constructor() {
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
    if (!PostgresConexao.instance) {
      PostgresConexao.instance = new PostgresConexao()
    }
    return PostgresConexao.instance
  }

  query(query: string, parameters: any): Promise<any> {
    return this.pg.query(query, parameters) as Promise<any>
  }

  close(): Promise<any> {
    return this.pg.end()
  }
}
