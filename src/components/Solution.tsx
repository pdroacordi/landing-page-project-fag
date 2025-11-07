import React from 'react';
import './Solution.css';

const Solution: React.FC = () => {
  const services = [
    {
      title: 'Contabilidade Empresarial',
      description: 'Gestão completa da contabilidade do seu negócio com precisão e conformidade fiscal.',
      icon: '📊'
    },
    {
      title: 'Assessoria Fiscal e Tributária',
      description: 'Planejamento tributário estratégico para otimizar sua carga fiscal de forma legal.',
      icon: '📈'
    },
    {
      title: 'Departamento Pessoal',
      description: 'Gestão de folha de pagamento, encargos trabalhistas e obrigações acessórias.',
      icon: '👥'
    },
  ];

  return (
    <section className="services" id="servicos" aria-labelledby="services-heading">
      <div className="container">
        <header className="services-header">
          <p className="section-tag">Nossos Serviços</p>
          <h2 id="services-heading" className="section-title">Soluções Contábeis Completas</h2>
          <p className="section-description">
            Oferecemos serviços especializados para manter sua empresa em dia com todas as obrigações legais e fiscais.
          </p>
        </header>

        <div className="services-grid">
          {services.map((service, index) => (
            <article key={index} className="service-card">
              <div className="service-icon" aria-hidden="true">
                <span className="icon-emoji">{service.icon}</span>
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <div className="service-accent" aria-hidden="true"></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solution;
