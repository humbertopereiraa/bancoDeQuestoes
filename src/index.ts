import * as dotenv from "dotenv"
dotenv.config()
import app from "./app"
import path from "path"
import { Configuracao } from "./configuracao"

const consign = require('consign')
const PORT = Configuracao.http.port

consign({
  cwd: path.join(__dirname, 'presentation'),
  locale: 'pt-br',
  extensions: ['.js', '.ts', '.json', '.node']
}).include('routes').into(app)

app.listen(PORT)
