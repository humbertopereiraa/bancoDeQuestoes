import { Professor } from "../../domain/entity/professor"
import { ProfessorRepository } from "../../domain/repository/professorRepository"
import { Conexao } from "../database/conexao"

export class ProfessorRepositoryImp implements ProfessorRepository {
  constructor(private conexao: Conexao) { }

  async getById(id: number): Promise<Professor | undefined> {
    const resultado = await this.conexao.query('SELECT * FROM professor WHERE id_professor = $1', [id])
    return (resultado?.rows && resultado?.rows.length) ? resultado.rows[0] : undefined
  }

  async getAll(): Promise<Professor[]> {
    const resultado = await this.conexao.query('SELECT * FROM professor', [])
    return resultado?.rows ? resultado.rows : []
  }

  async inserir(professor: Professor): Promise<Professor> {
    const params = [professor.nome, professor.sobrenome, professor.email, professor.senha]
    const resultado = await this.conexao.query("INSERT INTO professor VALUES(nextval('professor_id_seq'),$1,$2,$3,$4) RETURNING id_professor", params)
    professor.id = resultado?.rows[0].id_professor
    return professor
  }

  atualizar(professor: Professor): Promise<void> {
    const params = [professor.nome, professor.sobrenome, professor.email, professor.senha, professor.id]
    return this.conexao.query('UPDATE professor SET nome = $1, sobrenome = $2, email = $3, senha = $4 WHERE id_professor = $5', params)
  }

  deletar(id: number): Promise<void> {
    return this.conexao.query('DELETE FROM professor WHERE id_professor = $1', [id])
  }
}
