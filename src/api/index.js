import { deCentralization } from '@/utils'

const apis = deCentralization(require.context('./', true, /\.\/\w+\/\w+\.js/))

console.log(apis)
export default apis