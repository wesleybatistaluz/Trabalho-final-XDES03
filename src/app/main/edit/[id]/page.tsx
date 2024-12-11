import { promises as fs } from 'fs';
import path from 'path';
import { notFound, redirect } from 'next/navigation';
import Image from 'next/image';
import { getUserEmail } from '@/utils/auth';
import styles from '@/styles/edit.module.css';

const dbPath = path.join(process.cwd(), 'src', 'db', 'favoritos-db.json');

interface FilmeProps {
    id: string;
    nome: string;
    img: string;
    descricao: string;
    email: string;
}

export async function generateStaticParams() {
    return []; 
}

export default async function EditFilme({ params }: { params: { id: string } }) {
    const userEmail = await getUserEmail();

    const file = await fs.readFile(dbPath, 'utf8');
    const data: FilmeProps[] = JSON.parse(file);

    const { id } = params;

    const filme = data.find((f) => f.id === id && f.email === userEmail);

    if (!filme) {
        return notFound();
    }

    const updateFilme = async (formData: FormData) => {
        'use server';

        const index = data.findIndex((f) => f.id === id && f.email === userEmail);

        if (index !== -1) {
            data[index] = {
                ...data[index],
                descricao: formData.get('descricao') as string,
            };

            await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
            redirect('/main/fav');
        }
    };

    return (
        <div className={styles.editFilmeContainer}>
            <h2>Editar Descrição do Filme: {filme.nome}</h2>

            <Image
                src={filme.img}
                alt={`Imagem do filme ${filme.nome}`}
                width={200}
                height={300}
                style={{ margin: '0 auto' }}
            />

            <form action={updateFilme} className={styles.editFilmeForm}>
                <section className={styles.filmeInput}>
                    <textarea
                        id="descricao"
                        name="descricao"
                        placeholder="Descrição do Filme"
                        defaultValue={filme.descricao}
                        required
                    />
                </section>

                <button type="submit" className={styles.submitButton}>Atualizar Descrição</button>
            </form>
        </div>
    );
}
