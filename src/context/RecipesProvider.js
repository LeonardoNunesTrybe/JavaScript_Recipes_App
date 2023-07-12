import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesConext';

function RecipesProvider({ children }) {
  const [search, setSearch] = useState({
    text: '',
    selected: '',
  });
  const [module, setModule] = useState();
  const [recipes, setRecipes] = useState([]);

  const context = useMemo(() => (
    {
      search,
      setSearch,
      module,
      setModule,
      recipes,
      setRecipes,
    }
  ), [search, module, recipes]);

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
