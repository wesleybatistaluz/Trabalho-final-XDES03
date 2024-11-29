import '@/app/page.css'
import Link from 'next/link';


export default function Home() {
    return (

        <div>
            <main>
                <h1>Entre e avalie seus filmes preferidos</h1>
                <Link href={"user/create"} className='Link-cadastro'>Cadastre-se</Link>
            </main>
        </div>
    );

}
