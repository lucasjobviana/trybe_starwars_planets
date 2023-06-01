import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import starWarsPlanetsContext from '../context/starWarsPlanetsContext';

function Filter({ type, id }) {
  const { addFilter, filter: { name,
    columnFilters } } = useContext(starWarsPlanetsContext);
  const indexActual = columnFilters.length;

  return (
    <div>
      <input
        type={ type }
        value={ type === 'text' ? name : columnFilters[indexActual - 1].value.toString() }
        data-testid={ `${id}-filter` }
        placeholder={ `Filter ${id}` }
        onChange={ ({ target }) => addFilter({
          name: `FILTER_${id.toUpperCase()}`,
          propertyValue: target.value,
        }) }
      />
    </div>
  );
}

Filter.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
}.isRequired;

export default Filter;
