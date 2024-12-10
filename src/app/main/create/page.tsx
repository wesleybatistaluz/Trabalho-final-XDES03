'use client';
import styles from './createFavorite.module.css';
import { useState, FormEvent } from "react";
import { addFavorito } from "@/utils/favorites-actions";
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  const buscarFilmes = async () => {
    if (!busca.trim()) return;

    setErro(null);

    try {
      const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
      if (!apiKey) throw new Error('Chave de API não configurada');

      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(busca)}&api_key=${apiKey}`
      );

      if (!res.ok) {
        throw new Error(`Erro na busca: ${res.status}`);
      }

      const data = await res.json();
      setResultados(data.results || []);
    } catch (error) {
      setErro(error instanceof Error ? error.message : 'Erro desconhecido ao buscar filmes');
      setResultados([]);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    buscarFilmes();
  };

  const handleAddFavorite = async (filme: Filme) => {
    try {
      await addFavorito(filme, comentario[filme.id] || "");
      router.push('/main/fav');
    } catch {
      setErro('Erro ao adicionar o filme aos favoritos.');
    }
  };

  return (
    <div className={styles.createFavoriteContainer}>
      <h2>Adicionar Filme aos Favoritos</h2>
      <Link id="link-listar" href="/main/fav">Ir para Favoritos</Link>

      <form onSubmit={handleSubmit} className={styles.buscarFilmes}>
        <input
          type="text"
          placeholder="Digite o nome do filme"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      {erro && <div className={styles.errorMessage}><p>{erro}</p></div>}

      <section className={styles.resultadosBusca}>
        {resultados.length === 0 && busca.trim() && !erro && <p>Nenhum filme encontrado.</p>}
        {resultados.map((filme) => (
          <div key={filme.id} className={styles.filmeCard}>
            {filme.poster_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/w500/${filme.poster_path}`}
                alt={filme.title}
                width={150}
                height={200}
              />
            ) : <div className={styles.placeholderImage}>Sem Imagem</div>}
            <h3>{filme.title}</h3>
            <input
              type="text"
              placeholder="Adicione um comentário"
              value={comentario[filme.id] || ""}
              onChange={(e) =>
                setComentario({ ...comentario, [filme.id]: e.target.value })
              }
            />
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddFavorite(filme);
              }}
            >
              <button type="submit">Adicionar aos Favoritos</button>
            </form>
          </div>
        ))}
      </section>
    </div>
  );
}
