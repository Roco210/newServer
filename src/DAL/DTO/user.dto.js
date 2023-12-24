export const userDto =(userInfo)=>{
    console.log(userInfo)
    return {
        email:userInfo.email,
        first_name:userInfo.first_name,
        password:userInfo.password,
        isAdmin:userInfo.isAdmin,
        cartId:userInfo.cartId
    }

}

export const userDtoPass =(userInfo)=>{
    console.log(userInfo)
    return {
        email:userInfo.email,
        
    }

}