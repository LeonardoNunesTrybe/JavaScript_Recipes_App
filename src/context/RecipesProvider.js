import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesConext';

function RecipesProvider({ children }) {
  const [searchText, setSearchText] = useState('');
  const [module, setmodule] = useState();
  const [recipes, setRecipes] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);

  const context = useMemo(() => (
    {
      searchText,
      setSearchText,
      module,
      setmodule,
      recipes,
      setRecipes,
      allRecipes,
      setAllRecipes,
    }
  ), [searchText, module, recipes]);

  return (
    <RecipesContext.Provider value={ context }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
