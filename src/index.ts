import * as dotenv from "dotenv"
dotenv.config()
import { servidor } from "./app"
import { Configuracao } from "./configuracao"

const PORT = Configuracao.http.port
servidor.app.carregarRotas(servidor)
servidor.app.listen(PORT)
