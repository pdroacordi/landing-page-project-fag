import React from 'react';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-heading">
      <div className="hero-background" aria-hidden="true">
        <div className="hero-shape-right"></div>
        <div className="hero-shape-left"></div>
      </div>

      <div className="container">
        <article className="hero-content">
          <p className="hero-tag">Mais de 40 Anos de Tradição</p>
          <h1 id="hero-heading" className="hero-title">
            Contabilidade de Confiança em Três Barras do Paraná
          </h1>
          <p className="hero-description">
            Soluções contábeis completas para sua empresa crescer com segurança.
            Experiência, profissionalismo e compromisso com resultados que fazem a diferença.
          </p>
          <div className="cta-buttons">
            <a href="#contato" className="btn btn-primary">
              Solicitar Orçamento
            </a>
            <a href="#servicos" className="btn btn-outline">
              Conheça Nossos Serviços
            </a>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Hero;
