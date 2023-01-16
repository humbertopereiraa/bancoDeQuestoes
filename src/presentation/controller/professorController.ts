import { GetByIdProfessor } from "../../application/usecases/getByIdProfessor"
import { Request, Response } from 'express'
import { validationResult } from "express-validator"
import { BAD_REQUEST, SERVER_ERROR, OK } from "../../utils/error"

class ProfessorController {
  private getByIdProfessor: GetByIdProfessor
  constructor() {
    this.getByIdProfessor = new GetByIdProfessor()
  }

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
}

export const professorController = new ProfessorController()
