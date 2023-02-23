import { GetByIdProfessor } from "../../usecases/getByIdProfessor"
import { GetAllProfessor } from '../../usecases/getAllProfessor'
import { Request, Response } from 'express'
import { validationResult } from "express-validator"
import { BAD_REQUEST, SERVER_ERROR, OK } from "../../utils/error"
import { Conexao } from "../../infra/database/conexao"
import { ProfessorRepositoryImp } from "../../infra/repository/professorRepositoryImp"

class ProfessorController {
  constructor(private getByIdProfessor: GetByIdProfessor, private getAllProfessor: GetAllProfessor) { }

  async getById(req: Request, res: Response): Promise<any> {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(BAD_REQUEST).json({ errors: errors.array() })
      }
      const idProfessor = typeof req.query.id === 'string' ? parseInt(req.query.id) : req.query.id
      const professor = await this.getByIdProfessor.execute(idProfessor as number)
      return res.status(OK).json(professor)
    } catch (error) {
      return res.status(SERVER_ERROR).json(error)
    }
  }

  async getAll(_req: Request, res: Response): Promise<any> {
    try {
      const professores = await this.getAllProfessor.execute()
      return res.status(OK).json(professores)
    } catch (error) {
      return res.status(SERVER_ERROR).json(error)
    }
  }
}

const conexao = Conexao.getInstance()
const professorRepository = new ProfessorRepositoryImp(conexao)
const getByIdProfessor = new GetByIdProfessor(professorRepository)
const getAllProfessor = new GetAllProfessor(professorRepository)
export const professorController = new ProfessorController(getByIdProfessor, getAllProfessor)
