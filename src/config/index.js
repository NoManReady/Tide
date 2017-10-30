const config = {
    development: {
        api: 'http://localhost:8080/api'
    },
    production: {
        api: 'http://open.xiahe.me'
    }
}
export default config[process.env['NODE_ENV']]