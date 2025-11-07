import React from 'react';
import './Footer.css';
import logoAcordi from '../assets/logo_acordi.png';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-column">
              <img src={logoAcordi} alt="Escritório Contábil Acordi" className="footer-logo" />
              <address className="footer-address">
                <p>Três Barras do Paraná, PR</p>
                <p>
                  <a href="tel:+554532351207">(45) 3235-1207</a>
                </p>
                <p>
                  <a href="mailto:contato@acordi.com.br">contato@acordi.com.br</a>
                </p>
              </address>
              <nav className="social-links" aria-label="Redes sociais">
                <a href="#" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                  📷
                </a>
                <a href="#" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                  👍
                </a>
                <a href="#" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                  💼
                </a>
              </nav>
            </div>

            <nav className="footer-column" aria-label="Serviços">
              <h3 className="footer-title">Serviços</h3>
              <ul className="footer-links">
                <li><a href="#servicos">Contabilidade</a></li>
                <li><a href="#servicos">Assessoria Fiscal</a></li>
                <li><a href="#servicos">Depto. Pessoal</a></li>
              </ul>
            </nav>

            <nav className="footer-column" aria-label="Empresa">
              <h3 className="footer-title">Empresa</h3>
              <ul className="footer-links">
                <li><a href="#inicio">Sobre Nós</a></li>
                <li><a href="#depoimentos">Depoimentos</a></li>
                <li><a href="#contato">Contato</a></li>
              </ul>
            </nav>

            <nav className="footer-column" aria-label="Links úteis">
              <h3 className="footer-title">Links Úteis</h3>
              <ul className="footer-links">
                <li><a href="#planos">Planos</a></li>
                <li><a href="#">Política de Privacidade</a></li>
                <li><a href="#">Termos de Uso</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p className="copyright">
            © {currentYear} Escritório Contábil Acordi. Todos os direitos reservados.
            Mais de 40 anos servindo Três Barras do Paraná com excelência.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
