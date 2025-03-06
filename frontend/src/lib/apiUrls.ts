export const AuthURLs = {
    login: '/auth/login',
    logOut: "/auth/logout",
    refreshToken: '/auth/refresh-token',
    signUp: "/users"
}


export const UserURLs = (id?: string)=> ({
    crateUser: "/users",
    getUserById: `/users/${id}`
})


