
import Header from '@/components/home/header/header';
import { Footer } from '@/components/home/footer/footer';
import '../../styles/home-page.css';

import Image from 'next/image';
import Link from 'next/link';
import GalleryCarousel from './gallery-carousel';

const galeriaImgs = [
  '/assets/galeria/1.jpeg',
  '/assets/galeria/2.jpeg',
  '/assets/galeria/3.jpeg',
  '/assets/galeria/4.jpeg',
  '/assets/galeria/5.jpeg',
  '/assets/galeria/6.jpeg',
  '/assets/galeria/7.jpeg',
  '/assets/galeria/8.jpeg',
];

export function HomePage() {
  return (
    <div className="homepage-container">
      <Header />
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay">
          <div className="hero-logo">
            <Image src="/logo.png" alt="Logo Fundación Batta" width={60} height={60} />
          </div>
          <div className="hero-content">
            <h1 className="hero-title">Transformando vidas a través del deporte.</h1>
            <div className="hero-buttons">
              <Link href="/nosotros" className="hero-btn">Conócenos</Link>
              <Link href="/rifa-solidaria" className="hero-btn hero-btn-primary">Participa en la rifa</Link>
            </div>
          </div>
        </div>
    {/* Collage de imágenes eliminado */}
      </section>

      {/* Bloque de Presentación */}
      <section className="presentation-block">
        <div className="presentation-text">
          <h2>30 años de trayectoria</h2>
          <p>
            Nuestra fundación ha formado generaciones de niños y jóvenes en Duitama, Boyacá, promoviendo el deporte como herramienta de transformación social.
          </p>
        </div>
        <div className="presentation-img">
          <Image src="/assets/galeria/5.jpeg" alt="Profesor entrenando" width={320} height={220} className="presentation-photo" />
        </div>
      </section>

      {/* Galería destacada con carrusel */}
      <section className="gallery-block">
        <h2>Galería</h2>
        <GalleryCarousel />
      </section>

      {/* Bloque de impacto */}
      <section className="impact-block">
        <div className="impact-item">
          <span role="img" aria-label="niños">🏆</span>
          <p>+500 niños impactados</p>
        </div>
        <div className="impact-item">
          <span role="img" aria-label="trayectoria">🕐</span>
          <p>30 años de trayectoria</p>
        </div>
        <div className="impact-item">
          <span role="img" aria-label="alianzas">🤝</span>
          <p>Alianzas con la comunidad</p>
        </div>
      </section>

      {/* CTA final */}
      <section className="cta-final">
        <h2>Súmate a nuestra misión y transforma vidas con nosotros.</h2>
        <div className="cta-buttons">
          <Link href="/rifa-solidaria" className="cta-btn cta-btn-primary">Participa en la rifa</Link>
          <Link href="/contacto" className="cta-btn">Contáctanos</Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
