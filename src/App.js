import React, { useState, useEffect } from 'react';
import { fetchAPI } from './tools/api';
// import { results } from './mocks/results';
import './App.css';
import Table from './components/Table';
import starWarsPlanetsContext from './context/starWarsPlanetsContext';

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
  console.log(planets);
  setPlanets(planets);
};

function App() {
  const [planets, setPlanets] = useState([{ }]);

  useEffect(() => {
    getPlanets(setPlanets);
  }, []);

  return (
    <starWarsPlanetsContext.Provider
      value={ {
        planets,
      } }
    >
      <div className="App">
        <p>
          { `Hello, App! First planet is ${planets[0].name}` }
        </p>
        <Table />

      </div>
    </starWarsPlanetsContext.Provider>
  );
}

export default App;
