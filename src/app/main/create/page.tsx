
'use client';

import { useState } from "react";
import { addFavorito } from "@/utils/favorites-actions";// create this new file

export default function CreateFavorite() {
    const [busca, setBusca] = useState<string>("");
    const [resultados, setResultados] = useState<any[]>([]);
    const [comentario, setComentario] = useState<{ [key: number]: string }>({});

    // Função para buscar filmes na API
    const buscarFilmes = async () => {
        if (!busca.trim()) return;

        try {
            const res = await fetch(
                `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(busca)}&api_key=5b47d7d46815ae746c9d67b7bc7721dd`
            );
            const data = await res.json();
            setResultados(data.results || []);
        } catch (error) {
            console.error("Erro ao buscar filmes:", error);
        }
    };

    return (
        <div className="create-favorite-container">
            <h2>Adicionar Filme aos Favoritos</h2>

            <section className="buscar-filmes">
                <input
                    type="text"
                    placeholder="Digite o nome do filme"
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                />
                <button onClick={buscarFilmes}>Buscar</button>
            </section>

            <section className="resultados-busca">
                {resultados.map((filme) => (
                    <div key={filme.id} className="filme-card">
                        <img
                            src={`https://image.tmdb.org/t/p/w500/${filme.poster_path}`}
                            alt={filme.title}
                            width={150}
                            height={200}
                        />
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