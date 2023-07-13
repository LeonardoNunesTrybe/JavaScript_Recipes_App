import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouter } from '../helpers/renderWith';
import App from '../App';
import RecipesProvider from '../context/RecipesProvider';
import Drinks from '../components/Drinks';

describe('Verificando componente SearchBar', () => {
  test('Testa se o input de busca aparece na página /meals', () => {
    renderWithRouter(<App />);

    const emailSubmit = 'email-input';
    const passSubmit = 'password-input';
    const btnSubmit = 'login-submit-btn';

    const email = screen.getByTestId(emailSubmit);
    const password = screen.getByTestId(passSubmit);
    const btn = screen.getByTestId(btnSubmit);

    act(() => {
      userEvent.type(email, 'teste@teste.com');
      userEvent.type(password, '1234567');
    });

    act(() => {
      userEvent.click(btn);
    });
    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);

    const searchBar = screen.getByTestId('search-input');
    userEvent.type(searchBar, 'Beef Lo Mein');

    expect(window.location.pathname).toBe('/meals');
    expect(searchBar.value).toBe('Beef Lo Mein');
  });
  test('Testa o input de busca na página /drinks', () => {
    renderWithRouter(<App />);

    const drinkIcon = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(drinkIcon);

    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);

    const searchBar = screen.getByTestId('search-input');
    userEvent.type(searchBar, 'Aquamarine');

    expect(window.location.pathname).toBe('/drinks');
    expect(searchBar.value).toBe('Aquamarine');
  });
});

describe('Verifica o alert da busca por letra', () => {
  test('Testa se colocando duas letras renderiza o alert', async () => {
    // window.alert = jest.fn();
    // jest.spyOn(global, 'alert');
    jest.spyOn(global, 'alert');

    renderWithRouter(
      <RecipesProvider>
        <Drinks />
      </RecipesProvider>,
    );

    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);

    const searchBar = screen.getByTestId('search-input');
    userEvent.type(searchBar, 'aa');

    const searchModule = screen.getByTestId('first-letter-search-radio');
    userEvent.click(searchModule);

    const searchBtn = screen.getByTestId('exec-search-btn');
    userEvent.click(searchBtn);

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledTimes(1);
    });
  });
});

describe('Verifica a busca por nome da receita', () => {
  test('Testa se colocando o nome de uma receita, o usuário é direcionado para a página da receita', () => {
    renderWithRouter(
      <RecipesProvider>
        <Drinks />
      </RecipesProvider>,
    );

    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);

    const searchBar = screen.getByTestId('search-input');
    userEvent.type(searchBar, 'Aquamarine');

    const searchModule = screen.getByTestId('first-letter-search-radio');
    userEvent.click(searchModule);

    const searchBtn = screen.getByTestId('exec-search-btn');
    userEvent.click(searchBtn);

    const errorMessageNode = screen.getByRole('alert');
    expect(errorMessageNode).toBeInTheDocument();
  });
});
