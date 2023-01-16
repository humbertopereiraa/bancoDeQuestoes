import express, { Application } from 'express'
import cors from "cors"
import helmet from "helmet"

class App {
  readonly app: Application
  constructor() {
    this.app = express()
    this.config()
  }

  private config(): void {
    this.app.use(helmet())
    this.app.use(cors())
    this.app.use(express.json())
  }
}

export default new App().app
