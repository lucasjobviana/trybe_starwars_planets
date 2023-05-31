import React, { useContext } from 'react';
import starWarsPlanetsContext from '../context/starWarsPlanetsContext';

function Filter() {
  const { filterName, filterPlanets } = useContext(starWarsPlanetsContext);

  const handleFilterChange = ({ target }) => {
    // console.log(target.value);
    console.log(filterName);
    filterPlanets(target.value);
  };

  return (
    <div>
      Filter

      <input
        type="text"
        data-testid="name-filter"
        placeholder="Filter Name"
        onChange={ (element) => { handleFilterChange(element); } }
      />

    </div>
  );
}

export default Filter;
