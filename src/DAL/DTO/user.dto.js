export const userDto =(userInfo)=>{
    return {
        email:userInfo.email,
        first_name:userInfo.first_name,
        password:userInfo.password,
        isAdmin:userInfo.isAdmin,
        cartId:userInfo.cartId
    }

}
