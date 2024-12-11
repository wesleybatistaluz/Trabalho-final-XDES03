import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { retornaBD, armazenaBD } from '@/utils/conexao-bd';
import { getUserEmail } from "@/utils/auth";
import styles from '@/styles/filmes.module.css';

export interface FilmesFrt {
    id: string;
    nome: string;
    img: string;
    descricao: string;
    email: string;
}

const arquivo = "favoritos-db.json";

export default async function FilmeFav(props: FilmesFrt) {
    const userEmail = await getUserEmail();

    // Função para remover filme
    const deleteFilme = async () => {
        'use server';
        
        const filmesDB = await retornaBD<FilmesFrt>(arquivo);

        // Filtro mais explícito
        const updatedFilmesDB = filmesDB.filter((f) => 
            !(f.id === props.id && f.email === userEmail)
        );

        await armazenaBD(arquivo, updatedFilmesDB);
        redirect('/main/fav');  // Redireciona para a página de favoritos
    }

    return (
        <div className="filmes-card">
            <h2>{props.nome}</h2>
            <Image
                src={props.img}
                alt={props.nome}
                width={200}
                height={200}
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <p>{props.descricao}</p>
            <section className="edit-button">
                <Link href={`/main/edit/${props.id}`} className={styles.editButton}>
                    Editar
                </Link>
                <form action={deleteFilme}>
                    <button type="submit" className={styles.submitButton}>Remover</button>
                </form>
            </section>
        </div>
    )
}
