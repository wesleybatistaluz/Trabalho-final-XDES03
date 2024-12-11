import Image from 'next/image';
import Link from 'next/link';
import logoapi from "public/logoapi.svg";

import "@/styles/Header.css";

export default function Header() {
    return (
        <header>
            <section className='section'>
                <Image className='img-logo' src={logoapi} alt='Logo da API' />
            </section>

            <nav className='nav'>
                <ul className='ul-left-side'>
                    <li><Link className="link" href="/user/create">Criar Conta</Link></li>
                    <li><Link className="link" href="/user/login">Login</Link></li>
                    <li><Link className="link" href="/main/listar">Filmes Tendências</Link></li>
                </ul>
            </nav>
        </header>
    );
}
