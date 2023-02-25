import app from "../../app"
import { professorController } from "../controller/professorController"
import { check } from 'express-validator'

app.get('/professorId', [
  check('id').isNumeric().withMessage('O campo id deve ser um número'),
  check('id').notEmpty().withMessage('O campo id não pode ser vazio')
], professorController.getById.bind(professorController))

app.get('/professores', [], professorController.getAll.bind(professorController))

app.post('/professor', [
  check('nome').notEmpty().withMessage('O campo nome não pode ser vazio'),
  check('sobrenome').notEmpty().withMessage('O campo nome não pode ser vazio'),
  check('email').notEmpty().withMessage('O campo nome não pode ser vazio'),
  check('senha').notEmpty().withMessage('O campo nome não pode ser vazio')
], professorController.inserir.bind(professorController))
