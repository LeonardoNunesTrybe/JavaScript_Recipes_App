import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import RecipesProvider from './context/RecipesProvider';

function App() {
  return (
    <RecipesProvider>
      <Switch>
        <Route path="/" component={ Login } />
        {/* <Route path="/meals" component={ Meals } />
        <Route path="/drinks" component={ Drinks } /> */}
        <Route path="/meals/:id-da-receita" component={ Meals } />
        <Route path="/drinks/:id-da-receita" component={ Drinks } />
        {/* <Route path="/meals/:id-da-receita/in-progress" component={ Login } />
        <Route path="/drinks/:id-da-receita/in-progress" component={ Login } /> */}
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </RecipesProvider>
  );
}

export default App;
