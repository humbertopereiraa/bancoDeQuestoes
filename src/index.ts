import * as dotenv from "dotenv"
import express from "express"
import cors from "cors"
import helmet from "helmet"
import { Configuracao } from "./configuracao"

dotenv.config()
const app = express()

const PORT = Configuracao.http.port

app.use(helmet())
app.use(cors())
app.use(express.json())

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
