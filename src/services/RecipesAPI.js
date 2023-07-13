export async function getMealRecipes() {
  const MAX_MEALS = 12;
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  return data.meals.slice(0, MAX_MEALS);
}
export async function getDrinkRecipes() {
  const MAX_DRINKS = 12;
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  console.log(data);
  return data.drinks.slice(0, MAX_DRINKS);
}
export async function getMealCategories() {
  const MAX_MEAL_CATEGORIES = 5;
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    const categories = data.meals.map((category) => category.strCategory);
    return categories.slice(0, MAX_MEAL_CATEGORIES);
  } catch (error) {
    console.error('Error fetching meal categories:', error);
    return [];
  }
}
export async function getDrinkCategories() {
  const MAX_DRINKS_CATEGORIES = 5;
  try {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    const categories = data.drinks.map((category) => category.strCategory);
    return categories.slice(0, MAX_DRINKS_CATEGORIES);
  } catch (error) {
    console.error('Error fetching drink categories:', error);
    return [];
  }
}
export async function getMealRecipesByCategory(category) {
  const MAX_MEALS_RECIPES = 12;
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const data = await response.json();
    return data.meals.slice(0, MAX_MEALS_RECIPES);
  } catch (error) {
    console.error('Error fetching meal recipes by category:', error);
    return [];
  }
}
export async function getDrinkRecipesByCategory(category) {
  const MAX_DRINKS_RECIPES = 12;
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
    const data = await response.json();
    return data.drinks.slice(0, MAX_DRINKS_RECIPES);
  } catch (error) {
    console.error('Error fetching drink recipes by category:', error);
    return [];
  }
}
export async function getMealRecipeById(id) {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    return data.meals[0];
  } catch (error) {
    console.error('Error fetching meal recipe by ID:', error);
    return null;
  }
}
export async function getDrinkRecipeById(id) {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    return data.drinks[0];
  } catch (error) {
    console.error('Error fetching drink recipe by ID:', error);
    return null;
  }
}