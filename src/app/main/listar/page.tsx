"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

import "./lista.css";

const API_KEY = "5b47d7d46815ae746c9d67b7bc7721dd";
const BASE_URL = "https://api.themoviedb.org/3";

interface Filme {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  overview: string;
}

interface ApiResponse {
  results: Filme[];
}

const Listar = () => {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const getFilmesPorOrdemDeLancamento = async (pageNumber: number) => {
    setIsLoading(true);
    try {
      const hoje = new Date().toISOString().split("T")[0];
      const response = await axios.get<ApiResponse>(`${BASE_URL}/discover/movie`, {
        params: {
          api_key: API_KEY,
          sort_by: "release_date.desc",
          "release_date.lte": hoje,
          page: pageNumber,
        },
      });

      // Aqui não filtramos mais filmes sem poster_path
      setFilmes(response.data.results);
    } catch (error) {
      console.error("Erro ao buscar os filmes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFilmesPorOrdemDeLancamento(page);
  }, [page]);

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePreviousPage = () => setPage((prev) => (prev > 1 ? prev - 1 : 1));

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="list-container">

      <Link href="/main/create" className="add-filme">
        Adicionar Filmes aos Favoritos
      </Link>

      <Link id="link-listar" href="/main/fav">
      Ir para Favoritos
      </Link> 
      
      <h1>Filmes mais recentes já lançados:</h1>
      <div className="list-filme-container">
        {filmes.map((filme) => (
          <div key={filme.id} className="filme-card">
            <img
              src={
                filme.poster_path
                  ? `https://image.tmdb.org/t/p/w500${filme.poster_path}`
                  : "/images/placeholder.png" // Caminho para o arquivo local
              }
              alt={filme.title}
              width={200}
              height={300}
              onError={(e) => {
                e.currentTarget.src = "/images/placeholder.png"; // Em caso de erro, usa o placeholder local
              }}
            />
            <h3>{filme.title}</h3>
            <p>Data de Lançamento: {new Date(filme.release_date).toLocaleDateString()}</p>
            <p>{filme.overview}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={page === 1}>
          Página Anterior
        </button>
        <span>Página {page}</span>
        <button onClick={handleNextPage}>Próxima Página</button>
      </div>
    </div>
  );
};

export default Listar;

