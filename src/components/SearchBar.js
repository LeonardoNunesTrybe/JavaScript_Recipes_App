import React, { useEffect, useState } from 'react';

function SerachBar() {
  const [search, setßearch] = useState({
    text: '',
    selected: '',
  });
  const [module, setModule] = useState();
  const [recipes, setRecipes] = useState([]);

  const { setSearch } = useContext(Context);

  const handleSearch = ({ target }) => {
    setsearch(target.value);
  };

  const handleClick = () => {
    if (selected.module === 'ingredient') {
      fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i={selected.text}')
        .then((response) => response.json())
        .then((data) => setRecipes(data));
    }
    if (selected.module === 'name') {
      fetch('https://www.themealdb.com/api/json/v1/1/search.php?s={selected.text}')
        .then((response) => response.json())
        .then((data) => setRecipes(data));
    }
    if (selected.module === 'first-letter') {
      if (module.length === 1) {
        fetch('https://www.themealdb.com/api/json/v1/1/search.php?f={selected.text}')
          .then((response) => response.json())
          .then((data) => setRecipes(data));
      }
      alert('Your search must have only 1 (one) character');
    }
  };

  return (
    <div>
      <input
        type="text"
        data-testid="search-input"
        onChange={ handleSearch }
        placeholder="Search"
      />
      <input
        type="radio"
        name="search-radio"
        id="ingredients"
        value="ingredients"
        checked={ module === 'ingredients' }
        onChange={ ({ target }) => setModule(target.value) }
        data-testid="ingredient-search-radio"
      />
      <label htmlFor="ingredients">Ingredients</label>
      <input
        type="radio"
        name="search-radio"
        id="name"
        value="name"
        checked={ module === 'name' }
        onChange={ ({ target }) => setModule(target.value) }
        data-testid="name-search-radio"
      />
      <label htmlFor="name">Name</label>
      <input
        type="radio"
        name="search-radio"
        id="first-letter"
        value="first-letter"
        checked={ module === 'first-letter' }
        onChange={ ({ target }) => setModule(target.value) }
        data-testid="first-letter-search-radio"
      />
      <label htmlFor="first-letter">First letter</label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => handleClick() }
      >
        SEARCH
      </button>

    </div>
  );
}

export default SerachBar;
