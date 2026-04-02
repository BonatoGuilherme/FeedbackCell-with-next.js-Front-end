'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="home-container">
      <section className="hero">
        <h1>Bem-vindo ao FeedBackCELL 👋</h1>
        <p>Plataforma de feedback e comentários em tempo real</p>
      </section>

      <section className="features">
        <div className="feature-card">
          <h2>📚 Catálogo</h2>
          <p>Explore produtos e itens disponíveis</p>
          <Link href="/catalog" className="btn btn-primary">
            Ver Catálogo
          </Link>
        </div>

        <div className="feature-card">
          <h2>➕ Novo Item</h2>
          <p>Adicione novos produtos ao sistema</p>
          <Link href="/items/new" className="btn btn-primary">
            Adicionar Item
          </Link>
        </div>
      </section>

      <section className="auth-section">
        <h2>Comece agora</h2>
        <div className="auth-buttons">
          <Link href="/login" className="btn btn-secondary">
            🔐 Login
          </Link>
          <Link href="/register" className="btn btn-secondary">
            📝 Se Registrar
          </Link>
        </div>
      </section>
    </div>
  );
}
