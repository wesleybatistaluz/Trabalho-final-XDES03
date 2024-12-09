import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { retornaBD, armazenaBD } from '@/utils/conexao-bd';
import { getUserEmail } from "@/utils/auth";

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

    const deleteFilme = async (formData: FormData) => {
        'use server';
        
        const filmesDB = await retornaBD(arquivo);
        
        // Filter out the film, ensuring it belongs to the logged-in user
        const updatedFilmesDB = filmesDB.filter((f) => 
            f.id !== props.id || f.email !== userEmail
        );
        
        await armazenaBD(arquivo, updatedFilmesDB);
        
        redirect('/main/listar');
    }

    return (
        <div className="filmes-card">
            <h2>{props.nome}</h2>
            <Image
                src={props.img}
                alt={props.nome}
                width={200}
                height={200}
            />
            <p>{props.descricao}</p>
            <section className="edit-button">
                <Link href={`/main/edit/${props.id}`} className="edit-comment">
                    Editar
                </Link>
                <form action={deleteFilme}>
                    <button type="submit">Remover</button>
                </form>
            </section>
        </div>
    )
}