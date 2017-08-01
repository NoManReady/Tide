import fetch from '@/utils/fetch'
const PREFIX='user'
/**
 * 用户登录
 * @param {user} param0 
 */
export const login = ({ account, password }) => {
  const _data = {
    account,
    password
  }
  return fetch('/login', 'POST', _data)
}

/**
 * 用户登出
 */
export const logout = () => {
  return fetch('/login', 'GET')
}