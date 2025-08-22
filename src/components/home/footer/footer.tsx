
import Image from 'next/image';
import './footer.css';

export function Footer() {
  return (
    <footer className="footer-custom">
      <div className="footer-content footer-grid">
        {/* Sección 1: Logo y eslogan */}
        <div className="footer-section footer-logo-eslogan">
          <Image src="/logo.svg" alt="Logo Fundación Batta" width={100} height={100} />
          <div className="footer-eslogan">Transformando vidas a través del deporte.</div>
        </div>
        {/* Sección 2: Navegación rápida */}
        <div className="footer-section footer-nav">
          <div className="footer-nav-title">Secciones</div>
          <ul className="footer-nav-list">
            <li><a href="/" className="footer-link">Inicio</a></li>
            <li><a href="/nosotros" className="footer-link">Nosotros</a></li>
            <li><a href="/rifa-solidaria" className="footer-link">Rifa Solidaria</a></li>
          </ul>
        </div>
        {/* Sección 3: Información de ubicación */}
        <div className="footer-section footer-contact">
          <div className="footer-contact-title">Contacto</div>
          <div className="footer-contact-row">📍 <b>Dirección:</b> Duitama, Boyacá – Colombia</div>
          <div className="footer-contact-row">📲 <b>WhatsApp:</b> +57 321 304 5139</div>
          <div className="footer-contact-row">✉️ <b>Correo:</b> fundacionbatta@gmail.com</div>
        </div>
      </div>
      <hr className="footer-divider" />
      <div className="footer-copyright">© 2025 Fundación Batta – Todos los derechos reservados.</div>
    </footer>
  );
}
