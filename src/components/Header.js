import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header({ haveBar, title }) {
  const [searchBar, setSearchBar] = useState(false);

  const showBar = () => (searchBar === false ? setSearchBar(true) : setSearchBar(false));

  return (
    <div>
      <Link to="/profile">
        <img src={ profileIcon } alt="profileIcon" data-testid="profile-top-btn" />
      </Link>

      { haveBar && (
        <label htmlFor="search">
          <input
            type="image"
            src={ searchIcon }
            alt="searchIcon"
            data-testid="search-top-btn"
            id="search"
            onClick={ showBar }
          />
        </label>
      )}

      <h1 data-testid="page-title">{ title }</h1>
      {
        searchBar && (
          <input type="text" data-testid="search-input" />
        )
      }

    </div>
  );
}

Header.propTypes = {
  haveBar: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
