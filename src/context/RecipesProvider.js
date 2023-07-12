import React from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesConext';

function RecipesProvider({ children }) {
  const context = {}; // tem que existir para passar no teste, caso não esteja usando deixe ele aqui

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
