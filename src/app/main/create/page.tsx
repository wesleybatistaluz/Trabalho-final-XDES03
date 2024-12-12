'use client';
import styles from './createFavorite.module.css';
import { useState, FormEvent } from "react";
import { addFavorito } from "@/utils/favorites-actions";
import Link from 'next/link';
import Image from 'next/image';

interface Filme {
  id: number;
  title: string;
  poster_path: string;
}

export default function CreateFavorite() {
  const [busca, setBusca] = useState<string>("");
  const [resultados, setResultados] = useState<Filme[]>([]);
  const [erro, setErro] = useState<string | null>(null);
  const [comentario, setComentario] = useState<{ [key: number]: string }>({});

  const buscarFilmes = async () => {
    if (!busca.trim()) return;

    // Limpa erros anteriores
    setErro(null);

    try {
      // Use variável de ambiente para a chave da API
      const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
      
      if (!apiKey) {
        throw new Error('Chave de API não configurada');
      }

      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(busca)}&api_key=${apiKey}`
      );
      
      if (!res.ok) {
        // Tenta obter detalhes do erro do corpo da resposta
        const errorBody = await res.text();
        throw new Error(`Erro na busca: ${res.status} - ${errorBody}`);
      }
      
      const data = await res.json();
      setResultados(data.results || []);
    } catch (error) {
      // Converte o erro para uma string amigável
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Erro desconhecido ao buscar filmes';
      
      // Define o estado de erro
      setErro(errorMessage);
      
      // Limpa resultados anteriores
      setResultados([]);
      
      // Log no console para debug
      console.error("Erro detalhado:", error);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    buscarFilmes();
  };

  return (
    <div className={styles.createFavoriteContainer}>
      <h2>Adicionar Filme aos Favoritos</h2>
      <Link id="link-listar" href="/main/listar">Listar</Link>

      <form onSubmit={handleSubmit} className={styles.buscarFilmes}>
        <input
          type="text"
          placeholder="Digite o nome do filme"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      {/* Exibe mensagem de erro */}
      {erro && (
        <div className={styles.errorMessage}>
          <p>{erro}</p>
        </div>
      )}

      <section className={styles.resultadosBusca}>
        {resultados.length === 0 && busca.trim() && !erro && (
          <p>Nenhum filme encontrado.</p>
        )}
        {resultados.map((filme) => (
          <div key={filme.id} className={styles.filmeCard}>
            {filme.poster_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/w500/${filme.poster_path}`}
                alt={filme.title}
                width={150}
                height={200}
                priority={false}
                sizes="(max-width: 768px) 100px, 150px"
              />
            ) : (
              <div className={styles.placeholderImage}>Sem Imagem</div>
            )}
            <h3>{filme.title}</h3>
            <input
              type="text"
              placeholder="Adicione um comentário"
              value={comentario[filme.id] || ""}
              onChange={(e) =>
                setComentario({ ...comentario, [filme.id]: e.target.value })
              }
            />
            <form action={async () => {
              await addFavorito(filme, comentario[filme.id] || "");
            }}>
              <button type="submit">
                Adicionar aos Favoritos
              </button>
            </form>
          </div>
        ))}
      </section>
    </div>
  );
}



