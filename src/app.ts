import { ExpressAdapter } from './infra/http/expressAdapter'
// import HapiAdapter from './infra/http/hapiAdapter'
import { Http } from './infra/http/http'

class App {
  readonly app: Http
  constructor() {
    this.app = new ExpressAdapter()
  }
}

export default new App().app
