import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from '../helpers/renderWith';
import App from '../App';

const searchTopBtn = 'search-top-btn';
const searchInput = 'search-input';
const firstLetter = 'first-letter-search-radio';
const execSearchBtn = 'exec-search-btn';

describe('1.Verificando componente SearchBar', () => {
  test('1.1Testa se o input de busca aparece na página /meals', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const searchIcon = screen.getByTestId(searchTopBtn);
    userEvent.click(searchIcon);

    await waitFor(() => {
      const searchBar = screen.getByTestId(searchInput);
      expect(searchBar).toBeInTheDocument();
      const { pathname } = history.location;
      expect(pathname).toBe('/meals');
    });
  });
  test('1.2Testa se o input de busca aparece na página /drinks', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    const searchIcon = screen.getByTestId(searchTopBtn);
    userEvent.click(searchIcon);

    await waitFor(() => {
      const searchBar = screen.getByTestId(searchInput);
      expect(searchBar).toBeInTheDocument();
      const { pathname } = history.location;
      expect(pathname).toBe('/drinks');
    });
  });
});

describe('2.Verifica o alert da busca por letra', () => {
  test('2.1Testa se colocando duas letras renderiza o alert', async () => {
    jest.spyOn(global, 'alert');

    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    const searchIcon = screen.getByTestId(searchTopBtn);
    userEvent.click(searchIcon);

    await waitFor(() => {
      const searchBar = screen.getByTestId(searchInput);
      userEvent.type(searchBar, 'aa');

      const searchModule = screen.getByTestId(firstLetter);
      userEvent.click(searchModule);

      const searchBtn = screen.getByTestId(execSearchBtn);
      userEvent.click(searchBtn);

      expect(global.alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
    });
  });
});

describe('3.Verifica a busca na página Drinks', () => {
  test('3.1.Testa se colocando o nome de uma receita, o usuário é direcionado para a página da receita', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    const searchIcon = screen.getByTestId(searchTopBtn);
    userEvent.click(searchIcon);

    await waitFor(() => {
      const searchBar = screen.getByTestId(searchInput);
      userEvent.type(searchBar, 'Aquamarine');

      const searchModule = screen.getByTestId('name-search-radio');
      userEvent.click(searchModule);

      const searchBtn = screen.getByTestId(execSearchBtn);
      userEvent.click(searchBtn);
    });
    await waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/drinks/178319');
    });
  });
  test('3.2.Testa se colocando um ingrediente, o app retorna as receitas', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    const searchIcon = screen.getByTestId(searchTopBtn);
    userEvent.click(searchIcon);

    await waitFor(() => {
      const searchBar = screen.getByTestId(searchInput);
      userEvent.type(searchBar, 'water');

      const searchModule = screen.getByTestId('ingredient-search-radio');
      userEvent.click(searchModule);

      const searchBtn = screen.getByTestId(execSearchBtn);
      userEvent.click(searchBtn);
    });

    await waitFor(() => {
      const drink1 = screen.getByText('Adam Sunrise');
      expect(drink1).toBeInTheDocument();
    });
  });
  test.only('3.3.Testa se colocando uma letra, o app retorna as receitas', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    const searchIcon = screen.getByTestId(searchTopBtn);
    userEvent.click(searchIcon);

    await waitFor(() => {
      const searchBar = screen.getByTestId(searchInput);
      userEvent.type(searchBar, 'w');

      const searchModule = screen.getByTestId(firstLetter);
      userEvent.click(searchModule);

      const searchBtn = screen.getByTestId(execSearchBtn);
      userEvent.click(searchBtn);
    });
    await waitFor(() => {
      const drink1 = screen.getByText('Whisky Mac');
      expect(drink1).toBeInTheDocument();
    });
  });

  test('3.4.Testa se não selecionando um filtro, o app mantém as receitas existentes', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    const searchIcon = screen.getByTestId(searchTopBtn);
    userEvent.click(searchIcon);

    await waitFor(() => {
      const searchBar = screen.getByTestId(searchInput);
      userEvent.type(searchBar, 'w');

      const searchBtn = screen.getByTestId(execSearchBtn);
      userEvent.click(searchBtn);
    });

    await waitFor(() => {
      const drink1 = screen.getByText('GG');
      expect(drink1).toBeInTheDocument();
    });
  });
});

describe('4.Verifica a busca na página Meals', () => {
  test('4.1.Testa se colocando o nome de uma receita, o usuário é direcionado para a página da receita', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const searchIcon = screen.getByTestId(searchTopBtn);
    userEvent.click(searchIcon);

    await waitFor(() => {
      const searchBar = screen.getByTestId(searchInput);
      userEvent.type(searchBar, 'chocolate gateau');

      const searchModule = screen.getByTestId('name-search-radio');
      userEvent.click(searchModule);

      const searchBtn = screen.getByTestId(execSearchBtn);
      userEvent.click(searchBtn);

      const { pathname } = history.location;
      expect(pathname).toBe('/meals/52776');
    });
  });
  test('4.2.Testa se colocando um ingrediente, o app retorna as receitas', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const searchIcon = screen.getByTestId(searchTopBtn);
    userEvent.click(searchIcon);

    await waitFor(() => {
      const searchBar = screen.getByTestId(searchInput);
      userEvent.type(searchBar, 'egg');

      const searchModule = screen.getByTestId('ingredient-search-radio');
      userEvent.click(searchModule);

      const searchBtn = screen.getByTestId(execSearchBtn);
      userEvent.click(searchBtn);

      const meal1 = screen.getByText('Beef Lo Mein');
      expect(meal1).toBeInTheDocument();
    });
  });
  test('4.3.Testa se colocando uma letra, o app retorna as receitas', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const searchIcon = screen.getByTestId(searchTopBtn);
    userEvent.click(searchIcon);

    await waiFor(() => {
      const searchBar = screen.getByTestId(searchInput);
      userEvent.type(searchBar, 'c');

      const searchModule = screen.getByTestId(firstLetter);
      userEvent.click(searchModule);

      const searchBtn = screen.getByTestId(execSearchBtn);
      userEvent.click(searchBtn);

      const meal1 = screen.getByText('Chocolate Gateau');
      expect(meal1).toBeInTheDocument();
    });
  });
  test('4.4.Testa se colocando uma letra, o app retorna as receitas', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const searchIcon = screen.getByTestId(searchTopBtn);
    userEvent.click(searchIcon);

    await waitFor(() => {
      const searchBar = screen.getByTestId(searchInput);
      userEvent.type(searchBar, 'c');

      const searchBtn = screen.getByTestId(execSearchBtn);
      userEvent.click(searchBtn);

      const meal1 = screen.getByText('Corba');
      expect(meal1).toBeInTheDocument();
    });
  });
});

// describe('5.Testa se a requisição é feita corretamente ao clicar em pesquisar', () => {
//   test('5.1.Requisição é feita ao clicar em pesquisar', async () => {
//     renderWithRouter(<App />, { initialEntries: ['/meals'] });

//     const searchBar = screen.getByTestId('name-search-radio');
//     userEvent.click(searchBar);

//     const searchInput = screen.getByTestId('search-input');
//     userEvent.type(searchInput, 'Beef Lo Mein');

//     const searchBtn = screen.getByTestId('exec-search-btn');
//     userEvent.click(searchBtn);

//     await waitFor(() => {
//       // Verifique se a função searchAPIMeals foi chamada corretamente com os parâmetros esperados
//       expect(searchAPIMeals()).toHaveBeenCalledWith('Beef Lo Mein');
//     });
//   });
// });
