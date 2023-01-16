export interface DataBase {
  query: (query: string, parameters: any) => Promise<any>
}
