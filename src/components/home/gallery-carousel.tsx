
"use client";
import Image from 'next/image';
import React, { useState } from 'react';
import '../../styles/home-page.css';

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

export default function GalleryCarousel() {
  const [current, setCurrent] = useState(0);
  const length = galeriaImgs.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  return (
    <div className="gallery-carousel">
      <button className="carousel-btn left" onClick={prevSlide} aria-label="Anterior">&#10094;</button>
      <div className="carousel-image-wrapper">
        <Image
          src={galeriaImgs[current]}
          alt={`Galería ${current + 1}`}
          width={600}
          height={400}
          className="carousel-image"
        />
      </div>
      <button className="carousel-btn right" onClick={nextSlide} aria-label="Siguiente">&#10095;</button>
      <div className="carousel-indicators">
        {galeriaImgs.map((_, idx) => (
          <span
            key={idx}
            className={`indicator-dot${idx === current ? ' active' : ''}`}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </div>
    </div>
  );
}
