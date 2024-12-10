'use client'

import '@/styles/Login.css';

import Link from "next/link";
import Image from "next/image";

import logoapi from "public/logoapi.svg";
import { login } from "@/utils/credentials";
import { z } from "zod";
import toast from 'react-hot-toast'; // Biblioteca de notificações
import { LoginCredentials } from '@/utils/credentials';

// Schema de validação com Zod
const LoginSchema = z.object({
    email: z.string().trim().email('Email com formato inválido'),
    password: z.string().trim().min(1, { message: 'A senha não pode estar vazia' }),
});

export default function FormLogin() {

    const loginClientAction = async (formData: FormData) => {

        const loginData: LoginCredentials = {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
        };

        // Valida os dados com o Zod
        const result = LoginSchema.safeParse(loginData);

        if (!result.success) {
            // Exibe mensagens de erro em um único toast
            const errorMsg = result.error.issues.map(issue => issue.message).join('. ');
            toast.error(errorMsg);
            return;
        }

        // Chama o Server Action para autenticar o usuário
        const retorno = await login(loginData);

        if (retorno) {
            toast.error(retorno.error); // Exibe erro do servidor (caso exista)
            return;
        }
    };

    return (
        <form className="login-form" action={loginClientAction}>
            <div>
                <Image className="form-image" src={logoapi} alt="logo api" />
            </div>

            <div>
                <section className="user-input">
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        aria-label="Email"
                    />
                </section>

                <section className="user-input">
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Senha"
                        aria-label="Senha"
                    />
                </section>
            </div>

            <button type="submit">Entrar</button>

            <Link id="link-cadastrar" href="/user/create">
                Não tem cadastro? Clique aqui
            </Link>
        </form>
    );
}
