import { promises as fs } from "fs";
import path from "path";
import { redirect } from "next/navigation";
import Image from "next/image";
import crypto from "crypto";
import logoapi from "public/logoapi.svg";
import "@/styles/Create.css";

const dbPath = path.join(process.cwd(), "src", "db", "users-db.json");

export default async function Create() {
    const addUser = async (formData : FormData) => {
        "use server";
        let data = [];
        try {
            const file = await fs.readFile(dbPath, "utf8");
            data = JSON.parse(file);
        } catch {
            console.error("Arquivo não encontrado. Criando um novo.");
        }

        data.push({
            id: crypto.randomUUID(),
            nome: formData.get("nome"),
            email: formData.get("email"),
            senha: formData.get("senha"),
        });

        await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
        redirect("/user/login");
    };

    return (
        <form action={addUser} className="user-create">
            <Image className="img-logo" src={logoapi} alt="Logo da API" />
            <section className="user-input">
                <input
                    type="text"
                    name="nome"
                    id="nome"
                    placeholder="Nome de usuário"
                    aria-label="Nome de usuário"
                />
            </section>

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
                    name="senha"
                    id="senha"
                    placeholder="Senha"
                    aria-label="Senha"
                />
            </section>

            <section className="user-input">
                <input
                    type="password"
                    name="conf-senha"
                    id="conf-senha"
                    placeholder="Confirme sua senha"
                    aria-label="Confirme sua senha"
                />
            </section>

            <button className="btn-Cadastrar" type="submit">
                Cadastrar
            </button>
        </form>
    );
}
