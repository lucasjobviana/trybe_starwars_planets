import React, { useContext } from 'react';
import starWarsPlanetsContext from '../context/starWarsPlanetsContext';

function Filter({ type, testId, handle }) {
  const { filterPlanets } = useContext(starWarsPlanetsContext);

  const handleFilterChange = ({ target }) => {
    console.log(target.value);
    alert('');
    filterPlanets(target.value);
  };

  return (
    <div>
      Filter

      <input
        type={ type }
        data-testid={ testId }
        placeholder="Filter Name"
        onChange={ (element) => { handle(element); } }
      />

    </div>
  );
}

export default Filter;
