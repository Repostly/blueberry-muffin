import { NextResponse } from 'next/server'
import {userExists, createUser} from '@/db/auth'
import { create } from 'domain';



export async function POST(req: Request) {

    const body = await req.text();

    const decodedQuery = Buffer.from(body, 'base64').toString('utf-8');
    console.log(decodedQuery);

    let userData;
    userData = JSON.parse(decodedQuery);

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
    const user_creation = await createUser(userData.email, userData.password);

    if (!user_creation) {
        return NextResponse.json({
            status: 500,
            message: 'Error creating user'
        });
    }
    
    return NextResponse.json({
        status: 200,
        message: 'User Created Successfully!'
    });
}