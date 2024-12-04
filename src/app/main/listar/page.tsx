import Link from "next/link";
import FilmeFav, { FilmesFrt } from "@/components/filmes";
import { retornaBD } from "@/utils/conexao-bd";  // Atualizado para importar funções diretamente

const arquivo = 'filmes-db.json';

export default async function Listar() {
  const filmesDB = await retornaBD(arquivo);  // Chama a função diretamente
  const filmesMapped = filmesDB.map((filme: FilmesFrt) => {
    return <FilmeFav {...filme} />;
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
