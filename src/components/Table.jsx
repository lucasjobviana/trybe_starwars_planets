import React, { useContext } from 'react';
import starWarsPlanetsContext from '../context/starWarsPlanetsContext';

function Table() {
  // console.log(props);
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

  // console.log(state);
  const { planets } = state;
  // console.log(planets);

  if (planets.length > 1) {
    const { value, column, comparison } = columnFilters[0];
    console.log('$$$$$$____objetos_____$$$$$$');
    console.log(columnFilters[0]);
    console.log(value, column, comparison);
    const planetsFilteredObj = {
      planetsFiltered: [],
    };

    planetsFilteredObj.planetsFiltered = planets.filter((
      planet,
    ) => planet.name.toUpperCase().includes(name.toUpperCase()));

    if (filterByColumn === 'true') {
      const compare = (property) => {
        switch (comparison) {
        case 'maior que': return (property > Number(value));
        case 'menor que': return (property < Number(value));
        case 'igual a': return (property === Number(value));
        default:
        }
      };

      planetsFilteredObj.planetsFiltered = planetsFilteredObj.planetsFiltered.filter(
        (planet) => compare(Number(planet[column])),
      );
      console.log('planetas filtrados');
      console.log(planetsFilteredObj);
    }

    return (
      <div className="table">
        Table
        <table>
          <tr>{tableHeaderRow}</tr>

          {

            planetsFilteredObj.planetsFiltered.map((planet, index) => (
              <tr key={ `row${index}` }>
                <td>{planet.name}</td>
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
