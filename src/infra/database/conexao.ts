export interface Conexao {
  query: (query: string, parameters: any) => Promise<any>
  close: () => Promise<any>
}
