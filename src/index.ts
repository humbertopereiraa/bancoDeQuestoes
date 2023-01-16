import * as dotenv from "dotenv"
dotenv.config()
import express from "express"
import path from "path"
import app from "./app"
import { Configuracao } from "./configuracao"

const consign = require('consign')
const PORT = Configuracao.http.port
const router = express.Router()
app.use(router)

consign({
  cwd: path.join(__dirname, 'presentation'),
  locale: 'pt-br',
  extensions: ['.js', '.ts', '.json', '.node']
}).include('routes').into(app)

app.listen(PORT, () => {
  console.log(`API Banco de questões rodando na porta: ${PORT}`)
})
