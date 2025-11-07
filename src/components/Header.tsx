import React, { useState } from 'react';
import './Header.css';
import logoAcordi from '../assets/logo_acordi.png';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="container">
        <a href="#inicio" className="logo-wrapper">
          <img src={logoAcordi} alt="Escritório Contábil Acordi" className="logo" />
        </a>

        <nav className={`nav ${mobileMenuOpen ? 'nav-open' : ''}`} aria-label="Navegação principal">
          <ul className="nav-list">
            <li><a href="#inicio" onClick={() => setMobileMenuOpen(false)}>Início</a></li>
            <li><a href="#servicos" onClick={() => setMobileMenuOpen(false)}>Serviços</a></li>
            <li><a href="#depoimentos" onClick={() => setMobileMenuOpen(false)}>Depoimentos</a></li>
            <li><a href="#planos" onClick={() => setMobileMenuOpen(false)}>Planos</a></li>
            <li><a href="#contato" onClick={() => setMobileMenuOpen(false)}>Contato</a></li>
          </ul>

          <div className="nav-actions">
            <a href="tel:+554532351207" className="nav-phone" aria-label="Ligar para escritório">(45) 3235-1207</a>
            <a href="#contato" className="btn-primary" onClick={() => setMobileMenuOpen(false)}>
              Fale Conosco
              <span className="arrow-icon" aria-hidden="true">→</span>
            </a>
          </div>
        </nav>

        <button
          className="mobile-menu-toggle"
          aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span aria-hidden="true">{mobileMenuOpen ? '✕' : '☰'}</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
