import app from "../../app"
import { professorController } from "../controller/professorController"

app.on('/professorId', 'get', [
  { parametro: 'id', tipo: 'isNumeric', msg: 'O campo id deve ser um número' },
  { parametro: 'id', tipo: 'notEmpty', msg: 'O campo id não pode ser vazio' }
], professorController.getById.bind(professorController))

app.on('/professores', 'get', [], professorController.getAll.bind(professorController))

app.on('/professor', 'post', [
  { parametro: 'nome', tipo: 'notEmpty', msg: 'O campo nome não pode ser vazio' },
  { parametro: 'sobrenome', tipo: 'notEmpty', msg: 'O campo sobrenome não pode ser vazio' },
  { parametro: 'email', tipo: 'notEmpty', msg: 'O campo email não pode ser vazio' },
  { parametro: 'email', tipo: 'emailValid', msg: 'O campo email não pode ser vazio' },
  { parametro: 'senha', tipo: 'notEmpty', msg: 'O campo senha não pode ser vazio' }
], professorController.inserir.bind(professorController))
