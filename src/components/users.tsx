import Image from "next/image";
import Link from "next/link";

//Para ler arquivos com nextjs
import {promises as fs} from 'fs';
import path from "path";
import { redirect } from "next/navigation";

const dbPath = path.join(process.cwd(),'src', 'db','users-db.json');

export interface usersfavprops{
    id: string,
    nome: string, 
    email: string,
    senha: string
}

export default async function usersfav(props: usersfavprops){

    const deletePokemon = async(formData: FormData) =>{
        'use server';

        const file = await fs.readFile(`${dbPath}`,'utf8');
        const data = JSON.parse(file);
    
        const id = props.id;

        const acharIndex = (n) => {
            return n.id === id
    }
    const index = data.findIndex(acharIndex);
        
        data.splice(index,1);
        await fs.writeFile(dbPath,JSON.stringify(data,null,2));

        redirect('/main/listar')


}

return(
    <div className="pokemon-container-card">
        <h2>{props.nome}</h2>
        <p>{props.senha}</p>
        <p>{props.email}</p>
        <section className="users-edit">
            <Link href={`/main/edit/${props.id}`} className="edit-pokemon">Editar</Link>
            <form action={deletePokemon}>
                <button>Remover</button>
            </form>
        </section>
        
    </div>
);
}