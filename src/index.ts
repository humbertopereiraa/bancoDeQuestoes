import * as dotenv from "dotenv"
dotenv.config()
import { servidor } from "./app"
import path from "path"
import { Configuracao } from "./configuracao"

const consign = require('consign')
const PORT = Configuracao.http.port

consign({
  cwd: path.join(__dirname, 'presentation'),
  locale: 'pt-br',
  extensions: ['.js', '.ts', '.json', '.node']
}).include('routes').into(servidor.app)

servidor.app.listen(PORT)
