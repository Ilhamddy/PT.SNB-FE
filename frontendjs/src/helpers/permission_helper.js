export const isAllowedAccess = (userPermissions, permissionList) => {
    if (!userPermissions || userPermissions.length === 0) return false;
  if (permissionList.length === 0) return false;

  const obj = {};

  for (let i = 0; i < userPermissions.length; i++) {
    if (!obj[userPermissions[i]]) {
      const element = userPermissions[i];
      obj[element] = true;
    }
  }

  for (let j = 0; j < permissionList.length; j++) {
    if (obj[permissionList[j]]) {
      return true;
    }
  }

  return false;
}