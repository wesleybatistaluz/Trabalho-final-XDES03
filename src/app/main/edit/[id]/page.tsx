import '@/styles/listar.css'; 
import { promises as fs } from 'fs'; 
import path from "path"; 
import { notFound, redirect } from "next/navigation"; 
import Image from "next/image"; 
import { getUserEmail } from "@/utils/auth";

const dbPath = path.join(process.cwd(), 'src', 'db', 'favoritos-db.json');

interface EditFilmeProps {
    params: {
        id: string
    }
}

interface FilmeProps {
    id: string;
    nome: string;
    img: string;
    descricao: string;
    email: string;
}

export default async function EditFilme(props: EditFilmeProps) {
    const userEmail = await getUserEmail();

    const file = await fs.readFile(dbPath, 'utf8');
    const data: FilmeProps[] = JSON.parse(file);

    const id = props.params.id;

    const filme = data.find((f: FilmeProps) => f.id === id && f.email === userEmail);

    const updateFilme = async (formData: FormData) => {
        "use server";

        const index = data.findIndex(f => f.id === id && f.email === userEmail);

        if (index !== -1) {
            data[index] = {
                ...data[index],
                descricao: formData.get("descricao") as string
            };

            await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
            redirect('/main/listar');
        }
    }

    if (!filme) {
        return notFound();
    }

    return (
        <div className='edit-filme-container'>
            <h2>Editar Descrição do Filme {filme.nome}</h2>

            <Image
                src={filme.img}
                alt={filme.nome}
                width={200}
                height={300}
                style={{margin: "0 auto"}}
            />

            <form action={updateFilme} className="edit-filme-form">
                <section className='filme-input'>
                    <textarea
                        id="descricao"
                        name="descricao"
                        placeholder="Descrição do Filme"
                        defaultValue={filme.descricao}
                    />
                </section>

                <button type="submit">Atualizar Descrição</button>
            </form>
        </div>
    );
}