
/**
 * 去中心化
 * @param {上下文} requireContext 
 * @param {排除文件} exinclude 
 */
export const deCentralization = (requireContext, exinclude = /index/) => {
  const sourceMap = {}
  const paths = requireContext.keys().filter(p => {
    return !exinclude.test(p)
  })
  for (let p of paths) {
    const ss = requireContext(p)
    for (let s in ss) {
      sourceMap[s] = ss[s]
    }
  }
  return sourceMap
}