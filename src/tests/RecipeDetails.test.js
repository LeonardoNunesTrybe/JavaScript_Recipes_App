import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RecipesProvider from '../context/RecipesProvider';
import RecipesDetails from '../components/RecipeDetails';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';

const startRecipe = 'start-recipe-btn';

describe('Verificar renderização componente RecipeDetails', () => {
  const favoriteRecipes = [
    {
      id: '52771',
      type: 'meal',
      strIngredient1: 'penne rigate',
      strIngredient2: 'olive oil',
      strIngredient3: 'garlic',
      strIngredient4: 'chopped tomatoes',
      strIngredient5: 'red chile flakes',
      strIngredient6: 'italian seasoning',
      strIngredient7: 'basil',
      strIngredient8: 'Parmigiano-Reggiano',
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    },
  ];
  const INITIAL_STATE = {
    meals: [],
    drinks: [],
    recipe: [],
    favoriteRecipes: [],
  };
  afterEach(() => {
    window.localStorage.clear();
  });

  test('Verificar se os elementos estão na tela de comidas', async () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/meals/52891'] },
    );
    const rPhoto = screen.getByTestId('recipe-photo');
    const rTitle = screen.getByTestId('recipe-title');
    const rCategory = screen.getByTestId('recipe-category');
    const rInstructions = screen.getByTestId('instructions');
    const srbtn = screen.getByTestId(startRecipe);
    const sbtn = screen.getByTestId('share-btn');
    const fbtn = screen.getByTestId('favorite-btn');

    await waitFor(() => {
      expect(rPhoto).toBeInTheDocument();
      expect(rTitle).toBeInTheDocument();
      expect(rTitle.textContent).toBe('');
      expect(rCategory).toBeInTheDocument();
      expect(rCategory.textContent).toBe('');
      expect(rInstructions).toBeInTheDocument();
      expect(srbtn).toBeInTheDocument();
      expect(srbtn).not.toBeDisabled();
      expect(sbtn).toBeInTheDocument();
      expect(sbtn).not.toBeDisabled();
      expect(fbtn).toBeInTheDocument();
      expect(fbtn).not.toBeDisabled();
    });
  });
  test('', () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/drinks/52891'] },
    );

    const srbtn = screen.getByTestId(startRecipe);

    userEvent.click(srbtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/drinks/52891/in-progress');
  });
  test('', () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/drinks/52977'] },
    );

    const srbtn = screen.getByTestId(startRecipe);

    userEvent.click(srbtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/drinks/52977/in-progress');
  });
  test('', async () => {
    window.localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    INITIAL_STATE.favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    renderWithRouter(
      <RecipesDetails />,
      {
        initialEntries: ['/meal/52771'],
        initialState: { recipes: INITIAL_STATE },
      },
    );
    expect(localStorage
      .getItem('favoriteRecipes')).toEqual(JSON.stringify(favoriteRecipes));
    // screen.getByRole('img', { name: /spicy arrabiata penne/i });
    // expect(screen.getByTestId('0-horizontal-favorite-btn')).toBeInTheDocument();
  });
  /* /await waitFor(() => expect(screen.getByTestId('recipe-title')).toBeInTheDocument());

    const ingredient1 = await screen.findByTestId('0-ingredient-name-and-measure');
    const ingredient2 = await screen.findByTestId('1-ingredient-name-and-measure');
    const ingredient3 = await screen.findByTestId('2-ingredient-name-and-measure');
    const ingredient4 = await screen.findByTestId('3-ingredient-name-and-measure');
    const ingredient5 = await screen.findByTestId('4-ingredient-name-and-measure');
    const ingredient6 = await screen.findByTestId('5-ingredient-name-and-measure');
    const ingredient7 = await screen.findByTestId('6-ingredient-name-and-measure');

    expect(ingredient1).toBeInTheDocument();
    expect(ingredient2).toBeInTheDocument();
    expect(ingredient3).toBeInTheDocument();
    expect(ingredient4).toBeInTheDocument();
    expect(ingredient5).toBeInTheDocument();
    expect(ingredient6).toBeInTheDocument();
    expect(ingredient7).toBeInTheDocument();
  }); / */
  test('Se a receita já foi feita, o botão de start recipe não aparece', async () => {
    jest.spyOn(Storage.prototype, 'getItem')
      .mockReturnValueOnce(JSON.stringify([{ id: '52956' }]))
      .mockReturnValueOnce(JSON.stringify({ meals: { 52956: 'fff' } }));
    renderWithRouter(<App />, { initialEntries: ['/meals/52956'] });
    const startRecipeBtn = screen.queryByTestId(startRecipe);
    expect(startRecipeBtn).not.toBeNull();
  });
  test('Se a receita já foi iniciada, o botão deve conter Continue Recipe', () => {
    jest.spyOn(Storage.prototype, 'getItem')
      .mockReturnValueOnce(JSON.stringify(null))
      .mockReturnValueOnce(JSON.stringify({ meals: { 52956: 'fff' } }))
      .mockReturnValueOnce(JSON.stringify([{ id: '52956' }]));
    renderWithRouter(<App />, { initialEntries: ['/meals/52956'] });
    const continueRecipeBtn = screen.getByTestId(startRecipe);
    expect(continueRecipeBtn).toHaveTextContent('Start Recipe');
    const favoriteBtn = screen.getByTestId('favorite-btn');
    expect(favoriteBtn).not.toHaveAttribute('src');
  });
});
