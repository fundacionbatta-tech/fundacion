'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/home/header/header';
import { Footer } from '@/components/home/footer/footer';
import '../../styles/rifa-solidaria.css';
import { useState, useEffect } from 'react';
import { useRifasActivas } from '@/hooks/useRifasActivas';
import { usePremiosRifa } from '@/hooks/usePremiosRifa';

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
    <div className="rifa-countdown mejorada">
      <div className="countdown-label">⏳ Faltan:</div>
      <div className="countdown-values">
        <div className="countdown-item">
          <span>{timeLeft.days}</span>
          <small>días</small>
        </div>
        <div className="countdown-item">
          <span>{timeLeft.hours}</span>
          <small>horas</small>
        </div>
        <div className="countdown-item">
          <span>{timeLeft.minutes}</span>
          <small>min</small>
        </div>
        <div className="countdown-item">
          <span>{timeLeft.seconds}</span>
          <small>seg</small>
        </div>
      </div>
    </div>
  );
}

export default function RifaInfo() {
  const { rifas, loading, error } = useRifasActivas();
  const [selectedRifaId, setSelectedRifaId] = useState<string | null>(null);
  const selectedRifa = rifas.find((r) => r.id === selectedRifaId) || null;
  const { premios, loading: premiosLoading } = usePremiosRifa(selectedRifaId || '');

  return (
    <div className="rifa-page-container">
      <Header />
      <main className="rifa-main">
        {/* Listado de rifas activas */}
        <section className="rifa-listado">
          <h2
            className="rifa-listado-title"
            style={{
              marginTop: '2.5rem',
              marginBottom: '1.5rem',
              color: '#2563eb',
              fontWeight: 800,
              fontSize: '2rem',
              textAlign: 'center',
              letterSpacing: '0.02em',
            }}
          >
            🎟️ Rifas activas
          </h2>
          {loading ? (
            <p className="rifa-loading">Cargando rifas...</p>
          ) : error ? (
            <p className="rifa-error">Error: {error}</p>
          ) : (
            <div className="rifa-cards-grid">
              {rifas.map((rifa) => (
                <div
                  key={rifa.id}
                  className={`rifa-card${selectedRifaId === rifa.id ? ' selected' : ''}`}
                  onClick={() => setSelectedRifaId(rifa.id)}
                >
                  <div className="rifa-card-header">
                    <h3 style={{ color: '#222', fontWeight: 700 }}>{rifa.nombre}</h3>
                    {selectedRifaId === rifa.id && <span className="rifa-card-check">✓</span>}
                  </div>
                  <p className="rifa-card-desc" style={{ color: '#222', fontWeight: 500 }}>
                    {rifa.descripcion}
                  </p>
                  <div className="rifa-card-info" style={{ color: '#2563eb', fontWeight: 500 }}>
                    <span>
                      📅 <b>Inicio:</b> <span style={{ color: '#222' }}>{rifa.fecha_inicio}</span>
                    </span>
                    <span>
                      ⏳ <b>Fin:</b> <span style={{ color: '#222' }}>{rifa.fecha_fin}</span>
                    </span>
                  </div>
                  <div className="rifa-card-precio" style={{ color: '#f7b500', fontWeight: 700, fontSize: '1.08rem' }}>
                    Valor boleto: <b style={{ color: '#222' }}>${rifa.precio_boleto} COP</b>
                  </div>
                  {rifa.permitir_cuotas && (
                    <span className="rifa-card-cuotas" style={{ color: '#10b981', fontWeight: 600 }}>
                      Permite cuotas
                    </span>
                  )}
                  <button
                    className={`rifa-card-btn${selectedRifaId === rifa.id ? ' selected' : ''}`}
                    style={{
                      fontSize: '1.08rem',
                      fontWeight: 700,
                      boxShadow: '0 2px 8px rgba(37,99,235,0.10)',
                      background:
                        selectedRifaId === rifa.id
                          ? 'linear-gradient(90deg,#f7b500 60%,#2563eb 100%)'
                          : 'linear-gradient(90deg,#2563eb 60%,#10b981 100%)',
                      color: '#fff',
                      border: 'none',
                    }}
                  >
                    {selectedRifaId === rifa.id ? 'Ver detalle' : 'Entrar al detalle'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Detalle de la rifa seleccionada */}
        {selectedRifa && (
          <section className="rifa-detalle">
            <div className="rifa-hero">
              <div className="rifa-hero-content">
                <div
                  className="rifa-hero-mobile-info"
                  style={{
                    background: 'linear-gradient(90deg,#f7b500 60%,#2563eb 100%)',
                    borderRadius: '16px',
                    boxShadow: '0 2px 12px rgba(37,99,235,0.08)',
                    padding: '1.5rem 1rem',
                    marginBottom: '1.5rem',
                    color: '#fff',
                    textAlign: 'center',
                    maxWidth: '480px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.7rem', letterSpacing: '0.01em' }}>
                    Gran Rifa Solidaria
                  </h1>
                  <p style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '1rem', lineHeight: 1.4 }}>
                    Juega el día <b>Sábado 20 de diciembre de 2025</b>, con las tres últimas cifras del premio mayor y
                    sus respectivos premios secos de la lotería de Boyacá.
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem',
                      alignItems: 'center',
                      fontSize: '1rem',
                    }}
                  >
                    <span
                      style={{
                        background: 'rgba(255,255,255,0.15)',
                        borderRadius: '8px',
                        padding: '0.3rem 0.8rem',
                        fontWeight: 600,
                      }}
                    >
                      <b>Inicio:</b> {selectedRifa.fecha_inicio} | <b>Fin:</b> {selectedRifa.fecha_fin}
                    </span>
                    <span
                      style={{
                        background: 'rgba(255,255,255,0.15)',
                        borderRadius: '8px',
                        padding: '0.3rem 0.8rem',
                        fontWeight: 600,
                      }}
                    >
                      Valor del boleto: <b>${selectedRifa.precio_boleto} COP</b>{' '}
                      {selectedRifa.permitir_cuotas ? <span style={{ color: '#10b981' }}>(Permite cuotas)</span> : ''}
                    </span>
                  </div>
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
                {/* Premios separados por tipo */}
                <div
                  className="rifa-premios"
                  style={{
                    background: '#fff',
                    borderRadius: '16px',
                    boxShadow: '0 2px 12px rgba(37,99,235,0.08)',
                    padding: '2rem 1.5rem',
                    marginTop: '2rem',
                  }}
                >
                  <h3
                    className="premios-title"
                    style={{ color: '#2563eb', fontWeight: 700, fontSize: '1.5rem', marginBottom: '1.2rem' }}
                  >
                    🎁 Premios
                  </h3>
                  {premiosLoading ? (
                    <p className="rifa-loading" style={{ color: '#2563eb', fontWeight: 600, fontSize: '1.1rem' }}>
                      Cargando premios...
                    </p>
                  ) : premios.length === 0 ? (
                    <p className="rifa-error" style={{ color: '#f43f5e', fontWeight: 600, fontSize: '1.1rem' }}>
                      No hay premios registrados para esta rifa.
                    </p>
                  ) : (
                    <div
                      className="premios-tipos-container"
                      style={{ display: 'flex', flexWrap: 'wrap', gap: '2.5rem', justifyContent: 'center' }}
                    >
                      {/* Premio Mayor */}
                      {premios.filter((p) => p.tipo === 'mayor').length > 0 && (
                        <div className="premios-tipo-section" style={{ flex: '1 1 320px', minWidth: '320px' }}>
                          <h4
                            style={{
                              color: '#f7b500',
                              fontWeight: 700,
                              fontSize: '1.25rem',
                              marginBottom: '1rem',
                              textAlign: 'center',
                              letterSpacing: '0.02em',
                            }}
                          >
                            🚗 Premio Mayor
                          </h4>
                          <div
                            className="premios-grid"
                            style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}
                          >
                            {premios
                              .filter((p) => p.tipo === 'mayor')
                              .map((premio) => (
                                <div
                                  key={premio.id}
                                  className="premio-card"
                                  style={{
                                    background: 'linear-gradient(135deg,#f7b500 60%,#fff 100%)',
                                    borderRadius: '12px',
                                    boxShadow: '0 2px 8px rgba(37,99,235,0.10)',
                                    padding: '1.2rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    minHeight: '220px',
                                  }}
                                >
                                  {premio.imagen_url && (
                                    <Image
                                      src={premio.imagen_url}
                                      alt={premio.nombre}
                                      width={120}
                                      height={90}
                                      style={{
                                        objectFit: 'contain',
                                        borderRadius: '8px',
                                        boxShadow: '0 2px 8px rgba(37,99,235,0.10)',
                                        marginBottom: '0.7rem',
                                      }}
                                    />
                                  )}
                                  <h4
                                    style={{
                                      color: '#222',
                                      fontWeight: 700,
                                      fontSize: '1.15rem',
                                      marginBottom: '0.5rem',
                                      textAlign: 'center',
                                    }}
                                  >
                                    🚗 {premio.nombre}
                                  </h4>
                                  <p
                                    style={{
                                      color: '#222',
                                      fontWeight: 500,
                                      fontSize: '1rem',
                                      marginBottom: '0.5rem',
                                      textAlign: 'center',
                                    }}
                                  >
                                    {premio.descripcion}
                                  </p>
                                  <span
                                    className="premio-cantidad"
                                    style={{ color: '#10b981', fontWeight: 600, fontSize: '1rem' }}
                                  >
                                    Cantidad: {premio.cantidad}
                                  </span>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}
                      {/* Premios Secundarios */}
                      {premios.filter((p) => p.tipo === 'secundario').length > 0 && (
                        <div className="premios-tipo-section" style={{ flex: '1 1 320px', minWidth: '320px' }}>
                          <h4
                            style={{
                              color: '#2563eb',
                              fontWeight: 700,
                              fontSize: '1.25rem',
                              marginBottom: '1rem',
                              textAlign: 'center',
                              letterSpacing: '0.02em',
                            }}
                          >
                            🎁 Premios Secundarios
                          </h4>
                          <div
                            className="premios-grid"
                            style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}
                          >
                            {premios
                              .filter((p) => p.tipo === 'secundario')
                              .map((premio) => (
                                <div
                                  key={premio.id}
                                  className="premio-card"
                                  style={{
                                    background: 'linear-gradient(135deg,#2563eb 60%,#fff 100%)',
                                    borderRadius: '12px',
                                    boxShadow: '0 2px 8px rgba(37,99,235,0.10)',
                                    padding: '1.2rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    minHeight: '220px',
                                  }}
                                >
                                  {premio.imagen_url && (
                                    <Image
                                      src={premio.imagen_url}
                                      alt={premio.nombre}
                                      width={120}
                                      height={90}
                                      style={{
                                        objectFit: 'contain',
                                        borderRadius: '8px',
                                        boxShadow: '0 2px 8px rgba(37,99,235,0.10)',
                                        marginBottom: '0.7rem',
                                      }}
                                    />
                                  )}
                                  <h4
                                    style={{
                                      color: '#222',
                                      fontWeight: 700,
                                      fontSize: '1.15rem',
                                      marginBottom: '0.5rem',
                                      textAlign: 'center',
                                    }}
                                  >
                                    🎁 {premio.nombre}
                                  </h4>
                                  <p
                                    style={{
                                      color: '#222',
                                      fontWeight: 500,
                                      fontSize: '1rem',
                                      marginBottom: '0.5rem',
                                      textAlign: 'center',
                                    }}
                                  >
                                    {premio.descripcion}
                                  </p>
                                  <span
                                    className="premio-cantidad"
                                    style={{ color: '#10b981', fontWeight: 600, fontSize: '1rem' }}
                                  >
                                    Cantidad: {premio.cantidad}
                                  </span>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}
                      {/* Premios Semanales */}
                      {premios.filter((p) => p.tipo === 'semanal').length > 0 && (
                        <div className="premios-tipo-section" style={{ flex: '1 1 320px', minWidth: '320px' }}>
                          <h4
                            style={{
                              color: '#10b981',
                              fontWeight: 700,
                              fontSize: '1.25rem',
                              marginBottom: '1rem',
                              textAlign: 'center',
                              letterSpacing: '0.02em',
                            }}
                          >
                            🗓️ Premios Semanales
                          </h4>
                          <div
                            className="premios-grid"
                            style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}
                          >
                            {premios
                              .filter((p) => p.tipo === 'semanal')
                              .map((premio) => (
                                <div
                                  key={premio.id}
                                  className="premio-card"
                                  style={{
                                    background: 'linear-gradient(135deg,#10b981 60%,#fff 100%)',
                                    borderRadius: '12px',
                                    boxShadow: '0 2px 8px rgba(37,99,235,0.10)',
                                    padding: '1.2rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    minHeight: '220px',
                                  }}
                                >
                                  {premio.imagen_url && (
                                    <Image
                                      src={premio.imagen_url}
                                      alt={premio.nombre}
                                      width={120}
                                      height={90}
                                      style={{
                                        objectFit: 'contain',
                                        borderRadius: '8px',
                                        boxShadow: '0 2px 8px rgba(37,99,235,0.10)',
                                        marginBottom: '0.7rem',
                                      }}
                                    />
                                  )}
                                  <h4
                                    style={{
                                      color: '#222',
                                      fontWeight: 700,
                                      fontSize: '1.15rem',
                                      marginBottom: '0.5rem',
                                      textAlign: 'center',
                                    }}
                                  >
                                    🗓️ {premio.nombre}
                                  </h4>
                                  <p
                                    style={{
                                      color: '#222',
                                      fontWeight: 500,
                                      fontSize: '1rem',
                                      marginBottom: '0.5rem',
                                      textAlign: 'center',
                                    }}
                                  >
                                    {premio.descripcion}
                                  </p>
                                  {/* No mostrar cantidad para premios semanales */}
                                </div>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Condiciones generales estilo acordeón */}
            <section className="rifa-condiciones">
              <h3 className="condiciones-title">📜 CONDICIONES GENERALES</h3>
              <div className="condiciones-acordeon visual">
                <details>
                  <summary>1. Derecho a participar y premios</summary>
                  <p>
                    El suscritor del presente bono ($197.000 ciento noventa y siete mil pesos mcte.) adquiere el derecho
                    a participar en los sorteos que sin letras ni series, juegan el premio mayor, premios secos y
                    semanales. Los Premios Secos se clasifican de la siguiente manera: 1er. premio seco: Premio Fortuna,
                    2do. premio seco: Premio Alegría, 3er. premio seco: Premio Ilusión, 4to. premio seco: Premio
                    Esperanza, 5to. premio seco: Premio Berraquera en su Orden, 6to. premio seco: Premio Berraquera en
                    su orden.
                  </p>
                </details>
                <details>
                  <summary>2. Pago de premios</summary>
                  <p>
                    Todos los premios que aparecen en este bono son pagaderos al suscriptor, siempre y cuando presente
                    el bono original ganador y documento de identidad.
                  </p>
                </details>
                <details>
                  <summary>3. Sorteos semanales</summary>
                  <p>
                    Para participar en los sorteos semanales por $ 500.000 quinientos mil pesos el bono debe estar
                    cancelado en un 100 % del valor total, para el dia del respectivo sorteo.
                  </p>
                </details>
                <details>
                  <summary>4. Bono comprado a crédito</summary>
                  <p>
                    Todo bono comprado a crédito participa con las tres ultimas y las tres primeras cifras del premio
                    mayor de la lotería de Boyacá por $ 250.000 doscientos cincuenta mil pesos.
                  </p>
                </details>
                <details>
                  <summary>5. Pago total y participación</summary>
                  <p>
                    El bono adquirido a crédito y que no se haya pagado en su totalidad el día 27 de Septiembre de 2025,
                    no podrá participar en el sorteo, premio mayor ni los premios secos.
                  </p>
                </details>
                <details>
                  <summary>6. Cambio de domicilio</summary>
                  <p>
                    Si el suscriptor del bono que cambia de domicilio o residencia, debe informar a las oficinas del
                    presentante legal sus datos de su nueva dirección.
                  </p>
                </details>
                <details>
                  <summary>7. Entrega de premios</summary>
                  <p>
                    Los premios serán entregados a los ganadores la semana siguiente del sorteo, luego de verificar la
                    boletería y presentar Documento de identidad.
                  </p>
                </details>
                <details>
                  <summary>8. Aplazamiento del sorteo</summary>
                  <p>
                    En caso de no venderse el 70% de su totalidad de 1000 boletas treinta días antes del sorteo se
                    informará a los suscriptores que hayan adquirido sus bonos por escrito y de medios de comunicación
                    su aplazamiento.
                  </p>
                </details>
                <details>
                  <summary>9. Información de la fundación</summary>
                  <p>
                    La fundación Social Deportiva BATTAN, su gerente y demás integrantes de la junta directiva tendrá su
                    sede inicialmente en la Calle 19 No 6-46 - Duitama - Veterinaria Bigotes - Luis Arcadio Corredor
                    Carrera 16 No. 12-24 - Segundo Piso Play House Cels. 314 2041925-313 306 3990)
                  </p>
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
                  <Image
                    src="/assets/galeria/profesor_luis.png"
                    alt="Profesor Luis Arcadio Corredor"
                    width={120}
                    height={120}
                  />
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
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
