import { deCentralization } from '@/utils'

const models = deCentralization(require.context('./', true, /\.\/\w+\/\w+\.js/))
export default models