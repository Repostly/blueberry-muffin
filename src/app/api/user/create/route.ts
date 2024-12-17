import { NextResponse } from 'next/server'
import User from '@/models/User'
import {userExists, createUser} from '@/db/auth'



export async function POST(req: Request) {

    const body = await req.text();

    const decodedQuery = Buffer.from(body, 'base64').toString('utf-8');
    console.log(decodedQuery);

    let userData;
    try {
        userData = JSON.parse(decodedQuery);
    } catch (error) {
        userData = eval('(' + decodedQuery + ')');
    }

    if (!userData.email) {
        return NextResponse.json({
            status: 400,
            message: 'Email is required'
        });
    }

    const exists = await userExists(userData.email);
    
    if (exists) {
        return NextResponse.json({
            status: 400,
            message: 'This email is already in use'
        });
    }
    const create_user = await createUser(userData.email, userData.password);

    
    return NextResponse.json({
        status: 200,
        message: 'User Created Successfully!'
    });
}