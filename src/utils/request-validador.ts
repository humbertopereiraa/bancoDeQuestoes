import { EmailValidator } from "./email-validator"

export interface RequestParams {
  parametro: string
  tipo: 'isNumeric' | 'notEmpty' | 'emailValid'
  msg: string
}

export interface ErroValidacao {
  param: string
  msg: string
}

/** Método para validar parâmetros do Resquest */
export function validacao(params: RequestParams[], body: any): ErroValidacao[] {
  const erros: ErroValidacao[] = []
  const emailValidator = new EmailValidator()
  for (const item of params) {
    const result = Object.prototype.hasOwnProperty.call(body, item.parametro)
    if (!result) {
      const paramResquest = { parametro: item.parametro, msg: `Erra esperado o parâmetro ${item.parametro}` }
      erros.push(motarObjetoDeErro(paramResquest as RequestParams))
      continue
    }
    switch (item.tipo) {
      case 'isNumeric':
        if (!body[item.parametro] || isNaN(body[item.parametro])) {
          erros.push(motarObjetoDeErro(item))
        }
        break
      case 'notEmpty':
        if (!body[item.parametro] || body[item.parametro] === 0) {
          erros.push(motarObjetoDeErro(item))
        }
        break
      case 'emailValid':
        if (!emailValidator.isValid(body.email)) {
          const paramResquest = { parametro: item.parametro, msg: 'Email Inválido!' }
          erros.push(motarObjetoDeErro(paramResquest as RequestParams))
        }
        break
    }
  }
  return erros
}

function motarObjetoDeErro(params: RequestParams): ErroValidacao {
  return {
    param: params.parametro,
    msg: params.msg
  }
}
