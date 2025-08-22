
'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/home/header/header';
import { Footer } from '@/components/home/footer/footer';
import '../../styles/rifa-solidaria.css';
import { useEffect, useState } from 'react';
// Componente contador regresivo
function Countdown() {
  const targetDate = new Date('2025-12-20T00:00:00');
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="rifa-countdown">
      <span>⏳ Faltan: </span>
      <span>{timeLeft.days} días, {timeLeft.hours} horas, {timeLeft.minutes} minutos, {timeLeft.seconds} segundos</span>
    </div>
  );
}


export default function RifaInfo() {
  return (
    <div className="rifa-page-container">
      <Header />
      <main className="rifa-main">
        {/* Hero Section */}
        <section className="rifa-hero">
          <div className="rifa-hero-bg">
            <Image src="/assets/galeria/carro/1.jpeg" alt="Renault Kwid 2025" className="rifa-hero-img" priority width={1200} height={600} />
          </div>
          <div className="rifa-hero-content">
            <h1 className="rifa-title">🎉 ¡Gran Rifa Solidaria Fundación Batta!</h1>
            <p className="rifa-subtitle">Participa y gana increíbles premios apoyando a los niños de nuestra fundación.</p>
            <div className="rifa-hero-details">
              <span className="rifa-date">📅 Sábado 20 de diciembre de 2025</span>
              <span className="rifa-bono">🎟️ Valor del boleto: $39.500 COP (5 cuotas para completar $197.000)</span>
            </div>
            <Countdown />
            <div className="rifa-hero-buttons">
              <Link href="/rifa-solidaria/rifa">
                <button className="rifa-btn principal">Quiero participar</button>
              </Link>
              <Link href="/rifa-solidaria/cuotas">
                <button className="rifa-btn secundario">Ya soy participante</button>
              </Link>
            </div>
          </div>
        </section>

        {/* Premio principal */}
        <section className="rifa-premio-principal">
          <Image src="/assets/galeria/carro/1.jpeg" alt="Renault Kwid 2025" className="premio-img" width={320} height={180} />
          <h2 className="premio-title">🚗 Primer Premio: Renault Kwid 2025 0km</h2>
        </section>

        {/* Premios secundarios */}
        <section className="rifa-premios-secundarios">
          <h3 className="premios-secundarios-title">Premios Secundarios</h3>
          <p className="premios-ejemplo-text">* Las imágenes de los premios son de ejemplo y pueden variar respecto al premio real.</p>
          <div className="premios-grid">
            <div className="premio-card">
              <Image src="/assets/galeria/sorteo/moto_electrica.png" alt="Moto eléctrica Auteco" width={120} height={90} style={{objectFit:'contain'}} />
              <h4>🛵 Moto eléctrica Auteco</h4>
              <p>Moto eléctrica Auteco, ecológica y moderna.</p>
            </div>
            <div className="premio-card">
              <Image src="/assets/galeria/sorteo/viaje_san_andres.png" alt="Viaje a San Andrés" width={120} height={90} style={{objectFit:'contain'}} />
              <h4>✈️ Viaje a San Andrés</h4>
              <p>Viaje para 2 personas, todo incluido.</p>
            </div>
            <div className="premio-card">
              <Image src="/assets/galeria/sorteo/moto_electrica_2.png" alt="Bicicleta eléctrica" width={120} height={90} style={{objectFit:'contain'}} />
              <h4>🚴 Bicicleta eléctrica</h4>
              <p>Bicicleta eléctrica, ideal para la ciudad.</p>
            </div>
            <div className="premio-card">
              <Image src="/assets/galeria/sorteo/sala_comedor.png" alt="Sala comedor" width={120} height={90} style={{objectFit:'contain'}} />
              <h4>🛋️ Sala comedor</h4>
              <p>Juego de sala comedor moderno.</p>
            </div>
            <div className="premio-card">
              <Image src="/assets/galeria/sorteo/uniformes_futbol.png" alt="Uniformes" width={120} height={90} style={{objectFit:'contain'}} />
              <h4>👕 30 uniformes</h4>
              <p>Uniformes deportivos para niños.</p>
            </div>
            <div className="premio-card">
              <Image src="/assets/galeria/sorteo/bultos_cemento.png" alt="Bultos de cemento" width={120} height={90} style={{objectFit:'contain'}} />
              <h4>🧱 50 bultos de cemento</h4>
              <p>Material para construcción y apoyo social.</p>
            </div>
          </div>
        </section>

        {/* Condiciones generales estilo acordeón */}
        <section className="rifa-condiciones">
          <h3 className="condiciones-title">📜 Condiciones Generales</h3>
          <div className="condiciones-acordeon">
            <details>
              <summary>1. Derecho a participar y premios</summary>
              <p>El suscritor del presente bono ($197.000 ciento noventa y siete mil pesos mcte.) adquiere el derecho a participar en los sorteos que sin letras ni series, juegan el premio mayor, premios secos y semanales. Los Premios Secos se clasifican de la siguiente manera: 1er. premio seco: Premio Fortuna, 2do. premio seco: Premio Alegría, 3er. premio seco: Premio Ilusión, 4to. premio seco: Premio Esperanza, 5to. premio seco: Premio Berraquera en su Orden, 6to. premio seco: Premio Berraquera en su orden.</p>
            </details>
            <details>
              <summary>2. Pago de premios</summary>
              <p>Todos los premios que aparecen en este bono son pagaderos al suscriptor, siempre y cuando presente el bono original ganador y documento de identidad.</p>
            </details>
            <details>
              <summary>3. Sorteos semanales</summary>
              <p>Para participar en los sorteos semanales por $500.000 quinientos mil pesos el bono debe estar cancelado en un 100% del valor total, para el día del respectivo sorteo.</p>
            </details>
            <details>
              <summary>4. Bonos a crédito</summary>
              <p>Todo bono comprado a crédito participa con las tres últimas y las tres primeras cifras del premio mayor de la lotería de Boyacá por $250.000 doscientos cincuenta mil pesos.</p>
            </details>
            <details>
              <summary>5. Pago total y participación</summary>
              <p>El bono adquirido a crédito y que no se haya pagado en su totalidad el día 27 de Septiembre de 2025, no podrá participar en el sorteo, premio mayor ni los premios secos.</p>
            </details>
            <details>
              <summary>6. Cambio de domicilio</summary>
              <p>Si el suscriptor del bono que cambia de domicilio o residencia, debe informar a las oficinas del presentante legal sus datos de su nueva dirección.</p>
            </details>
            <details>
              <summary>7. Entrega de premios</summary>
              <p>Los premios serán entregados a los ganadores la semana siguiente del sorteo, luego de verificar la boletería y presentar Documento de identidad.</p>
            </details>
            <details>
              <summary>8. Aplazamiento del sorteo</summary>
              <p>En caso de no venderse el 70% de su totalidad de 1000 boletas treinta días antes del sorteo se informará a los suscriptores que hayan adquirido sus bonos por escrito y de medios de comunicación su aplazamiento.</p>
            </details>
            <details>
              <summary>9. Información de la fundación</summary>
              <p>La fundación Social Deportiva BATTAN, su gerente y demás integrantes de la junta directiva tendrá su sede inicialmente en la Calle 19 No 6-46 - Duitama - Veterinaria Bigotes - Luis Arcadio Corredor Carrera 16 No. 12-24 - Segundo Piso Play House Cels. 314 2041925-313 306 3990</p>
            </details>
          </div>
        </section>

        {/* Información de la fundación */}
        <section className="rifa-fundacion">
          <h3 className="fundacion-title">Fundación Social Deportiva BATTA</h3>
          <div className="fundacion-info">
            <div>
              <p>Dirección: Calle 19 No 6-46, Duitama, Boyacá</p>
              <p>Oficina adicional: Carrera 16 No. 12-24, Segundo Piso Play House</p>
              <p>Contacto: 📞 314 2041925 – 313 306 3990</p>
            </div>
            <div className="fundacion-img">
              <Image src="/assets/galeria/profesor_luis.png" alt="Profesor Luis Arcadio Corredor" width={120} height={120} />
              <span>Profesor Luis Arcadio Corredor</span>
            </div>
          </div>
        </section>

        {/* Call to Action final */}
        <section className="rifa-cta-final">
          <p className="cta-text">💛 Al comprar tu bono apoyas a cientos de niños en su formación deportiva.</p>
          <div className="cta-buttons">
            <Link href="/rifa-solidaria/rifa">
              <button className="rifa-btn principal">Participar en la Rifa</button>
            </Link>
            <Link href="/rifa-solidaria/cuotas">
              <button className="rifa-btn secundario">Ya soy participante</button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
