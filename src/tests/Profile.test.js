import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';

const emailSubmit = 'email-input';
const passSubmit = 'password-input';
const btnSubmit = 'login-submit-btn';

describe('1.Testa a página Profile', () => {
  test('1.1. Testa os elementos da página', () => {
    const { history } = renderWithRouter(<App />);

    const email = screen.getByTestId(emailSubmit);
    const password = screen.getByTestId(passSubmit);
    const btn = screen.getByTestId(btnSubmit);

    userEvent.type(email, 'teste@teste.com');
    userEvent.type(password, '1234567');

    userEvent.click(btn);

    const profileBtn = screen.getByTestId('profile-top-btn');
    userEvent.click(profileBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/profile');

    const profileEmail = screen.getByTestId('profile-email');
    expect(profileEmail).toBeInTheDocument();
    expect(profileEmail).toHaveTextContent('teste@teste.com');

    const doneBtn = screen.getByTestId('profile-done-btn');
    expect(doneBtn).toBeInTheDocument();
    expect(doneBtn).toHaveTextContent('Done Recipes');

    const favoriteBtn = screen.getByTestId('profile-favorite-btn');
    expect(favoriteBtn).toBeInTheDocument();
    expect(favoriteBtn).toHaveTextContent('Favorite Recipes');

    const logoutBtn = screen.getByTestId('profile-logout-btn');
    expect(logoutBtn).toBeInTheDocument();
    expect(logoutBtn).toHaveTextContent('Logout');
  });
});
describe('2.Testa a página Profile', () => {
  test('2.1. Testa a mudança de rota para Done Recipes', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/profile'] });

    const doneBtn = screen.getByTestId('profile-done-btn');
    userEvent.click(doneBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/done-recipes');
  });

  test('1.2. Testa a mudança de rota para Favorites', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/profile'] });

    const favoriteBtn = screen.getByTestId('profile-favorite-btn');
    userEvent.click(favoriteBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorite-recipes');
  });

  test('1.3. Testa a mudança de rota para Logout', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/profile'] });

    const logoutBtn = screen.getByTestId('profile-logout-btn');
    userEvent.click(logoutBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});
describe('Testa o email salvo no localStorage', () => {
  test('Testa se com o localStorage vazio ele renderiz o texto `sem usuário ativo`', () => {
    renderWithRouter(<App />, { initialEntries: ['/profile'] });

    const profileEmail = screen.getByTestId('profile-email');
    expect(profileEmail).toBeInTheDocument();
    expect(profileEmail).toHaveTextContent('sem usuário ativo');
  });
});
