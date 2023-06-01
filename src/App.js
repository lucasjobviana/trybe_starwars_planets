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
  const [filterName, setFilterName] = useState('');
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('>');
  const [value, setValue] = useState(0);

  const addFilter = ({ name, propertyValue }) => {
    console.log(name, propertyValue);
    switch (name) {
    case 'FILTER_NAME': setFilterName(propertyValue); break;
    case 'FILTER_COLUMN': setColumn(propertyValue); break;
    case 'FILTER_COMPARISON': setComparison(propertyValue); break;
    case 'FILTER_VALUE': setValue(propertyValue); break;
    default: console.log('errrrrrrror');
    }
  };

  useEffect(() => {
    getPlanets(setPlanets);
  }, []);

  return (
    <starWarsPlanetsContext.Provider
      value={ {
        planets,
        filterName,
        column,
        setColumn,
        value,
        comparison,
        setComparison,
        addFilter,
      } }
    >
      <div className="App">
        <p>{filterName}</p>
        <p>{comparison}</p>
        <p>{column}</p>
        <p>{value}</p>

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
            '>', '<', '=',
          ] }
          id="comparison"
        />
        <Filter type="number" id="value" />
        <button data-testid="button-filter">
          ADD Filter
        </button>

        ;

        <Table />

      </div>
    </starWarsPlanetsContext.Provider>
  );
}

export default App;
