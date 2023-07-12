import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesConext';

function SearchBar() {
  const { searchText, recipes, setRecipes,
    module, setmodule } = useContext(RecipesContext);

  const firstLetter = 'first-letter';
  // const { pathname } = location;
  const history = useHistory();

  const searchAPIMeals = async () => {
    if (searchText.length > 1 && module === firstLetter) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      switch (module) {
      case 'ingredients':
        await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchText}`)
          .then((response) => response.json())
          .then((data) => setRecipes(data.meals));
        break;
      case 'name':
        await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
          .then((response) => response.json())
          .then((data) => setRecipes(data.meals));
        break;
      case firstLetter:
        await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchText}`)
          .then((response) => response.json())
          .then((data) => setRecipes(data.meals));
        break;

      default:
        break;
      }
    }
  };

  const searchAPIDrinks = async () => {
    if (searchText.length > 1 && module === 'first-letter') {
      global.alert('Your search must have only 1 (one) character');
    } else {
      switch (module) {
      case 'ingredients':
        await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchText}`)
          .then((response) => response.json())
          .then((data) => setRecipes(data.drinks));
        break;
      case 'name':
        await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`)
          .then((response) => response.json())
          .then((data) => setRecipes(data.drinks));
        break;
      case firstLetter:
        await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchText}`)
          .then((response) => response.json())
          .then((data) => setRecipes(data.drinks));
        break;

      default:
        break;
      }
    }
  };
  const handleClick = () => {
    switch (pathname) {
    case '/meals':
      searchAPIMeals();
      if (recipes.length === 1) {
        history(`/meals/${recipes.id}`);
      }
      break;
    case '/drinks':
      searchAPIDrinks();
      break;
    default:
      break;
    }
  };

  // const redirectToDetailsPage = () => {
  //   if (searchAPIMeals === 1 && pathname === '/meals') {
  //     <Link to="/meals/:id-da-receita"></Link>
  //   }
  // }

  return (
    <div>
      <input
        type="radio"
        name="search-radio"
        id="ingredients"
        value="ingredients"
        checked={ module === 'ingredients' }
        onChange={ ({ target }) => setmodule(target.value) }
        data-testid="ingredient-search-radio"
      />
      <label htmlFor="ingredients">Ingredients</label>
      <input
        type="radio"
        name="search-radio"
        id="name"
        value="name"
        checked={ module === 'name' }
        onChange={ ({ target }) => setmodule(target.value) }
        data-testid="name-search-radio"
      />
      <label htmlFor="name">Name</label>
      <input
        type="radio"
        name="search-radio"
        id="first-letter"
        value="first-letter"
        checked={ module === firstLetter }
        onChange={ ({ target }) => setmodule(target.value) }
        data-testid="first-letter-search-radio"
      />
      <label htmlFor="first-letter">First letter</label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        SEARCH
      </button>

    </div>
  );
}

export default SearchBar;
