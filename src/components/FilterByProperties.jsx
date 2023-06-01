import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import starWarsPlanetsContext from '../context/starWarsPlanetsContext';

function FilterByProperties({ properties, id, valueDefault }) {
  const { addFilter } = useContext(starWarsPlanetsContext);
  const propertiesOptions = properties;

  return (
    <div>
      FilterByProperties
      <select
        name={ id }
        value={ valueDefault }
        onChange={ ({ target: { value } }) => addFilter({
          name: `FILTER_${id.toUpperCase()}`,
          propertyValue: value }) }
        data-testid={ `${id}-filter` }
      >
        {
          propertiesOptions.map((property, index) => (
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
