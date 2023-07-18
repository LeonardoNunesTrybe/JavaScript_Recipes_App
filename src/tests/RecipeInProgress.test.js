import { screen, waitFor } from '@testing-library/react';
import RecipeInProgress from '../components/RecipeInProgress';
import RecipesProvider from '../context/RecipesProvider';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';

describe('Verificar renderização componente RecipeInProgress na tela', () => {
  test('Verificar se os elementos estão na tela', () => {
    renderWithRouter(
      <RecipesProvider>
        <RecipeInProgress />
      </RecipesProvider>,
    );
    const rt = screen.getByTestId('recipe-title');
    const rp = screen.getByTestId('recipe-photo');
    const rc = screen.getByTestId('recipe-category');
    const ri = screen.getByTestId('instructions');
    const frb = screen.getByTestId('finish-recipe-btn');
    const sb = screen.getByTestId('share-btn');
    const fb = screen.getByTestId('favorite-btn');

    expect(rt).toBeInTheDocument();
    expect(rp).toBeInTheDocument();
    expect(rc).toBeInTheDocument();
    expect(ri).toBeInTheDocument();
    expect(frb).toBeInTheDocument();
    expect(sb).toBeInTheDocument();
    expect(fb).toBeInTheDocument();
  });
  test('Verifica se ao entrar em um ID especifico, se renderiza os ingredientes e seu checkbox', async () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/meals/52874/in-progress'] },
    );
    await waitFor(() => expect(screen.getByTestId('recipe-title')).toBeInTheDocument());

    const ingredient = await screen.findAllByRole('checkbox');
    expect(ingredient.length).toBe(15);
  });
});
