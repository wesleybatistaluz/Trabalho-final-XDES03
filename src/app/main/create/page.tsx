import Link from "next/link";

//Para ler arquivos com nextjs
import {promises as fs} from 'fs';
import path from "path";
import { redirect } from "next/navigation";

import crypto from 'crypto';

const dbPath = 
    path.join(process.cwd(),'src','db','users-db.json');

// Marcar o componente como async para "server component"
export default async function CreateUser() {
    // Ler o arquivo JSON e parsear os dados
    const file = await fs.readFile(`${dbPath}`,'utf8');
    const data = JSON.parse(file);

    // Server Action para adicionar um novo usuário
    const addUser = async (formData: FormData) => {
        "use server";
        data.push(
            {
                id: crypto.randomUUID(),
                nome : formData.get("nome"),
                email : formData.get("email"),
                senha : formData.get("senha")
            }
        )
        await fs.writeFile(dbPath, JSON.stringify(data, null,2));
        redirect('/main/listar');

   
       
    };

    return (
        <div className="create-user-container">
            <h2>Cadastrar Novo Usuário</h2>
            <form action={addUser} method="POST" className="create-user-form">
                <section className="user-input">
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        placeholder="Nome do Usuário"
                        aria-label="Nome do Usuário"
                    />
                </section>

                <section className="user-input">
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email do Usuário"
                        aria-label="Email do Usuário"
                    />
                </section>

                <section className="user-input">
                    <input
                        type="password"
                        id="senha"
                        name="senha"
                        placeholder="Senha"
                        aria-label="Senha"
                    />
                </section>

                <button type="submit">Cadastrar Usuário</button>
            </form>
        </div>
    );
}
