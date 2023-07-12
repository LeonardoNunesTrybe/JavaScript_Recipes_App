import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './helpers/renderWith';

describe('1.0 - Verificando componente Login', () => {
  const emailSubmit = 'email-input';
  const passSubmit = 'password-input';
  const btnSubmit = 'login-submit-btn';

  it('1.1 - Verificando se o componente renderiza os elementos de forma certa', () => {
    renderWithRouter(<App />);
    const email = screen.getByTestId(emailSubmit);
    const password = screen.getByTestId(passSubmit);
    const btn = screen.getByTestId(btnSubmit);

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
  });
  it('1.2- validando email e password', () => {
    renderWithRouter(<App />);
    const email = screen.getByTestId(emailSubmit);
    const password = screen.getByTestId(passSubmit);
    const btn = screen.getByTestId(btnSubmit);

    expect(btn).toBeDisabled();

    act(() => {
      userEvent.type(email, 'teste@teste.com');
      userEvent.type(password, '1234567');
    });

    expect(btn).toBeEnabled();
  });
  it('1.3 - validando mudança de rota', () => {
    const { history } = renderWithRouter(<App />);

    const email = screen.getByTestId(emailSubmit);
    const password = screen.getByTestId(passSubmit);
    const btn = screen.getByTestId(btnSubmit);

    expect(btn).toBeDisabled();

    act(() => {
      userEvent.type(email, 'teste@teste.com');
      userEvent.type(password, '1234567');
    });
    expect(btn).toBeEnabled();

    act(() => {
      userEvent.click(btn);
    });
    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
  });
});
