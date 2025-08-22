
import Header from '@/components/home/header/header';
import { Footer } from '@/components/home/footer/footer';
import { FaFutbol, FaBook, FaUsers, FaHeart, FaStar } from 'react-icons/fa';
import '../../styles/nosotros.css';

export default function Nosotros() {
  return (
    <div>
      <Header />
      {/* Hero Section */}
      <section
        className="nosotros-hero"
        style={{
          backgroundImage: "url('/assets/galeria/1.jpeg')",
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <div className="nosotros-hero-content">
          Más de 30 años transformando vidas a través del deporte y la educación
        </div>
      </section>

      {/* Historia */}
      <section className="nosotros-section">
        <div className="nosotros-section-title">Nuestra Historia</div>
        <div className="nosotros-historia">
          <img src="/assets/galeria/1.jpeg" alt="Niños entrenando" className="nosotros-historia-img" />
          <div className="nosotros-historia-text">
            Desde hace más de tres décadas, nuestra fundación ha trabajado para ofrecer a los niños y niñas de bajos recursos un espacio seguro donde el deporte y la educación se convierten en herramientas de transformación social. Lo que comenzó como una pequeña iniciativa, hoy es un proyecto que impacta a cientos de familias.
          </div>
        </div>
      </section>

      {/* Impacto */}
      <section className="nosotros-impacto">
        <div className="nosotros-section-title">El Impacto en la Comunidad</div>
        <div className="nosotros-impacto-content">
          <div className="nosotros-impacto-text">
            A lo largo de los años hemos acompañado a cientos de niños y jóvenes, brindándoles oportunidades de crecimiento personal, disciplina deportiva y educación en valores. Nuestra labor no solo forma deportistas, sino también seres humanos íntegros y comprometidos con su comunidad.
          </div>
        </div>
        <div className="nosotros-impacto-icons">
          <FaFutbol className="nosotros-impacto-icon" title="Balón" />
          <FaBook className="nosotros-impacto-icon" title="Libro" />
          <FaUsers className="nosotros-impacto-icon" title="Comunidad" />
        </div>
      </section>

      {/* Profesor Luis */}
      <section className="nosotros-luis">
        <img src="/assets/galeria/profesor_luis.png" alt="Profesor Luis" className="nosotros-luis-img" />
        <div className="nosotros-luis-text">
          <div className="nosotros-section-title">El Corazón de la Fundación</div>
          El profesor Luis ha sido el motor principal de esta fundación. Con dedicación y esfuerzo incansable, ha guiado a generaciones de niños y niñas en su camino deportivo y educativo. Su pasión por ayudar y su entrega son la base de lo que hoy somos como familia.
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="nosotros-mision-vision">
        <div className="nosotros-mision">
          <FaHeart className="nosotros-mv-icon" title="Corazón" />
          <div>
            <div className="nosotros-mv-title">Misión</div>
            <div className="nosotros-mv-text">
              Brindar a los niños y jóvenes en situación vulnerable oportunidades de desarrollo integral a través del deporte, la educación y los valores.
            </div>
          </div>
        </div>
        <div className="nosotros-vision">
          <FaStar className="nosotros-mv-icon" title="Estrella" />
          <div>
            <div className="nosotros-mv-title">Visión</div>
            <div className="nosotros-mv-text">
              Ser un referente en el acompañamiento deportivo y formativo en la región, promoviendo la inclusión, la esperanza y el futuro de nuevas generaciones.
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
