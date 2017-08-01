const config={
  development: {
    api: 'http://localhost:8080/api',
    img: 'http://localhost:8080/img'
  },
  production: {
    api: 'http://localhost:8080/api',
    img: 'http://localhost:8080/img'
  }
}
export default {
  api:config[process.env['NODE_ENV']]
}