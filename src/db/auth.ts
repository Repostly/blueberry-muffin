import mongoose from 'mongoose';
import User, { IUser } from '@/models/User';
import {generateHash} from '@/auth/secure/hash';
import connectDB from '@/db/connect';  

await connectDB();



export const userExists = async (email: string): Promise<boolean> => {

    console.log(generateHash(email));
    try {
        const user = await mongoose.connection.collection('users').findOne( { 'email': generateHash(email) } );
        return !!user;
    } catch (error) {
        console.error('Error checking if user exists:', error);
        throw new Error('Error checking if user exists');
    }
};


export const createUser = async (mail: string, pass: string): Promise<boolean> => {
    const name = "hello";
    const email = generateHash(mail);
    const password: string = generateHash(pass);
    const providers = new Map();

    try {
        const doc = { email, password, name, providers } as IUser;
        const user = await User.create(doc);

        if (user) {return true}

    } catch (error) {
        console.error('Error creating user:', error);
        return false;
    }
    return false;
}
