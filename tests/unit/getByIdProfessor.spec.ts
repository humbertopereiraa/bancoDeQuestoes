import { Professor } from "../../src/domain/entity/professor"
import { GetByIdProfessor } from '../../src/usecases/getByIdProfessor'

class ProfessorRepositoryImpMock {
  async getById(id: number): Promise<Professor | undefined> {
    const professores: Professor[] = [
      { id: 1, nome: 'Humberto', sobrenome: 'Pereira', email: 'teste@gmail.com', senha: '' },
      { id: 2, nome: 'Humberto2', sobrenome: 'Pereira2', email: 'teste2@gmail.com', senha: '' }
    ]
    const resultado = await Promise.all([professores.find(item => item.id === id)])
    return resultado[0]
  }
}

describe('GetByIdProfessor', () => {
  test('Buscar professor com um id existente', async () => {
    const professorRepositoryImpMock = new ProfessorRepositoryImpMock()
    const getByIdProfessor = new GetByIdProfessor(professorRepositoryImpMock as any)
    const professor = await getByIdProfessor.execute(1)
    expect(professor).toStrictEqual({ id: 1, nome: 'Humberto', sobrenome: 'Pereira', email: 'teste@gmail.com', senha: '' })
  })

  test('Buscar professor com um id que não existe', async () => {
    const professorRepositoryImpMock = new ProfessorRepositoryImpMock()
    const getByIdProfessor = new GetByIdProfessor(professorRepositoryImpMock as any)
    const professor = await getByIdProfessor.execute(10)
    expect(professor).toBeUndefined()
  })

  test('Buscar professor com um id undefined/null', async () => {
    const professorRepositoryImpMock = new ProfessorRepositoryImpMock()
    const getByIdProfessor = new GetByIdProfessor(professorRepositoryImpMock as any)
    const professorUndefined = await getByIdProfessor.execute(undefined as any)
    const professorNull = await getByIdProfessor.execute(undefined as any)
    expect(professorUndefined).toBeUndefined()
    expect(professorNull).toBeUndefined()
  })
})
