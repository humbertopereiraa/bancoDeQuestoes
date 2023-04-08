import { servidor } from "../../app"

servidor.app.on('/professorId', 'get', [
  { parametro: 'id', tipo: 'isNumeric', msg: 'O campo id deve ser um número' },
  { parametro: 'id', tipo: 'notEmpty', msg: 'O campo id não pode ser vazio' }
], servidor.professorController.getById.bind(servidor.professorController))

servidor.app.on('/professores', 'get', [], servidor.professorController.getAll.bind(servidor.professorController))

servidor.app.on('/professor', 'post', [
  { parametro: 'nome', tipo: 'notEmpty', msg: 'O campo nome não pode ser vazio' },
  { parametro: 'sobrenome', tipo: 'notEmpty', msg: 'O campo sobrenome não pode ser vazio' },
  { parametro: 'email', tipo: 'notEmpty', msg: 'O campo email não pode ser vazio' },
  { parametro: 'email', tipo: 'emailValid', msg: 'O campo email não pode ser vazio' },
  { parametro: 'senha', tipo: 'notEmpty', msg: 'O campo senha não pode ser vazio' }
], servidor.professorController.inserir.bind(servidor.professorController))
