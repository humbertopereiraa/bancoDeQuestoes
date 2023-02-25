import { Professor } from "../../src/domain/entity/professor"
import { GetAllProfessor } from '../../src/usecases/getAllProfessor'

class ProfessorRepositoryImpMock {
  async getAll(): Promise<Professor[]> {
    const professores: Professor[] = [
      { id: 1, nome: 'any_nome', sobrenome: 'any_sobrenome', email: 'any@email.com', senha: '' },
      { id: 2, nome: 'any_nome2', sobrenome: 'any_sobrenome2', email: 'any2@email.com', senha: '' }
    ]
    const resultado = await Promise.all(professores)
    return resultado
  }
}

describe('GetAllProfessor', () => {
  test('Buscar todos Professores', async () => {
    const professorRepositoryImpMock = new ProfessorRepositoryImpMock()
    const sut = new GetAllProfessor(professorRepositoryImpMock as any)
    const professores = await sut.execute()
    expect(Array.isArray(professores)).toBe(true)
  })
})