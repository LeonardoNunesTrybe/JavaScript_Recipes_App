import React from 'react';
import { render, act } from '@testing-library/react';
import App from '../App';

describe('1.0 - Verificando componente Login', () => {
  it('1.1 - Verificando se o componente renderiza os elementos de forma certa', () => {
    const { history } = render(<App />);
    act(() => {
      history.push('/meals');
    });
  });
});
