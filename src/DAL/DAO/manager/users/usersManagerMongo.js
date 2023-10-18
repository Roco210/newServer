import { userModel } from "../../models/user.model.js";

class UserMongo {
async createUser(obj) {
try { 
    const newUser = await userModel.create(obj);
    return newUser;
}catch(error){return error}
}


async findUser(email) {
    try {
        const userFind = await userModel.findOne({email})
        return userFind}
    catch(error){return error}

}

async addCartToUser(cartId,email){
    try{
        const user = await this.findUser(email)
        user.cartId = cartId
        console.log(user)
        await userModel.findOneAndUpdate({email},user)
    }
    catch(error){return error}
}

}
export const userMongo= new UserMongo();