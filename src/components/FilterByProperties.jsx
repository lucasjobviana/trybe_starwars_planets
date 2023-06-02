import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import starWarsPlanetsContext from '../context/starWarsPlanetsContext';

function FilterByProperties({ properties, id }) {
  const { addFilter, filter: {
    columnsFiltered } } = useContext(starWarsPlanetsContext);

  if (columnsFiltered.length > 0 && id === 'column') {
    properties = properties.reduce((propsFiltered, property) => {
      if (!columnsFiltered.some((cF) => cF === property)) {
        propsFiltered.push(property);
      }
      return propsFiltered;
    }, []);
  }

  return (
    <div>
      FilterByProperties
      <select
        name={ id }
        // value={ valueDefault }
        onChange={ ({ target: { value } }) => addFilter({
          name: `FILTER_${id.toUpperCase()}`,
          propertyValue: value }) }
        data-testid={ `${id}-filter` }
      >
        {
          properties.map((property, index) => (
            <option key={ `option${id}${index}` }>
              {property}
            </option>
          ))
        }
      </select>
    </div>
  );
}
FilterByProperties.propTypes = {
  properties: PropTypes.shape({}),
  id: PropTypes.string,
}.isRequired;

export default FilterByProperties;
