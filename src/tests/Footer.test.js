import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Footer from '../components/Footer';

describe('Testando o componente Footer', () => {
  it('Se está renderizando', () => {
    render(
      <Router history={ createMemoryHistory() }>
        <Footer />
      </Router>,
    );

    const footerElement = screen.getByTestId('footer');
    expect(footerElement).toBeInTheDocument();
  });

  it('Se vai para /drinks quando o botão é clicado', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Footer />
      </Router>,
    );

    const drinksBtn = screen.getByTestId('drinks-bottom-btn');
    drinksBtn.click();

    expect(history.location.pathname).toBe('/drinks');
  });

  it('Se vai para /meals quando o botão é clicado', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Footer />
      </Router>,
    );

    const mealsBtn = screen.getByTestId('meals-bottom-btn');
    mealsBtn.click();

    expect(history.location.pathname).toBe('/meals');
  });

  it('Se não renderiza quando vai pra uma rota inexistente', () => {
    const history = createMemoryHistory();
    history.push('/mais-voce');
    render(
      <Router history={ history }>
        <Footer />
      </Router>,
    );

    const footerElem = screen.queryByTestId('footer');
    expect(footerElem).toBeNull();
  });
});
