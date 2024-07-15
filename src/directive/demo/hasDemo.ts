/**
 * v-hasDemo demo案例
 */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars,func-names
export default function (el, binding, _vnode): void {
  const { value } = binding;
  const all_permission = '*:*:*';
  const permissions = ['1', '2'];

  if (value && value instanceof Array && value.length > 0) {
    const permissionFlag = value;

    const hasPermissions = permissions.some((permission) => {
      return all_permission === permission || permissionFlag.includes(permission);
    });

    if (!hasPermissions) {
      // eslint-disable-next-line no-unused-expressions
      el.parentNode && el.parentNode.removeChild(el);
    }
  } else {
    throw new Error(`请设置操作权限标签值`);
  }
}
