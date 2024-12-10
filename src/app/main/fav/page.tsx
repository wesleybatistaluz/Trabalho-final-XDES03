import { retornaBD } from '@/utils/conexao-bd';  // Função para acessar o banco de dados
import { getUserEmail } from "@/utils/auth";  // Função para obter o email do usuário logado
import FilmeFav, { FilmesFrt } from '@/components/filmes';  // Componente que exibe o filme favorito
import Link from "next/link";
import '@/app/main/fav/fav.css';  // Importação do arquivo CSS

const arquivo = "favoritos-db.json";  // Arquivo que armazena os filmes favoritos

// Função principal da página de favoritos
export default async function PaginaFavoritos() {
    // Obtém o email do usuário logado
    const userEmail = await getUserEmail();
    
    // Retorna todos os filmes do banco de dados (arquivo JSON)
    const filmes = await retornaBD<FilmesFrt>(arquivo);

    // Filtra os filmes para exibir apenas os do usuário logado
    const filmesFavoritos = filmes.filter(filme => filme.email === userEmail);

    return (
        <div className="pagina-favoritos">
            
            <Link href="/main/create" className="add-filme">
                Adicionar Filmes aos Favoritos
            </Link>

            <h1>Meus Filmes Favoritos</h1>
            {filmesFavoritos.length === 0 ? (
                // Se não houver filmes favoritos, exibe uma mensagem
                <p>Você ainda não tem filmes favoritos.</p>
            ) : (
                // Para cada filme favorito, renderiza o componente FilmeFav
                filmesFavoritos.map(filme => (
                    <FilmeFav key={filme.id} {...filme} />
                ))
            )}
        </div>
    );
}
