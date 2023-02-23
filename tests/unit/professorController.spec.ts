import { professorController } from '../../src/presentation/controller/professorController'
import { GetByIdProfessor } from '../../src/usecases/getByIdProfessor'
import { GetAllProfessor } from '../../src/usecases/getAllProfessor'
import { validationResult } from 'express-validator'
import { mockRequest, mockResponse } from 'jest-mock-req-res'
import { Professor } from '../../src/domain/entity/professor'

jest.mock('../../src/usecases/getByIdProfessor')
jest.mock('../../src/usecases/getAllProfessor')
jest.mock('express-validator')

describe('ProfessorController', () => {
  describe('getById', () => {
    test('Deve retornar um professor com status 200', async () => {
      (validationResult as any).mockReturnValueOnce({ isEmpty: () => true, array: () => [] })
      const req = { query: { id: 1 } }
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
      const professor = { id: 1, nome: 'Humberto', sobrenome: 'Pereira', email: 'teste@gmail.com' } as Professor
      (GetByIdProfessor.prototype.execute as any).mockResolvedValue(professor)
      await professorController.getById(req as any, res as any)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith(professor)
    })

    test('Deve retornar um erro com status 400 se o corpo da solicitação não tiver o campo de id', async () => {
      const req = mockRequest({ query: {} })
      const res = mockResponse();
      (validationResult as any).mockReturnValueOnce({
        isEmpty: () => false,
        array: () => [
          { msg: 'O campo id deve ser um número' },
          { msg: 'O campo id não pode ser vazio' }
        ]
      })
      await professorController.getById(req as any, res as any)
      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({
        errors: [
          { msg: 'O campo id deve ser um número' },
          { msg: 'O campo id não pode ser vazio' }
        ]
      })
    })

    test('Deve retornar um erro com status 400 se o campo id for string', async () => {
      const req = mockRequest({ query: { id: '1' } })
      const res = mockResponse();
      (validationResult as any).mockReturnValueOnce({
        isEmpty: () => false,
        array: () => [
          { msg: 'O campo id deve ser um número' }
        ]
      })
      await professorController.getById(req as any, res as any)
      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({
        errors: [
          { msg: 'O campo id deve ser um número' }
        ]
      })
    })

    test('Deve retornar o erro com status 500 se ocorre algum erro', async () => {
      const req = mockRequest({})
      const res = mockResponse()
      const erro = new Error('Erro Interno do Servidor');
      (validationResult as any).mockReturnValueOnce({ isEmpty: () => true, array: () => [] });
      (GetByIdProfessor.prototype.execute as any).mockImplementation(erro)
      await professorController.getById(req as any, res as any)
      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith(erro)
    });
  })

  describe('getAll', () => {
    test('Deve retornar um aray de professores com status 200', async () => {
      const req = mockRequest({})
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
      const professores = [
        { id: 1, nome: 'Humberto', sobrenome: 'Pereira', email: 'teste@gmail.com' },
        { id: 1, nome: 'Humberto2', sobrenome: 'Pereira2', email: 'teste2@gmail.com' }
      ] as Professor[]
      (GetAllProfessor.prototype.execute as any).mockResolvedValue(professores)
      await professorController.getAll(req as any, res as any)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith(professores)
    })

    test('Deve retornar o erro com status 500 se ocorre algum erro', async () => {
      const req = mockRequest({})
      const res = mockResponse()
      const erro = new Error('Erro Interno do Servidor');
      (GetAllProfessor.prototype.execute as any).mockImplementation(erro)
      await professorController.getAll(req as any, res as any)
      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith(erro)
    });
  })
})
