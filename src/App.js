import React, { useState, useEffect } from 'react';
import { fetchAPI } from './tools/api';// import { results } from './mocks/results';
import './App.css';
import Table from './components/Table';
import starWarsPlanetsContext from './context/starWarsPlanetsContext';
import Filter from './components/Filter';
import FilterByProperties from './components/FilterByProperties';

const propertiesColumns = [
  'population', 'orbital_period', 'diameter',
  'rotation_period', 'surface_water',
];
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
    switch (name) { // REMOVE_ALL_FILTERS
    case 'REMOVE_ALL_FILTERS': {
      setFilter({
        ...filter,
        columnsFiltered: [],
        columnFilters: [{ column: 'population', comparison: 'maior que', value: 0 }],
        action: 'add',
      }); break;
    }
    case 'DELETE_FILTER': {
      filter.columnsFiltered.splice(filter.columnsFiltered.indexOf(propertyValue), 1);
      const c = cpColumnsFilters.filter((f) => f.column !== propertyValue);
      const cpColumnsFiltered = [...filter.columnsFiltered];

      setFilter({
        ...filter, columnsFiltered: cpColumnsFiltered, columnFilters: c, action: 'rmv',
      }); break;
    }
    case 'FILTER_NAME': { setFilter({ ...filter, name: propertyValue }); break; }
    case 'FILTER_COLUMN': {
      cpColumnsFilters[actualIndex] = {
        ...filter.columnFilters[actualIndex], column: propertyValue,
      };
      setFilter({ ...filter, columnFilters: cpColumnsFilters }); break;
    }
    case 'FILTER_COMPARISON': {
      cpColumnsFilters[actualIndex] = {
        ...filter.columnFilters[actualIndex], comparison: propertyValue,
      };
      setFilter({ ...filter, columnFilters: cpColumnsFilters }); break;
    }
    case 'FILTER_VALUE': {
      cpColumnsFilters[actualIndex] = {
        ...filter.columnFilters[actualIndex], value: propertyValue,
      };
      setFilter({ ...filter, columnFilters: cpColumnsFilters }); break;
    }
    case 'FILTER_BY_COLUMN': {
      setFilter({ ...filter,
        filterByColumn: propertyValue,
        columnsFiltered: [
          ...filter.columnsFiltered, filter.columnFilters[actualIndex].column,
        ],
        action: 'add',
      }); break;
    } default:
    }
  };

  useEffect(() => {
    getPlanets(setPlanets);
  }, []);

  useEffect(() => {
    if (filter.columnsFiltered.length > 0) {
      console.log('maior que 0');
      console.log(filter.columnsFiltered);
      const a = propertiesColumns.reduce((propsFiltered, property) => {
        if (!filter.columnsFiltered.some((cF) => cF === property)) {
          propsFiltered.push(property);
        }
        return propsFiltered;
      }, []);
      console.log('vou setar [0] para ');
      if (filter.action === 'add') {
        setFilter({
          ...filter,
          columnFilters: [
            ...filter.columnFilters,
            {
              column: a[0],
              comparison: 'maior que',
              value: 0,
            },
          ],
        });
      }
      if (filter.action === 'rmv') {
        filter.columnFilters.pop();
        setFilter({
          ...filter,
          columnFilters: filter.columnFilters,
        });
        setFilter({
          ...filter,
          columnFilters: [
            ...filter.columnFilters,
            {
              column: a[0],
              comparison: 'maior que',
              value: 0,
            },
          ],
        });
      }
    }
  }, [filter.columnsFiltered]);

  let filtersElements = '';

  if (filter.columnsFiltered.length > 0) {
    filtersElements = filter.columnsFiltered.map((column, index) => (
      <div key={ column } data-testid="filter">

        <button
          key={ `${column}${index}` }
          name={ column }
          onClick={ () => {
            addFilter({
              name: 'DELETE_FILTER',
              propertyValue: column,
            });
          } }
        >
          {column}
          {' '}
          x
        </button>
      </div>

    ));
  }

  return (
    <starWarsPlanetsContext.Provider value={ { planets, filter, addFilter } }>
      <div className="App">
        <div id="filtersList">
          {filtersElements}
          <button
            data-testid="button-remove-filters"
            onClick={ () => {
              addFilter({ name: 'REMOVE_ALL_FILTERS', propertyValue: '' });
            } }
          >
            Remove All Filters
          </button>
        </div>

        <Filter type="text" id="name" />
        <FilterByProperties
          properties={ [
            'population', 'orbital_period', 'diameter',
            'rotation_period', 'surface_water',
          ] }
          id="column"
        />
        <FilterByProperties
          properties={ ['maior que', 'menor que', 'igual a'] }
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
        <Table />
      </div>
    </starWarsPlanetsContext.Provider>
  );
}

export default App;
