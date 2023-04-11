export interface Token {
  gerar: (payload: any, chavePrivada: string, options?: any) => Promise<string>
  verificar: (token: string, chavePrivada: string, options?: any) => Promise<boolean>
}
