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
    columnFilters: [{ column: 'population', comparison: 'maior que', value: 0 }],
    filterByColumn: 'false',
  });
  const actualIndex = filter.columnFilters.length - 1;

  const addFilter = ({ name, propertyValue }) => {
    const cpColumnsFilters = filter.columnFilters;
    switch (name) {
    case 'FILTER_NAME': { console.log('filterName');
      setFilter({ ...filter, name: propertyValue }); break; }
    case 'FILTER_COLUMN': {
      cpColumnsFilters[actualIndex] = {
        ...filter.columnFilters[actualIndex], column: propertyValue };
      setFilter({
        ...filter,
        columnFilters: cpColumnsFilters,
      }); break; }
    case 'FILTER_COMPARISON': {
      cpColumnsFilters[actualIndex] = {
        ...filter.columnFilters[actualIndex], comparison: propertyValue };
      setFilter({
        ...filter,
        columnFilters: cpColumnsFilters,
      }); break;
    }
    case 'FILTER_VALUE': {
      cpColumnsFilters[actualIndex] = {
        ...filter.columnFilters[actualIndex], value: propertyValue };
      setFilter({
        ...filter,
        columnFilters: cpColumnsFilters,
      }); break;
    }
    case 'FILTER_BY_COLUMN': {
      setFilter({
        ...filter,
        filterByColumn: propertyValue,
        columnFilters: [
          ...filter.columnFilters, {
            column: 'population',
            comparison: 'maior que',
            value: 0,
          },
        ],
      }); break;
    }
    default:
    }
  };

  useEffect(() => {
    getPlanets(setPlanets);
  }, []);

  console.log('________meu_filter__________');
  console.log(filter.columnFilters);

  return (
    <starWarsPlanetsContext.Provider
      value={ {
        planets,
        // filterName: filter.name,
        filter,
        // value: filter.value,
        columnFilters: filter.columnFilters,
        addFilter,
      } }
    >
      <div className="App">
        <p>
          <span>Name:</span>
          {filter.name}
        </p>
        <p>
          Comparison:
          {filter.columnFilters[actualIndex].comparison}
        </p>
        <p>
          Column:
          {filter.columnFilters[actualIndex].column}
        </p>
        <p>
          Value:
          {filter.columnFilters[actualIndex].value}
        </p>
        <p>
          Filter by Column:
          {filter.filterByColumn}
        </p>

        <Filter type="text" id="name" />
        <FilterByProperties
          properties={ [
            'population', 'orbital_period', 'diameter',
            'rotation_period', 'surface_water',
          ] }
          id="column"
          valueDefault={ filter.columnFilters[0].column }
        />
        <FilterByProperties
          properties={ [
            'maior que', 'menor que', 'igual a',
          ] }
          id="comparison"
          valueDefault={ filter.columnFilters[0].comparison }
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
