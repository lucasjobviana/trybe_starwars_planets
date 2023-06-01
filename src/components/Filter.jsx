import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import starWarsPlanetsContext from '../context/starWarsPlanetsContext';

function Filter({ type, id }) {
  const { addFilter, filter: { name, value } } = useContext(starWarsPlanetsContext);

  return (
    <div>
      <input
        type={ type }
        value={ type === 'text' ? name : value.toString() }
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
