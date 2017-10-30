import { deCentralization } from '@/utils'

const apis = deCentralization(require.context('./', true, /\.\/\w+\/\w+\.js/))
export default apis