export const required = (val) => {
  if (typeof (val) === 'object') {
    return !!val.length
  }
  if (!val.toString().replace(/^\s|\s&/g, '')) {
    return false
  }
  return true
}

export const isNumber = (val) => {
  return /^\d+(\.\d+)?$/.test(val)
}