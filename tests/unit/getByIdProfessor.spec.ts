import { Professor } from "../../src/domain/entity/professor"
import { GetByIdProfessor } from '../../src/usecases/getByIdProfessor'

class ProfessorRepositoryImpMock {
  async getById(id: number): Promise<Professor | undefined> {
    const professores: Professor[] = [
      { id: 1, nome: 'any_nome', sobrenome: 'any_sobrenome', email: 'any@email.com', senha: '' },
      { id: 2, nome: 'any_nome2', sobrenome: 'any_sobrenome2', email: 'any2@email.com', senha: '' }
    ]
    const resultado = await Promise.all([professores.find(item => item.id === id)])
    return resultado[0]
  }
}

describe('GetByIdProfessor', () => {
  test('Buscar professor com um id existente', async () => {
    const professorRepositoryImpMock = new ProfessorRepositoryImpMock()
    const sut = new GetByIdProfessor(professorRepositoryImpMock as any)
    const professor = await sut.execute(1)
    expect(professor).toStrictEqual({ id: 1, nome: 'any_nome', sobrenome: 'any_sobrenome', email: 'any@email.com', senha: '' })
  })

  test('Buscar professor com um id que não existe', async () => {
    const professorRepositoryImpMock = new ProfessorRepositoryImpMock()
    const sut = new GetByIdProfessor(professorRepositoryImpMock as any)
    const professor = await sut.execute(10)
    expect(professor).toBeUndefined()
  })

  test('Buscar professor com um id undefined/null', async () => {
    const professorRepositoryImpMock = new ProfessorRepositoryImpMock()
    const sut = new GetByIdProfessor(professorRepositoryImpMock as any)
    const professorUndefined = await sut.execute(undefined as any)
    const professorNull = await sut.execute(undefined as any)
    expect(professorUndefined).toBeUndefined()
    expect(professorNull).toBeUndefined()
  })
})
