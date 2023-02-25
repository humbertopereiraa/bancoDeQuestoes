import { Professor } from "../../src/domain/entity/professor"
import { ProfessorRepository } from "../../src/domain/repository/professorRepository"
import { InserirProfessor } from "../../src/usecases/inserirProfessor"

describe('InserirProfessor', () => {
  const professorRepositoryImpMock = { inserir: jest.fn() } as unknown as ProfessorRepository

  test('Deve inserir um usuário no banco de dados', async () => {
    const professor = {
      nome: 'any_nome',
      sobrenome: 'any_sobrenome',
      email: 'any@mail.com',
      senha: 'any_senha',
    } as Professor
    (professorRepositoryImpMock.inserir as any).mockReturnValueOnce(professor)
    const sut = new InserirProfessor(professorRepositoryImpMock as any)
    const professorInserido = await sut.execute(professor)
    expect(professorInserido).toEqual(professor)
  })
})