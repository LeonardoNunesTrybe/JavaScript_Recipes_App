import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import RecipesProvider from './context/RecipesProvider';
import Login from './components/Login';
import Meals from './components/Meals';

function App() {
  return (
    <RecipesProvider>
      <BrowserRouter>
        <Switch>
          {/* precisa deixar uma rota com esse caminho habilitada: */}
          <Route exact path="/" component={ Login } />
          {/* precisa deixar uma rota com esse caminho habilitada: */}
          <Route path="/meals" component={ Meals } />
          {/* <Route path="/drinks/:id-da-receita" component={ Drinks } /> */}
          {/* <Route path="/meals/:id-da-receita/in-progress" component={ Login } />
        <Route path="/drinks/:id-da-receita/in-progress" component={ Login } /> */}
          {/* <Route path="/profile" component={ Profile } />
          <Route path="/done-recipes" component={ DoneRecipes } />
          <Route path="/favorite-recipes" component={ FavoriteRecipes } /> */}
        </Switch>
      </BrowserRouter>
    </RecipesProvider>
  );
}

export default App;
