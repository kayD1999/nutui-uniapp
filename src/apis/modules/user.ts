import request from '@/utils/request';

export function getUserCenter(header?: any) {
  return request.get({ url: '/app/appuser/info', header });
}

// 个人编辑
export function userEdit(data: any) {
  return request.put({ url: '/app/appuser/edit', data });
}

// 绑定手机
export function userBindMobile(data: any, header?: any) {
  return request.post({ url: '/app/user/bindMobile', data, header }, { isAuth: true });
}

export function userChangePwd(data: any) {
  return request.put({ url: '/app/appuser/edit', data });
}

// 绑定小程序
export function mnpAuthBind(data: any) {
  return request.post({ url: '/app/user/bindMnp', data });
}

// 绑定公众号
export function oaAuthBind(data: any) {
  return request.post({ url: '/app/user/bindOa', data });
}

// 更新微信小程序头像昵称
export function updateUser(data: Record<string, any>, header: any) {
  return request.post({ url: '/app/user/updateUser', data, header });
}
