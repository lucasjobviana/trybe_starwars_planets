import React, { useState, useEffect } from 'react';
import { fetchAPI } from './tools/api';
// import { results } from './mocks/results';
import './App.css';
import Table from './components/Table';
import starWarsPlanetsContext from './context/starWarsPlanetsContext';
import Filter from './components/Filter';
import FilterByProperties from './components/FilterByProperties';

const removeResidents = (results) => {
  const cpPlanetsWithoutResidents = [];

  results.forEach((planet, index) => {
    delete planet.residents;
    cpPlanetsWithoutResidents[index] = { ...planet };
  });

  return cpPlanetsWithoutResidents;
};

const getPlanets = async (setPlanets) => {
  const data = await fetchAPI();
  const planets = removeResidents(data.results);
  // console.log(planets);
  setPlanets(planets);
};

function App() {
  const [planets, setPlanets] = useState([{}]);

  const [filter, setFilter] = useState({
    name: '',
    column: 'population',
    comparison: 'maior que',
    value: 0,
    filterByColumn: 'false',
  });

  const addFilter = ({ name, propertyValue }) => {
    console.log(name, propertyValue);
    switch (name) {
    case 'FILTER_NAME': { console.log('filterName');
      setFilter({ ...filter, name: propertyValue }); break; }
    case 'FILTER_COLUMN': { setFilter({ ...filter, column: propertyValue }); break; }
    case 'FILTER_COMPARISON': {
      setFilter({ ...filter, comparison: propertyValue }); break;
    }
    case 'FILTER_VALUE': { setFilter({ ...filter, value: propertyValue }); break; }
    case 'FILTER_BY_COLUMN': { setFilter({
      ...filter, filterByColumn: propertyValue,
    }); break; }
    default:
    }
  };

  useEffect(() => {
    getPlanets(setPlanets);
  }, []);

  return (
    <starWarsPlanetsContext.Provider
      value={ {
        planets,
        filterName: filter.name,
        filter,
        value: filter.value,
        addFilter,
      } }
    >
      <div className="App">
        <p>{filter.name}</p>
        <p>{filter.comparison}</p>
        <p>{filter.column}</p>
        <p>{filter.value}</p>
        <p>{filter.filterByColumn}</p>

        <Filter type="text" id="name" />
        <FilterByProperties
          properties={ [
            'population', 'orbital_period', 'diameter',
            'rotation_period', 'surface_water',
          ] }
          id="column"
        />
        <FilterByProperties
          properties={ [
            'maior que', 'menor que', 'igual a',
          ] }
          id="comparison"
        />
        <Filter type="number" id="value" />

        <button
          data-testid="button-filter"
          onClick={ () => {
            addFilter({ name: 'FILTER_BY_COLUMN', propertyValue: 'true' });
          } }
        >
          ADD Filter
        </button>

        ;

        <Table />

      </div>
    </starWarsPlanetsContext.Provider>
  );
}

export default App;
