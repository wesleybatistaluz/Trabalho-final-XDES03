'use server';
import { redirect } from "next/navigation";
import { promises as fs } from "fs";
import path from "path";
import { getUserEmail } from "./auth";

// Interfaces mais detalhadas
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
  createdAt?: string; // Opcional: adicionar timestamp
}

const arquivo = "favoritos-db.json";

export async function retornaBD(): Promise<Favorito[]> {
  const dbPath = path.join(process.cwd(), 'src', 'db', arquivo);
  try {
    const dados = await fs.readFile(dbPath, "utf-8");
    const parsedDados = JSON.parse(dados);
    // Validação adicional
    return Array.isArray(parsedDados) ? parsedDados : [];
  } catch (error) {
    console.error("Erro ao ler o banco de dados:", error);
    return [];
  }
}

export async function armazenaBD(dados: Favorito[]) {
  const dbPath = path.join(process.cwd(), 'src', 'db', arquivo);
  try {
    // Limitação de tamanho do banco de dados (opcional)
    const limitedDados = dados.slice(-100); // Mantém apenas os 100 últimos
    await fs.writeFile(dbPath, JSON.stringify(limitedDados, null, 2));
  } catch (error) {
    console.error("Erro ao salvar no banco de dados:", error);
  }
}

export async function addFavorito(filme: Filme, comentario: string) {
  const userEmail = await getUserEmail();

  if (!userEmail) {
    throw new Error("Usuário não autenticado");
  }

  const novoFavorito: Favorito = {
    id: filme.id.toString(),
    nome: filme.title,
    img: `https://image.tmdb.org/t/p/w500/${filme.poster_path}`,
    descricao: comentario,
    email: userEmail,
    createdAt: new Date().toISOString(), // Adiciona timestamp
  };

  try {
    const favoritosDB = await retornaBD();
    
    // Evita duplicatas
    const jaExiste = favoritosDB.some(
      f => f.id === novoFavorito.id && f.email === userEmail
    );

    if (jaExiste) {
      throw new Error("Filme já adicionado aos favoritos");
    }

    favoritosDB.push(novoFavorito);
    await armazenaBD(favoritosDB);
    redirect("/main/listar");
  } catch (error) {
    console.error("Erro ao adicionar favorito:", error);
    throw error; // Propaga o erro para tratamento no componente
  }
}