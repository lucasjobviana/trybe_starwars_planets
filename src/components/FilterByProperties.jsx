// import React, { useState, useContext } from 'react';

function FilterByProperties({ properties, testId }) {
  const propertiesOptions = properties;

  const handleChange = ({ target }) => {
    console.log(target.value);
  };

  return (
    <div>
      FilterByProperties
      <select
        name={ `optionProperty${testId}` }
        onChange={ handleChange }
        data-testid={ testId }
      >
        {
          propertiesOptions.map((property, index) => (
            <option key={ `option${testId}${index}` }>
              {property}
            </option>
          ))
        }
      </select>
    </div>
  );
}

export default FilterByProperties;
