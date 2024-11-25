
import Image from 'next/image'
import Link from 'next/link';
import logoapi from "public/logoapi.svg"

import "@/styles/Header.css";

export default function Header(){
    return(
        <header>
            <section className='section'>
            <Image className='img-logo' src={logoapi} alt='Logo do pokémon'/>
            </section>
            
            <nav className='nav'>
            <ul className='ul-left-side'>
                <Link className="link" href="/create">Criar</Link>
                <Link className="link" href="/login">Login</Link>
            </ul>
            </nav>
        </header>
    )
}