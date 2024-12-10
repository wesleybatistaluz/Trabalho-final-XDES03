'use server';
import { redirect } from "next/navigation";
import * as bcrypt from 'bcrypt';
import crypto from 'crypto';
import { retornaBD, armazenaBD } from "./conexao-bd";
import { createSessionToken } from "@/utils/auth";

const arquivo = 'users-db.json';

export interface LoginCredentials {
    email: string,
    password: string
}

export async function createUser(data: LoginCredentials) {
    const email = (data.email as string).trim();
    const password = data.password as string;

    const passwordCrypt = await bcrypt.hash(password, 10);

    const novoUser = {
        id: crypto.randomUUID(),
        email,
        password: passwordCrypt
    }

    // Busca a base de usuários
    const usuariosBD = await retornaBD(arquivo);

    // Verifica se usuário já existe
    const usuarioExistente = usuariosBD.find(user => user.email === email);

    if (usuarioExistente) {
        return {error: 'Já existe um cadastro com esse e-mail'};
    }

    // Adiciona novo usuário
    usuariosBD.push(novoUser);
    await armazenaBD(arquivo, usuariosBD);

    redirect('/user/login');
}

export async function login(data: LoginCredentials) {
    const { email, password } = data;

    // Manipula BD
    const usuariosBD = await retornaBD(arquivo);

    const user = usuariosBD.find(user => user.email === email);

    if (!user) {
        return {error: 'Usuário não encontrado'}
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
        // Crie um token de sessão com o email do usuário
        await createSessionToken({
            sub: user.id, 
            email: user.email
        });

        // Adicione uma flag ou variável de sessão para indicar o email do usuário logado
        // Isso dependerá do seu método de gerenciamento de sessão
        // Por exemplo, se estiver usando cookies ou variáveis de ambiente de sessão

        redirect('/main/listar');
    } else {
        return {error: 'Usuário ou senhas incorretos'}
    }
}