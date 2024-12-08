import * as jose from 'jose';
import { cookies } from 'next/headers';

async function openSessionToken(token: string){
    const secret = new TextEncoder().encode(process.env.TOKEN);
    const {payload} = await jose.jwtVerify(token, secret);
    return payload;
}

export async function createSessionToken(payload = {}){
    const secret = new TextEncoder().encode(process.env.TOKEN);
    
    const session = await new jose.SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('1h')
        .sign(secret);
    
    const {exp} = await openSessionToken(session);
    
    const cookieStore = await cookies();
    
    cookieStore.set('session', session, {
        expires: (exp as number) * 1000,
        path: '/',
        httpOnly: true
    });
}

export async function isSessionValid(){
    const sessionCookie = (await cookies()).get('session');
    
    if(sessionCookie) {
        const {value} = sessionCookie;
        const payload = await openSessionToken(value);
        const currentDate = new Date().getTime();
        
        return ((payload.exp as number) * 1000) > currentDate;
    }
    
    return false;
}

// Nova função para recuperar o email do usuário logado
export async function getUserEmail() {
    const sessionCookie = (await cookies()).get('session');
    
    if(sessionCookie) {
        const {value} = sessionCookie;
        const payload = await openSessionToken(value);
        return payload.email as string | undefined;
    }
    
    return undefined;
}