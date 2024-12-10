import '@/app/page.css';
import Link from 'next/link';

export default function Home() {
  return (
    <section className="home-page">
      <div className="home-content">
        <h1 className="home-title">Entre e avalie seus filmes preferidos</h1>
        <p className="home-subtitle">
          Crie sua conta e comece a gerenciar sua lista personalizada de filmes favoritos.
        </p>
        <Link href="/user/create" className="home-link">
          Cadastre-se
        </Link>
      </div>
    </section>
  );
}
