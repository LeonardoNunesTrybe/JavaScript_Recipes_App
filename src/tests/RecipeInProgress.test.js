import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RecipeInProgress from '../components/RecipeInProgress';
import RecipesProvider from '../context/RecipesProvider';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';

const recipeTitle = 'recipe-title';
const finishRecipeBtn = 'finish-recipe-btn';
const textDecoration = 'text-decoration: line-through solid rgb(0, 0, 0)';

describe('Verificar renderização componente RecipeInProgress na tela', () => {
  test('Verificar se os elementos estão na tela', () => {
    renderWithRouter(
      <RecipesProvider>
        <RecipeInProgress />
      </RecipesProvider>,
    );
    const rt = screen.getByTestId(recipeTitle);
    const rp = screen.getByTestId('recipe-photo');
    const rc = screen.getByTestId('recipe-category');
    const ri = screen.getByTestId('instructions');
    const frb = screen.getByTestId(finishRecipeBtn);
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
  test('Verifica se ao entrar em uma comida com um ID especifico, se renderiza os ingredientes e seu checkbox', async () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/meals/52874/in-progress'] },
    );
    await waitFor(() => expect(screen.getByTestId(recipeTitle)).toBeInTheDocument());

    const ingredient = await screen.findAllByRole('checkbox');
    expect(ingredient.length).toBe(15);
  });
  test('Verifica se ao entrar em uma bebida com um ID especifico, se renderiza os ingredientes e seu checkbox', async () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/drinks/15346/in-progress'] },
    );
    await waitFor(() => expect(screen.getByTestId(recipeTitle)).toBeInTheDocument());

    const ingredient = await screen.findAllByRole('checkbox');
    expect(ingredient.length).toBe(4);
  });
  test('Verifica se ao carregar no botão de finalizar receitas, é encaminhado para a página de receitas prontas', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/drinks/15346/in-progress'] },
    );
    await waitFor(() => expect(screen.getByTestId(recipeTitle)).toBeInTheDocument());

    const frb = screen.getByTestId(finishRecipeBtn);
    expect(frb).toBeInTheDocument();

    userEvent.click(frb);
    const { pathname } = history.location;
    expect(pathname).toBe('/done-recipes');
  });
  test('Verifica se o botão de finalizar receita só fica habilitado quando todos os ingredientes estão checkados', async () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/meals/52968/in-progress'] },
    );
    await waitFor(() => expect(screen.getByTestId(recipeTitle)).toBeInTheDocument());

    const ingredient1 = await screen.findByText('Goat Meat');
    const ingredient2 = await screen.findByText('Corn Flour');
    const ingredient3 = await screen.findByText('Tomatoes');
    const ingredient4 = await screen.findByText('Salt');
    const ingredient5 = await screen.findByText('Onion');
    const ingredient6 = await screen.findByText('Green Chilli');
    const ingredient7 = await screen.findByText('Coriander Leaves');

    expect(ingredient1).toBeInTheDocument();
    expect(ingredient2).toBeInTheDocument();
    expect(ingredient3).toBeInTheDocument();
    expect(ingredient4).toBeInTheDocument();
    expect(ingredient5).toBeInTheDocument();
    expect(ingredient6).toBeInTheDocument();
    expect(ingredient7).toBeInTheDocument();

    expect(ingredient1).not.toHaveStyle(textDecoration);
    expect(ingredient2).not.toHaveStyle(textDecoration);

    const frb = screen.getByTestId(finishRecipeBtn);
    expect(frb).toBeInTheDocument();
    expect(frb).toBeDisabled();

    userEvent.click(ingredient1);
    expect(ingredient1).toHaveStyle(textDecoration);
    userEvent.click(ingredient2);
    userEvent.click(ingredient3);
    userEvent.click(ingredient4);
    userEvent.click(ingredient5);
    userEvent.click(ingredient6);
    userEvent.click(ingredient7);

    expect(frb).not.toBeDisabled();
  });
});
