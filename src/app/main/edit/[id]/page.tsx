import { promises as fs } from 'fs';
import path from 'path';
import { notFound, redirect } from 'next/navigation';
import Image from 'next/image';
import { getUserEmail } from '@/utils/auth';
import styles from '@/styles/edit.module.css'; // CSS Module importado corretamente

const dbPath = path.join(process.cwd(), 'src', 'db', 'favoritos-db.json');

interface FilmeProps {
    id: string;
    nome: string;
    img: string;
    descricao: string;
    email: string;
}

// Adiciona os tipos para parâmetros e define compatibilidade com Next.js
export async function generateStaticParams() {
    return []; // Pode ser ajustado conforme o uso real
}

export default async function EditFilme({ params }: { params: { id: string } }) {
    // Aguarda o email do usuário de forma assíncrona
    const userEmail = await getUserEmail();

    // Lê os dados do banco de dados (arquivo JSON)
    const file = await fs.readFile(dbPath, 'utf8');
    const data: FilmeProps[] = JSON.parse(file);

    // Acessa o parâmetro `params.id` de forma assíncrona
    const { id } = await params;  // Usar 'await' para acessar os parâmetros

    // Encontra o filme pelo ID e pelo email do usuário
    const filme = data.find((f) => f.id === id && f.email === userEmail);

    if (!filme) {
        return notFound();
    }

    // Função para atualizar o filme
    const updateFilme = async (formData: FormData) => {
        'use server';

        const index = data.findIndex((f) => f.id === id && f.email === userEmail);

        if (index !== -1) {
            data[index] = {
                ...data[index],
                descricao: formData.get('descricao') as string,
            };

            // Atualiza o arquivo JSON com as novas informações
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
