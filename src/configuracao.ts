const Configuracao = {
  app: {
    title: process.env.APP_NAME ?? 'Banco de Questões',
    version: process.env.APP_VERSION ?? '1.0.0'
  },
  http: {
    port: parseInt(process.env.HTTP_PORT ?? '7000')
  }
}

export { Configuracao }
