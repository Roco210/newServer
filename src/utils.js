import {dirname} from 'path';
import {fileURLToPath} from 'url';
import config from './config/config.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Faker, es} from '@faker-js/faker';

export const __dirname= dirname(fileURLToPath(import.meta.url))

// hash password
export const hashdata=  async (data)=>{
    return bcrypt.hash(data, 10)
}

export const compareHash = async (data, hash)=>{
    return bcrypt.compare(data, hash)
}

// JWT

export const generateToken = (user) => {
    const token = jwt.sign({user}, config.jwtSecret, { expiresIn: '24h' })
    
    return token
}

//faker

const faker = new Faker({locale:[es]});

export const generateProduct = () => {
    const product = {
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        category: faker.commerce.department(),
        stock: faker.number.int(100),
    }
    return product

}

export const generateUser = () => {
    const user = {
        id: faker.database.mongodbObjectId(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        age: faker.number.int(80),
        email: faker.internet.email(),
        password: faker.internet.password(),
        isAdmin: faker.datatype.boolean()
    }
    return user

}
