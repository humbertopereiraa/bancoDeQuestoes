import { Professor } from "../../src/domain/entity/professor"
import { GetAllProfessor } from '../../src/usecases/getAllProfessor'

class ProfessorRepositoryImpMock {
  async getAll(): Promise<Professor[]> {
    const professores: Professor[] = [
      { id: 1, nome: 'Humberto', sobrenome: 'Pereira', email: 'teste@gmail.com', senha: '' },
      { id: 2, nome: 'Humberto2', sobrenome: 'Pereira2', email: 'teste2@gmail.com', senha: '' }
    ]
    const resultado = await Promise.all(professores)
    return resultado
  }
}

describe('GetAllProfessor', () => {
  test('Buscar todos Professores', async () => {
    const professorRepositoryImpMock = new ProfessorRepositoryImpMock()
    const getAllProfessor = new GetAllProfessor(professorRepositoryImpMock as any)
    const professores = await getAllProfessor.execute()
    expect(Array.isArray(professores)).toBe(true)
  })
})