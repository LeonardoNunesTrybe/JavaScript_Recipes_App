import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import useEvent from '@testing-library/user-event';
import Login from '../components/Login';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('1.0 - Verificando componente Login', () => {
  it('1.1 - Verificando se o componente renderiza os elementos de forma certa', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/');
    });
  });
});
