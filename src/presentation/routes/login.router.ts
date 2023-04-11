import { Servidor } from "../../app"

export = (servidor: Servidor) => {
  servidor.app.on('/login', 'post', [
    { parametro: 'email', tipo: 'notEmpty', msg: 'O email não pode ser vázio' },
    { parametro: 'senha', tipo: 'notEmpty', msg: 'A senha não pode ser vázia' }
  ], servidor.authController.auth.bind(servidor.authController))
}
