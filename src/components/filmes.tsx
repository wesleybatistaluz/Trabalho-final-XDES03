import Image from "next/image";
import Link from "next/link";

import path from "path";
import { redirect } from "next/navigation";
import { retornaBD, armazenaBD } from '@/utils/conexao-bd'

import ConexaoBD

    from "@/utils/conexao-bd";

const dbPath = path.join(process.cwd(), 'src', 'db', 'filmes-db.json');

export interface FilmesFrt {
    id: string;
    nome: string;
    img: string;
    descricao: string;
    email: string;
  }

const arquivo = "favoritos-db.json";

export default async function FilmeFav(props: FilmesFrt) {

    const deleteFilme = async (formData: FormData) => {
        'use server';

        //const file = await fs.readFile(`${dbPath}`,'utf8');
        //const data = JSON.parse(file);

        const id = props.id;

        const acharIndex = (f) => {
            return f.id === id
        }

        const filmesDB = await ConexaoBD.retornaBD(arquivo)

        const index = filmesDB.findIndex(acharIndex);

        filmesDB.splice(index, 1);
        await ConexaoBD.armazenaBD(arquivo, filmesDB);

        redirect('/main/listar');

    }
    return (
        <div className="filems-card">
            <h2>{props.nome}</h2>
            <Image 
                src={props.img} // Agora já é o caminho completo
                alt={props.nome}
                width={200}
                height={200}
            />
            <p>{props.descricao}</p>
            <section className="etit-button">
                <Link href={'/main/edit/${props.id}'} className="edit-comment">Editar</Link>
                <form action="{deleteFilme">
                    <button>Remover</button>
                </form>

            </section>
        </div>
    )

}