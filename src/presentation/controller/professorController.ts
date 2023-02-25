import { GetByIdProfessor } from "../../usecases/getByIdProfessor"
import { GetAllProfessor } from '../../usecases/getAllProfessor'
import { Request, Response } from 'express'
import { validationResult } from "express-validator"
import { BAD_REQUEST, SERVER_ERROR, OK } from "../../utils/error"
import { Conexao } from "../../infra/database/conexao"
import { ProfessorRepositoryImp } from "../../infra/repository/professorRepositoryImp"
import { EmailValidator } from "../../utils/email-validator"
import { InserirProfessor } from "../../usecases/inserirProfessor"
import { Professor } from "../../domain/entity/professor"

class ProfessorController {
  constructor(private getByIdProfessor: GetByIdProfessor, private getAllProfessor: GetAllProfessor,
    private inserirProfessor: InserirProfessor) {
  }

  async getById(req: Request, res: Response): Promise<any> {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(BAD_REQUEST).json({ errors: errors.array() })
      }
      const idProfessor = typeof req.query.id === 'string' ? parseInt(req.query.id) : req.query.id
      const professor = await this.getByIdProfessor.execute(idProfessor as number) as Professor
      if (professor) {
        professor.senha = ''
      }
      return res.status(OK).json(professor)
    } catch (error) {
      return res.status(SERVER_ERROR).json(error)
    }
  }

  async getAll(_req: Request, res: Response): Promise<any> {
    try {
      let professores = await this.getAllProfessor.execute()
      if (Array.isArray(professores)) {
        professores = professores.map(p => {
          p.senha = ''
          return p
        })
      }
      return res.status(OK).json(professores)
    } catch (error) {
      return res.status(SERVER_ERROR).json(error)
    }
  }

  async inserir(req: Request, res: Response): Promise<any> {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(BAD_REQUEST).json({ errors: errors.array() })
      }
      const professor = req.body
      const emailValidator = new EmailValidator()
      if (!emailValidator.isValid(professor.email)) {
        return res.status(BAD_REQUEST).json({ error: 'Email Inválido!', code: BAD_REQUEST })
      }
      const newProfessor = await this.inserirProfessor.execute(professor)
      if (newProfessor) {
        newProfessor.senha = ''
      }
      return res.status(OK).json(newProfessor)
    } catch (error) {
      return res.status(SERVER_ERROR).json(error)
    }
  }
}

const conexao = Conexao.getInstance()
const professorRepository = new ProfessorRepositoryImp(conexao)
const getByIdProfessor = new GetByIdProfessor(professorRepository)
const getAllProfessor = new GetAllProfessor(professorRepository)
const inserirProfessor = new InserirProfessor(professorRepository)
export const professorController = new ProfessorController(getByIdProfessor, getAllProfessor, inserirProfessor)
