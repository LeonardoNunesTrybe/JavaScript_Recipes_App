import { screen, waitFor, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouter } from '../helpers/renderWith';
import App from '../App';
import RecipesProvider from '../context/RecipesProvider';
import Drinks from '../components/Drinks';
import Meals from '../components/Meals';

describe('1.Verificando componente SearchBar', () => {
  test('1.1Testa se o input de busca aparece na página /meals', () => {
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

    expect(window.location.pathname).toBe('/meals');
    expect(searchBar).toBeInTheDocument();
  });
  test('1.2Testa o input de busca na página /drinks', () => {
    renderWithRouter(<App />);

    const drinkIcon = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(drinkIcon);

    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);
    const searchBar = screen.getByTestId('search-input');

    expect(window.location.pathname).toBe('/drinks');
    expect(searchBar).toBeInTheDocument();
  });
});

describe('2.Verifica o alert da busca por letra', () => {
  test('2.1Testa se colocando duas letras renderiza o alert', async () => {
    jest.spyOn(global, 'alert');

    renderWithRouter(
      <RecipesProvider>
        <App history="/drinks" />
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

describe('3.Verifica a busca na página Drinks', () => {
  test('3.1.Testa se colocando o nome de uma receita, o usuário é direcionado para a página da receita', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <Drinks />
      </RecipesProvider>,
    );

    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);
    const searchBar = screen.getByTestId('search-input');

    userEvent.type(searchBar, 'Aquamarine');

    const searchModule = screen.getByTestId('name-search-radio');
    userEvent.click(searchModule);

    const searchBtn = screen.getByTestId('exec-search-btn');
    userEvent.click(searchBtn);

    await waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/drinks/178319');
    });
  });
  test('3.2.Testa se colocando um ingrediente, o app retorna as receitas', async () => {
    renderWithRouter(
      <RecipesProvider>
        <Drinks />
      </RecipesProvider>,
    );

    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);
    const searchBar = screen.getByTestId('search-input');

    userEvent.type(searchBar, 'water');

    const searchModule = screen.getByTestId('ingredient-search-radio');
    userEvent.click(searchModule);

    const searchBtn = screen.getByTestId('exec-search-btn');
    userEvent.click(searchBtn);

    await waitFor(() => {
      const recipe1 = screen.getByText('Ordinary Drink');
      expect(recipe1).toBeInTheDocument();
    });
  });
  test('3.3.Testa se colocando uma letra, o app retorna as receitas', async () => {
    renderWithRouter(
      <RecipesProvider>
        <Drinks />
      </RecipesProvider>,
    );

    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);
    const searchBar = screen.getByTestId('search-input');

    userEvent.type(searchBar, 'w');

    const searchModule = screen.getByTestId('first-letter-search-radio');
    userEvent.click(searchModule);

    const searchBtn = screen.getByTestId('exec-search-btn');
    userEvent.click(searchBtn);

    await waitFor(() => {
      const recipe1 = screen.getByText('Ordinary Drink');
      expect(recipe1).toBeInTheDocument();
    });
  });
});
describe('4.Verifica a busca na página Meals', () => {
  test.only('4.1.Usuário é direcionado para a página da receita ao inserir o nome', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const searchBar = screen.getByTestId('name-search-radio');
    userEvent.click(searchBar);

    const searchInput = screen.getByTestId('search-input');
    userEvent.type(searchInput, 'Beef Lo Mein');

    const searchBtn = screen.getByTestId('exec-search-btn');
    userEvent.click(searchBtn);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/meals/52952');
    });
  });
});
test('4.3.Testa se colocando uma letra, o app retorna as receitas', async () => {
  renderWithRouter(
    <RecipesProvider>
      <Meals />
    </RecipesProvider>,
  );

  const searchIcon = screen.getByTestId('search-top-btn');
  userEvent.click(searchIcon);
  const searchBar = screen.getByTestId('search-input');

  userEvent.type(searchBar, 'w');

  const searchModule = screen.getByTestId('first-letter-search-radio');
  userEvent.click(searchModule);

  const searchBtn = screen.getByTestId('exec-search-btn');
  userEvent.click(searchBtn);

  await waitFor(() => {
    const recipe1 = screen.getByText('Ordinary Drink');
    expect(recipe1).toBeInTheDocument();
  });
});

describe('Testa se a requisição é feita corretamente ao clicar em pesquisar', () => {
  test('Requisição é feita ao clicar em pesquisar', async () => {
    const history = createMemoryHistory();
    history.push('/meals');

    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const searchBar = screen.getByTestId('name-search-radio');
    userEvent.click(searchBar);

    const searchInput = screen.getByTestId('search-input');
    userEvent.type(searchInput, 'Beef Lo Mein');

    const searchBtn = screen.getByTestId('exec-search-btn');
    userEvent.click(searchBtn);

    await waitFor(() => {
      // Verifique se a função searchAPIMeals foi chamada corretamente com os parâmetros esperados
      expect(searchAPIMeals()).toHaveBeenCalledWith('Beef Lo Mein');
    });
  });
});
