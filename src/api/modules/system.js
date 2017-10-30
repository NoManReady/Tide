import fetch from '@/utils/fetch'
/**
 * 系统接口
 */
const PREFIX = '/System'

/**
 * 商圈列表
 * @param {城市id} cid 
 */
export const sysListArea = (cid) => {
  return fetch(`${PREFIX}/listArea`, { cid })
}

/**
 * 城市列表
 */
export const sysCity = () => {
  return fetch(`${PREFIX}/city`)
}

/**
 * 系统版本
 */
export const sysVersion = () => {
  return fetch(`${PREFIX}/version`)
}

/**
 * 首页数据
 * @param {城市id} cid 
 */
export const sysHome = (cid) => {
  return fetch(`${PREFIX}/home`, { cid })
}

/**
 * 列表数据(标签决定)
 * @param {城市id} cid 
 */
export const sysListByTag = ({ cid, tags, page }) => {
  return fetch(`${PREFIX}/listByTag`, { cid, tags, page })
}