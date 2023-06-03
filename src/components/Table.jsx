import React, { useContext } from 'react';
import starWarsPlanetsContext from '../context/starWarsPlanetsContext';

function Table() {
  const tableHeaders = [
    'Name', 'Rotation Period', 'Orbited Period', 'Diameter',
    'Climate', 'Gravity', 'Terrain', 'Surface Water',
    'Population', 'Films', 'Created', 'Edited', 'URL',
  ];

  const tableHeaderRow = tableHeaders.map((header, index) => (
    <th key={ `header${index}` }>{header}</th>
  ));

  const state = useContext(starWarsPlanetsContext);
  const { filter: { filterByColumn, name, columnFilters },
  } = state;

  const { planets, order } = state;
  const defineNumber = () => {
    const magicPositive = 9999999999999;
    const magicNegative = -9999999999999;
    if (order.sort === 'ASC') {
      return (magicPositive);
    } return (magicNegative);
  };

  const comparePlanets = (a, b) => {
    const arg1 = a[order.column] === 'unknown' ? defineNumber() : Number(a[order.column]);
    const arg2 = b[order.column] === 'unknown' ? defineNumber() : Number(b[order.column]);
    const magicOne = 1;
    const magicNegativeOne = -1;
    if (arg1 < arg2) {
      console.log(arg1, '<', arg2);
      return order.sort === 'ASC' ? magicNegativeOne : magicOne;
    }
    if (arg1 > arg2) {
      console.log(arg1, '>', arg2);
      return order.sort === 'ASC' ? magicOne : magicNegativeOne;
    }
    console.log(arg1, '=', arg2);
    return 0;
  };
  if (order.abled === true) {
    console.log('abllled ==== true');
    console.log(planets);
    planets.sort(comparePlanets);
    console.log(planets);
  }

  if (planets.length > 1) {
    const planetsFilteredObj = {
      planetsFiltered: [],
    };

    planetsFilteredObj.planetsFiltered = planets.filter((
      planet,
    ) => planet.name.toUpperCase().includes(name.toUpperCase()));

    if (filterByColumn === 'true') {
      const compare = (property, compareWith, operatorComparation) => {
        switch (operatorComparation) {
        case 'maior que': {
          return (property > Number(compareWith));
        }
        case 'menor que': {
          return (property < Number(compareWith));
        }
        case 'igual a': {
          return (property === Number(compareWith));
        }
        default: // { console.log('isDefault', property, compareWith, operatorComparation); }
        }
      };

      const compareForEachFilter = () => {
        // console.log('ds');
        let retorno = [];

        for (let index = 0; index < (columnFilters.length - 1); index += 1) {
          planetsFilteredObj.planetsFiltered = planetsFilteredObj.planetsFiltered.filter(
            (planet) => compare(
              Number(planet[columnFilters[index].column]),
              columnFilters[index].value,
              columnFilters[index].comparison,
            ),
          );
          // console.log(planetsFilteredObj.planetsFiltered);
          retorno = [...retorno, ...planetsFilteredObj.planetsFiltered];
        }

        return retorno;
      };

      compareForEachFilter();
    }

    return (
      <div className="table">
        Table
        <table>
          <tr>{tableHeaderRow}</tr>
          {
            planetsFilteredObj.planetsFiltered.map((planet, index) => (
              <tr key={ `row${index}` }>
                <td data-testid="planet-name">{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
                <td>
                  <ul>
                    {planet.films.map((film, i) => (

                      <li key={ `Film${i}Planet${index}` }>
                        {film}
                      </li>
                    ))}
                  </ul>
                </td>

                <td>{planet.created}</td>
                <td>{planet.edited}</td>
                <td>{planet.url}</td>
                {

                }
              </tr>
            ))
          }
        </table>

      </div>
    );
  }
}

export default Table;
