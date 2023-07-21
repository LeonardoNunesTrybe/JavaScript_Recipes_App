import { screen, waitFor } from '@testing-library/react';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';
import fetch from '../../cypress/mocks/fetch';

describe('1. Verifica se as primeiras receitas sao renderizadas nas paginas', () => {
  test('1.1.Testa se o app renderiza as receitas existentes', async () => {
    global.fetch = fetch;

    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    await waitFor(() => {
      const drink1 = screen.getByText('GG');
      expect(drink1).toBeInTheDocument();
    });
  });
  test('1.2.Testa se o app renderiza as receitas existentes', async () => {
    global.fetch = fetch;

    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    await waitFor(() => {
      const meal1 = screen.getByText('Corba');
      expect(meal1).toBeInTheDocument();
    });
  });
});
describe('Verifica se os filtros são renderizados na página', () => {
  test('Testa se o filtro All aparece na página de Meals', async () => {
    global.fetch = fetch;

    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const allFilter = screen.getByTestId('All-category-filter');
    await waitFor(() => {
      expect(allFilter).toBeInTheDocument();
    });
  });
  test('Testa se o filtro All aparece na página de Drinks', async () => {
    global.fetch = fetch;

    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    const allFilter = screen.getByTestId('All-category-filter');
    await waitFor(() => {
      expect(allFilter).toBeInTheDocument();
    });
  });
});

describe('Verificar se os elementos estão na tela de comidas', () => {
  test('', async () => {
    global.fetch = fetch;

    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const beefBtn = await screen.findByTestId('Beef-category-filter');
    expect(beefBtn).toBeInTheDocument();
  });
  // test('', async () => {
  //   global.fetch = fetch;

  //   renderWithRouter(<App />, { initialEntries: ['/drinks'] });

  //   const ordinaryBtn = await screen.findByTestId('Ordinary Drink-category-filter');
  //   expect(ordinaryBtn).toBeInTheDocument();
  // });
  // test('Verificar se os elementos estão na tela de comidas', () => {
  //   renderWithRouter(
  //     <RecipesProvider>
  //       <App />
  //     </RecipesProvider>,
  //     { initialEntries: ['/meals'] },
  //   );
  //   const allCategoryBtn = screen.getByTestId('All-category-filter');
  //   const beefBtn = screen.getByTestId('Beef-category-filter');
  //   const breakfastBtn = screen.getByTestId('Breakfast-category-filter');
  //   const chickenBtn = screen.getByTestId('Chicken-category-filter');
  //   const dessertBtn = screen.getByTestId('Dessert-category-filter');
  //   const goat = screen.getByTestId('Goat-category-filter');

  //   expect(allCategoryBtn).toBeInTheDocument();
  //   expect(beefBtn).toBeInTheDocument();
  //   expect(breakfastBtn).toBeInTheDocument();
  //   expect(chickenBtn).toBeInTheDocument();
  //   expect(dessertBtn).toBeInTheDocument();
  //   expect(goat).toBeInTheDocument();
  // });
  // test('Verificar se os elementos estão na tela de bebidas', () => {
  //   renderWithRouter(
  //     <RecipesProvider>
  //       <App />
  //     </RecipesProvider>,
  //     { initialEntries: ['/drinks'] },
  //   );
  //   const allCategoryBtn = screen.getByTestId('All-category-filter');
  //   const ordinaryBtn = screen.getByTestId('Ordinary Drink-category-filter');
  //   const cocktailBtn = screen.getByTestId('Cocktail-category-filter');
  //   const shakeBtn = screen.getByTestId('Shake-category-filter');
  //   const otherBtn = screen.getByTestId('Other / Unknown-category-filter');
  //   const cocoaBtn = screen.getByTestId('Cocoa-category-filter');

  //   expect(allCategoryBtn).toBeInTheDocument();
  //   expect(ordinaryBtn).toBeInTheDocument();
  //   expect(cocktailBtn).toBeInTheDocument();
  //   expect(shakeBtn).toBeInTheDocument();
  //   expect(otherBtn).toBeInTheDocument();
  //   expect(cocoaBtn).toBeInTheDocument();
  // });
});
