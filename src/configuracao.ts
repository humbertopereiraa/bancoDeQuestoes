const Configuracao = {
  app: {
    title: process.env.APP_NAME,
    version: process.env.APP_VERSION
  },
  http: {
    port: parseInt(process.env.HTTP_PORT ?? '7000')
  },
  bd: {
    user: process.env.BD_USER,
    host: process.env.BD_HOST,
    password: process.env.BD_PASSWORD,
    database: process.env.BD_DATABASE,
    port: process.env.BD_PORT,
    pool_min: process.env.BD_POOL_MIN,
    pool_max: process.env.BD_POOL_MAX
  }
}
export { Configuracao }
