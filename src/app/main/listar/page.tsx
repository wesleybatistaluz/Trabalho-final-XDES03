import Link from "next/link"; 
import FilmeFav, { FilmesFrt } from "@/components/filmes"; 
import { retornaBD } from "@/utils/conexao-bd";  
import { getUserEmail } from "@/utils/auth";
import '@/styles/listar.css'

const arquivo = 'favoritos-db.json';

export default async function Listar() {
  // Recupere o email do usuário logado
  const userEmail = await getUserEmail();

  const filmesDB = await retornaBD(arquivo);
  
  // Filtre os filmes pelo email do usuário logado
  const filmesMapped = filmesDB
    .filter((filme: FilmesFrt) => filme.email === userEmail)
    .map((filme: FilmesFrt) => {
      // Adicione a key usando o id único do filme
      return <FilmeFav key={filme.id} {...filme} />;
    });

  return (
    <div className="list-container">
      <Link href={'/main/create'} className="add-filme">Adicionar</Link>
      <div className="list-filme-container">
        {filmesMapped}
      </div>
    </div>
  );
}