import React from 'react';
import './Pricing.css';

const Pricing: React.FC = () => {
  const plans = [
    {
      name: 'Essencial',
      description: 'Ideal para MEI e pequenos negócios que estão começando.',
      price: 'Sob Consulta',
      features: [
        'Emissão de notas fiscais',
        'Declarações obrigatórias',
        'Suporte por e-mail',
      ],
      buttonText: 'Solicitar Orçamento',
      highlighted: false,
    },
    {
      name: 'Empresarial',
      description: 'Para empresas que precisam de gestão contábil completa.',
      price: 'Sob Consulta',
      badge: 'Mais Popular',
      features: [
        'Toda contabilidade empresarial',
        'Assessoria fiscal completa',
        'Departamento pessoal',
        'Suporte prioritário',
      ],
      buttonText: 'Solicitar Orçamento',
      highlighted: true,
    },
    {
      name: 'Premium',
      description: 'Soluções personalizadas para empresas de maior porte.',
      price: 'Sob Consulta',
      features: [
        'Consultoria estratégica',
        'Planejamento tributário',
        'Gestão financeira',
        'Atendimento dedicado',
      ],
      buttonText: 'Solicitar Orçamento',
      highlighted: false,
    },
  ];

  return (
    <section className="pricing" id="planos" aria-labelledby="pricing-heading">
      <div className="container">
        <header className="pricing-header">
          <p className="section-tag">Planos</p>
          <h2 id="pricing-heading" className="section-title">Escolha o Melhor Plano Para Você</h2>
        </header>

        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <article
              key={index}
              className={`pricing-card ${plan.highlighted ? 'highlighted' : ''}`}
            >
              {plan.badge && <span className="pricing-badge">{plan.badge}</span>}

              <header className="pricing-card-header">
                <h3 className="plan-name">{plan.name}</h3>
                <p className="plan-description">{plan.description}</p>

                <p className="plan-price">
                  <strong className="price">{plan.price}</strong>
                </p>

                <a href="#contato" className="btn btn-plan">
                  {plan.buttonText}
                </a>
              </header>

              <hr className="pricing-divider" />

              <ul className="pricing-features">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="feature-item">
                    <span className="check-icon" aria-hidden="true">✓</span>
                    <span className="feature-text">{feature}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
