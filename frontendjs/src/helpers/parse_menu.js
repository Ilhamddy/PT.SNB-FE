export const getUserPermissions = () => {
    const authUser = JSON.parse(sessionStorage.getItem('authUser'));

    if (!authUser.accessToken) return;

    const decodedToken = JSON.parse(atob(authUser.accessToken.split('.')[1]));

    return decodedToken.sesion[0]?.permission || [];
}