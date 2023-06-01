import React, { useContext } from 'react';
import starWarsPlanetsContext from '../context/starWarsPlanetsContext';

function FilterByProperties({ properties, id }) {
  const { addFilter } = useContext(starWarsPlanetsContext);
  const propertiesOptions = properties;

  return (
    <div>
      FilterByProperties
      <select
        name={ id }
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

export default FilterByProperties;