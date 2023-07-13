import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import RecipesContext from '../context/RecipesConext';

function SearchBar() {
  const { searchText, setRecipes,
    module, setmodule, resultsRecipes, setResultsRecipes } = useContext(RecipesContext);

  const firstLetter = 'first-letter';
  const location = useLocation();
  const { pathname } = location;
  const history = useHistory();

  const searchAPIMeals = async () => {
    if (searchText.length > 1 && module === firstLetter) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      switch (module) {
      case 'ingredients':
        await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchText}`)
          .then((response) => response.json())
          .then((data) => {
            setRecipes(data.meals);
            const MAX_MEALS = 12;
            setResultsRecipes(data.meals.slice(0, MAX_MEALS));
          });
        break;
      case 'name':
        await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
          .then((response) => response.json())
          .then((data) => {
            setRecipes(data.meals);
            if (data.meals.length === 1) {
              history.push(`/meals/${data.meals[0].idMeal}`);
            }
          });
        break;
      case firstLetter:
        await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchText}`)
          .then((response) => response.json())
          .then((data) => {
            setRecipes(data.meals);
            const MAX_MEALS = 12;
            setResultsRecipes(data.meals.slice(0, MAX_MEALS));
          });
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
          .then((data) => {
            setRecipes(data.drinks);
            const MAX_MEALS = 12;
            setResultsRecipes(data.drinks.slice(0, MAX_MEALS));
          });
        break;
      case 'name':
        await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`)
          .then((response) => response.json())
          .then((data) => {
            setRecipes(data.drinks);
            if (data.drinks.length === 1) {
              history.push(`/drinks/${data.drinks[0].idDrink}`);
            }
          });
        break;
      case firstLetter:
        await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchText}`)
          .then((response) => response.json())
          .then((data) => {
            setRecipes(data.drinks);
            const MAX_MEALS = 12;
            setResultsRecipes(data.drinks.slice(0, MAX_MEALS));
          });
        break;
      default:
        break;
      }
    }
  };
  // Beef Lo Mein
  const handleClick = () => {
    switch (pathname) {
    case '/meals':
      searchAPIMeals();
      break;
      // Aquamarine
    case '/drinks':
      console.log('bebida');
      searchAPIDrinks();
      break;
    default:
      break;
    }
  };

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
      {/* <div>
        {
          window.location.pathname === '/meals'
            ? resultsRecipes.map((result, index) => (
              <div
                key={ result.idMeal }
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  src={ `${result.strMealThumb}` }
                  alt={ `${result.strMeal}` }
                  data-testid={ `${index}-card-img` }
                />
                <p data-testid={ `${index}-card-name` }>
                  {result.strMeal}
                </p>
              </div>
            ))
            : resultsRecipes.map((result, index) => (
              <div
                key={ result.idDrink }
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  src={ `${result.strDrinkThumb}` }
                  alt={ `${result.strDrinkl}` }
                  data-testid={ `${index}-card-img` }
                />
                <p data-testid={ `${index}-card-name` }>
                  {result.strDrink}
                </p>
              </div>
            ))
        }

      </div> */}
    </div>
  );
}

export default SearchBar;
