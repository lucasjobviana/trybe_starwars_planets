import React, { useContext } from 'react';
import starWarsPlanetsContext from '../context/starWarsPlanetsContext';

function Filter({ type, id }) {
  const { addFilter, value, name } = useContext(starWarsPlanetsContext);

  return (
    <div>
      <input
        type={ type }
        value={ type === 'text' ? name : value.toString() }
        data-testid={ `${id}-filter` }
        placeholder={ `Filter ${id}` }
        onChange={ ({ target: { value } }) => addFilter({
          name: `FILTER_${id.toUpperCase()}`,
          propertyValue: value,
        }) }
      />
    </div>
  );
}

export default Filter;
