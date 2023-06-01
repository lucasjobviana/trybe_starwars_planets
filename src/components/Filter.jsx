import React, { useContext } from 'react';
import starWarsPlanetsContext from '../context/starWarsPlanetsContext';

function Filter({ type, id }) {
  const { addFilter } = useContext(starWarsPlanetsContext);

  return (
    <div>
      Filter

      <input
        type={type}
        data-testid={`${id}-filter`}
        placeholder={`Filter ${id}`}
        onChange={({ target: { name, value } }) => addFilter({ name: `FILTER_${id.toUpperCase()}`, value })}
      />

    </div>
  );
}

export default Filter;
