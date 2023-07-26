import { screen } from '@testing-library/react';
import RecipesProvider from '../context/RecipesProvider';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';

describe('Verificar renderização componente Recipe', () => {
  test('Verificar se os elementos estão na tela de comidas', () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/meals'] },
    );
    const allCategoryBtn = screen.getByTestId('All-category-filter');
    const beefBtn = screen.getByTestId('Beef-category-filter');
    const breakfastBtn = screen.getByTestId('Breakfast-category-filter');
    const chickenBtn = screen.getByTestId('Chicken-category-filter');
    const dessertBtn = screen.getByTestId('Dessert-category-filter');
    const goat = screen.getByTestId('Goat-category-filter');

    expect(allCategoryBtn).toBeInTheDocument();
    expect(beefBtn).toBeInTheDocument();
    expect(breakfastBtn).toBeInTheDocument();
    expect(chickenBtn).toBeInTheDocument();
    expect(dessertBtn).toBeInTheDocument();
    expect(goat).toBeInTheDocument();
  });
  test('Verificar se os elementos estão na tela de bebidas', () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/drinks'] },
    );
    const allCategoryBtn = screen.getByTestId('All-category-filter');
    const ordinaryBtn = screen.getByTestId('Ordinary Drink-category-filter');
    const cocktailBtn = screen.getByTestId('Cocktail-category-filter');
    const shakeBtn = screen.getByTestId('Shake-category-filter');
    const otherBtn = screen.getByTestId('Other / Unknown-category-filter');
    const cocoaBtn = screen.getByTestId('Cocoa-category-filter');

    expect(allCategoryBtn).toBeInTheDocument();
    expect(ordinaryBtn).toBeInTheDocument();
    expect(cocktailBtn).toBeInTheDocument();
    expect(shakeBtn).toBeInTheDocument();
    expect(otherBtn).toBeInTheDocument();
    expect(cocoaBtn).toBeInTheDocument();
  });
});
