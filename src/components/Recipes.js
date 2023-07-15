import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  getMealRecipes,
  getDrinkRecipes,
  getMealCategories,
  getDrinkCategories,
  getMealRecipesByCategory,
  getDrinkRecipesByCategory,
} from '../services/RecipesAPI';
import RecipesContext from '../context/RecipesConext';

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isFilterActive, setIsFilterActive] = useState(false);

  const { setResultsRecipes, resultsRecipes } = useContext(RecipesContext);

  const history = useHistory();

  const fetchRecipes = async () => {
    let fetchedRecipes = [];
    let fetchedCategories = [];
    const MAX_FETCHED = 12;
    const MAX_CATEGORIES = 5;
    if (history.location.pathname === '/meals') {
      console.log('teste');
      fetchedRecipes = await getMealRecipes();
      fetchedCategories = await getMealCategories();
    } else if (history.location.pathname === '/drinks') {
      fetchedRecipes = await getDrinkRecipes();
      fetchedCategories = await getDrinkCategories();
    }
    setRecipes(fetchedRecipes.slice(0, MAX_FETCHED));
    // console.log(recipes);
    setResultsRecipes(fetchedRecipes.slice(0, MAX_FETCHED));
    setCategories(fetchedCategories.slice(0, MAX_CATEGORIES));
  };
  useEffect(() => {
    fetchRecipes();
  }, []);
  const handleCategoryFilter = async (category) => {
    if (isFilterActive && category === selectedCategory) {
      fetchRecipes();
      setSelectedCategory('');
      setIsFilterActive(false);
    } else {
      setSelectedCategory(category);
      setIsFilterActive(true);
      let filteredRecipes = [];
      const MAX_RECIPES = 12;
      if (category === 'All') {
        fetchRecipes();
      } else {
        try {
          if (window.location.pathname === '/meals') {
            filteredRecipes = await getMealRecipesByCategory(category);
          } else if (window.location.pathname === '/drinks') {
            filteredRecipes = await getDrinkRecipesByCategory(category);
          }
          setResultsRecipes(filteredRecipes.slice(0, MAX_RECIPES));
        } catch (error) {
          console.log('Error fetching filtered recipes:', error);
        }
      }
    }
  };
  return (
    <div>
      <div>
        <button
          key="All"
          data-testid="All-category-filter"
          onClick={ () => handleCategoryFilter('All') }
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={ category }
            data-testid={ `${category}-category-filter` }
            onClick={ () => handleCategoryFilter(category) }
            className={ isFilterActive && selectedCategory === category ? 'active' : '' }
          >
            {category}
          </button>
        ))}
      </div>
      {resultsRecipes.map((recipe, index) => (
        <Link
          to={
            history.location.pathname === '/meals'
              ? `/meals/${recipe.idMeal}`
              : `/drinks/${recipe.idDrink}`
          }
          key={ index }
          data-testid={ `${index}-recipe-card` }
        >
          <div>
            <img
              src={
                history.location.pathname === '/meals'
                  ? recipe.strMealThumb
                  : recipe.strDrinkThumb
              }
              alt={
                history.location.pathname === '/meals' ? recipe.strMeal : recipe.strDrink
              }
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>
              {history.location.pathname === '/meals' ? recipe.strMeal : recipe.strDrink}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
export default Recipes;
