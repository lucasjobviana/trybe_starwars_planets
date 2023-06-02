import React, { useState, useEffect } from 'react';
import { fetchAPI } from './tools/api';// import { results } from './mocks/results';
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
  setPlanets(planets);
};

function App() {
  const [planets, setPlanets] = useState([{}]);
  const [filter, setFilter] = useState({
    name: '',
    columnsFiltered: [],
    columnFilters: [{ column: 'population', comparison: 'maior que', value: 0 }],
    filterByColumn: 'false',
  });
  const actualIndex = filter.columnFilters.length - 1;

  const addFilter = ({ name, propertyValue }) => {
    const cpColumnsFilters = filter.columnFilters;
    switch (name) {
    case 'DELETE_FILTER': {
      console.log('cheguei aki');
      filter.columnsFiltered.splice(filter.columnsFiltered.indexOf(propertyValue), 1);
      const cpColumnsFiltered = [...filter.columnsFiltered];

      setFilter({
        ...filter,
        columnsFiltered: cpColumnsFiltered,

      }); break; }
    case 'FILTER_NAME': { // console.log('filterName');
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
        columnsFiltered: [
          ...filter.columnsFiltered,
          filter.columnFilters[actualIndex].column,
        ],
        columnFilters: [
          ...filter.columnFilters,
          {
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

  let filtersElements = '';

  if (filter.columnsFiltered.length > 0) {
    filtersElements = filter.columnsFiltered.map((column) => (
      <div key={ column } data-testid="filter">
        {column}
        <button
          name={ column }
          onClick={ () => {
            addFilter({
              name: 'DELETE_FILTER',
              propertyValue: column,
            });
          } }
        >
          x
        </button>
      </div>
    ));
  }

  return (
    <starWarsPlanetsContext.Provider value={ { planets, filter, addFilter } }>
      <div className="App">
        <p>
          <span>Name:</span>
          <span>{filter.name}</span>
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

        {filtersElements}
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
          properties={ ['maior que', 'menor que', 'igual a'] }
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
        <Table />
      </div>
    </starWarsPlanetsContext.Provider>
  );
}

export default App;
