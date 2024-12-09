'use server';
import { redirect } from "next/navigation";
// Se crypto não for usado, remova a importação
import { promises as fs } from "fs";
import path from "path";
import { getUserEmail } from "./auth";

// Defina interfaces para os tipos
interface Filme {
  id: number | string;
  title: string;
  poster_path: string;
}

interface Favorito {
  id: string;
  nome: string;
  img: string;
  descricao: string;
  email: string;
}

const arquivo = "favoritos-db.json";

export async function retornaBD(): Promise<Favorito[]> {
  const dbPath = path.join(process.cwd(), 'src', 'db', arquivo);
  try {
    const dados = await fs.readFile(dbPath, "utf-8");
    return JSON.parse(dados);
  } catch (error) {
    console.error("Erro ao ler o banco de dados:", error);
    return [];
  }
}

export async function armazenaBD(dados: Favorito[]) {
  const dbPath = path.join(process.cwd(), 'src', 'db', arquivo);
  try {
    await fs.writeFile(dbPath, JSON.stringify(dados, null, 2));
  } catch (error) {
    console.error("Erro ao salvar no banco de dados:", error);
  }
}

export async function addFavorito(filme: Filme, comentario: string) {
  // Obtenha o email do usuário logado
  const userEmail = await getUserEmail();

  if (!userEmail) {
    return { error: "Usuário não autenticado" };
  }

  const novoFavorito: Favorito = {
    id: filme.id.toString(),
    nome: filme.title,
    img: `https://image.tmdb.org/t/p/w500/${filme.poster_path}`,
    descricao: comentario,
    email: userEmail,
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