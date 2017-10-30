import fetch from '@/utils/fetch'
/**
 * 管理接口
 */
const PREFIX = '/Manage'

/**
 * 上游列表
 * @param {商铺id，关键词，当前页数} param0 
 */
export const manageGetFactoryList = ({ sid, keyword, page }) => {
  return fetch(`${PREFIX}/getFactoryList`, { sid, keyword, page })
}

/**
 * 上游详情
 * @param {商铺id，上游id} param0 
 */
export const manageGetFactoryDetail = ({ sid, factory_id }) => {
  return fetch(`${PREFIX}/getFactoryDetail`, { sid, factory_id })
}


/**
 * 添加员工
 * @param {商铺id，角色id，备注，员工手机} param0 
 */
export const manageAddEmployee = ({ sid, roleid, remark, umobile }) => {
  return fetch(`${PREFIX}/addEmployee`, { sid, roleid, remark, umobile })
}

/**
 * 更新员工
 * @param {商铺id，员工id，角色id，备注，状态（0禁用，1正常）} param0 
 */
export const manageUpdateEmployee = ({ sid, employee_id, roleid, remark, status }) => {
  return fetch(`${PREFIX}/updateEmployee`, { sid, employee_id, roleid, remark, status })
}

/**
 * 员工列表
 * @param {商铺id} sid 
 */
export const manageGetEmployeeList = (sid) => {
  return fetch(`${PREFIX}/getEmployeeList`, { sid })
}

/**
 * 员工详情
 * @param {商铺id,员工id} sid 
 */
export const manageGetEmployeeDetail = ({ sid, employee_id }) => {
  return fetch(`${PREFIX}/getEmployeeDetail`, { sid, employee_id })
}
/**
 * 员工过滤条件列表
 */
export const manageFilterEmployee = () => {
  return fetch(`${PREFIX}/filterEmployee`)
}

/**
 * 添加上游
 * @param {商铺id，上游名称，城市id，联系人，联系电话，联系地址} param0 
 */
export const manageAddFactory = ({ sid, name, cid, contact, mobile, addr }) => {
  return fetch(`${PREFIX}/addFactory`, { sid, name, cid, contact, mobile, addr })
}

/**
 * 更新上游
 * @param {商铺id，上游id，上游名称，城市id，联系人，联系电话，联系地址} param0 
 */
export const manageUpdateFactory = ({ sid, factory_id, name, cid, contact, mobile, addr }) => {
  return fetch(`${PREFIX}/updateFactory`, { sid, factory_id, name, cid, contact, mobile, addr })
}

/**
 * 客户列表
 * @param {商铺id，关键词，页码} param0 
 */
export const manageGetClientList = ({ sid, keyword, page }) => {
  return fetch(`${PREFIX}/getClientList`, { sid, keyword, page })
}

/**
 * 客户详情
 * @param {商铺id，客户id} param0 
 */
export const manageGetClientDetail = ({ sid, client_id }) => {
  return fetch(`${PREFIX}/getClientDetail`, { sid, client_id })
}


/**
 * 搬运列表
 * @param {商铺id} sid 
 */
export const manageGetDeliverList = (sid) => {
  return fetch(`${PREFIX}/getDeliverList`, { sid })
}

/**
 * 搬运详情
 * @param {商铺id,搬运id} params0 
 */
export const manageGetDeliverDetail = ({ sid, deliver_id }) => {
  return fetch(`${PREFIX}/getDeliverDetail`, { sid, deliver_id })
}

/**
 * 添加搬运
 * @param {店铺id，手机号，标记名称，备注} params0 
 */
export const manageAddDeliver = ({ sid, umobile, dname, remark }) => {
  return fetch(`${PREFIX}/addDeliver`, { sid, umobile, dname, remark })
}

/**
 * 更新搬运
 * @param {店铺id，状态，标记名称，备注，搬运id} params0 
 */
export const manageUpdateDeliver = ({ sid, status, dname, remark, deliver_id }) => {
  return fetch(`${PREFIX}/updateDeliver`, { sid, status, dname, remark, deliver_id })
}

/**
 * 发货商户列表
 * @param {当前页数} param0 
 */
export const manageGetShipperList = ({ page, sid, by_deliver }) => {
  return fetch(`${PREFIX}/getShipperList`, { page, sid, by_deliver })
}