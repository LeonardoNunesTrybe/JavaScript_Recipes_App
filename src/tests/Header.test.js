import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header';
import { renderWithRouter } from './helpers/renderWith';
import Meals from '../components/Meals';
import RecipesProvider from '../context/RecipesProvider';

describe('Verificando componente Header', () => {
  test('Verificando se o componente renderiza os elementos de forma certa', () => {
    renderWithRouter(
      <RecipesProvider>
        <Header haveBar title="Meals" />
        {' '}
      </RecipesProvider>,
    );

    const profileIcon = screen.getByTestId('profile-top-btn');
    const searchIcon = screen.getByTestId('search-top-btn');
    const title = screen.getByTestId('page-title');

    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });

  test('Verificando se o redirecionamento para a tela de perfil esta correto', () => {
    const { history } = renderWithRouter(
      <RecipesProvider><Header haveBar title="Meals" /></RecipesProvider>,
    );

    const profileIcon = screen.getByTestId('profile-top-btn');
    userEvent.click(profileIcon);
    const { pathname } = history.location;
    expect(pathname).toBe('/profile');
  });

  test('Verificando o botão de busca', () => {
    renderWithRouter(<RecipesProvider><Meals /></RecipesProvider>);

    const searchIcon = screen.getByTestId('search-top-btn');

    fireEvent.click(searchIcon);
    const searchBar = screen.getByTestId('search-input');
    expect(searchBar).toBeInTheDocument();
    fireEvent.click(searchIcon);
    expect(searchBar).not.toBeInTheDocument();
  });
});
// comentario da Jeni.
