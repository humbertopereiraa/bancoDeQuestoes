import app from "../../app"
import { professorController } from "../controller/professorController"
import { check } from 'express-validator'

app.get('/professorId', [
  check('id').isNumeric().withMessage('O campo id deve ser um número'),
  check('id').notEmpty().withMessage('O campo id não pode ser vazio')
], professorController.getById.bind(professorController))
