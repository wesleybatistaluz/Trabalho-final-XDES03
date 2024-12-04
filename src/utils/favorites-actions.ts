'use server';

import { redirect } from "next/navigation";
import crypto from "crypto";
import { promises as fs } from "fs";
import path from "path";

const arquivo = "favoritos-db.json";

export async function retornaBD() {
    const dbPath = path.join(process.cwd(), 'src', 'db', arquivo);
    try {
        const dados = await fs.readFile(dbPath, "utf-8");
        return JSON.parse(dados);
    } catch (error) {
        console.error("Erro ao ler o banco de dados:", error);
        return [];
    }
}

export async function armazenaBD(dados: any[]) {
    const dbPath = path.join(process.cwd(), 'src', 'db', arquivo);
    try {
        await fs.writeFile(dbPath, JSON.stringify(dados, null, 2));
    } catch (error) {
        console.error("Erro ao salvar no banco de dados:", error);
    }
}

export async function addFavorito(filme: any, comentario: string) {
    const novoFavorito = {
        id: crypto.randomUUID(),
        nome: filme.title,
        img: filme.poster_path,
        descricao: comentario,
    };

    try {
        const favoritosDB = await retornaBD();
        favoritosDB.push(novoFavorito);
        await armazenaBD(favoritosDB);
        redirect("/main/listar");
    } catch (error) {
        console.error("Erro ao adicionar favorito:", error);
        return { error: "Erro ao adicionar filme aos favoritos" };
    }
}