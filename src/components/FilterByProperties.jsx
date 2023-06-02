import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import starWarsPlanetsContext from '../context/starWarsPlanetsContext';

function FilterByProperties({ properties, id }) {
  const { addFilter, filter: {
    columnsFiltered } } = useContext(starWarsPlanetsContext);
  let propertiesOptions = properties;
  const newArray = [...properties];
  if (columnsFiltered.length > 0) {
    // console.log(properties, columnsFiltered);
    properties.forEach((property, index) => {
      columnsFiltered.forEach((column) => {
      //  console.log(property, column);
        if (property === column) {
          delete newArray[index];
        }
      });
    });
    propertiesOptions = newArray;
    // console.log(newArray);
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
