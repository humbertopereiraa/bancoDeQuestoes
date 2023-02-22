import { professorController } from '../../src/presentation/controller/professorController'
import { GetByIdProfessor } from '../../src/application/usecases/getByIdProfessor'
import { validationResult } from 'express-validator'
import { mockRequest, mockResponse } from 'jest-mock-req-res'

jest.mock('../../src/application/usecases/getByIdProfessor')
jest.mock('express-validator')

describe('ProfessorController', () => {
  describe('getById', () => {
    test('Deve retornar um professor com status 200', async () => {
      (validationResult as any).mockReturnValueOnce({ isEmpty: () => true, array: () => [] })
      const req = { query: { id: 1 } }
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
      const professor = { id: 1, nome: 'Humberto', sobrenome: 'Pereira', email: 'teste@gmail.com' } as any
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
      const res = mockResponse();
      (validationResult as any).mockReturnValueOnce({ isEmpty: () => true, array: () => [] });
      (GetByIdProfessor.prototype.execute as any).mockImplementation(new Error('Erro Interno do Servidor'))
      await professorController.getById(req as any, res as any)
      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith(new Error('Erro Interno do Servidor'))
    });
  })
})
