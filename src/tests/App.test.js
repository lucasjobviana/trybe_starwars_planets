import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import App from '../App';
import { data } from './mocks/';
import userEvent from '@testing-library/user-event';

describe('Testando a aplicação', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(data)
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Verifica se o fetch é feito para o endpoint correto, se obtem o resultado esperado e se o resultado é renderizado na tela.', async () => {
    render(<App />);

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://swapi.dev/api/planets');

    await waitFor(() => {
      expect(screen.getByText('Tatooine')).toBeInTheDocument()
        , 2500
    });
  });

  it('Verifica se o filtro por nome esta funcionando.', async () => {
    render(<App />);

    const firstPlanetName = data.results[0].name;
    const inputFilterName = screen.getByTestId('name-filter');

    await waitFor(() => {
      expect(screen.getByText('Tatooine')).toBeInTheDocument()
        , 2500
    });

    const firstTableRowColumn = screen.getAllByTestId('planet-name')[0];
    expect(firstTableRowColumn.textContent).toBe(firstPlanetName);

    userEvent.type(inputFilterName, 'r');
    expect(firstTableRowColumn).not.toBe(firstPlanetName)
    expect(screen.getAllByTestId('planet-name')[0].textContent).toBe(data.results[1].name)
  });

  it('Verifica se o filtro por colunas esta funcionando.', async () => {
    render(<App />);

    const firstPlanetName = data.results[0].name;
    const buttonFilter = screen.getByTestId('button-filter');
    const inputValue = screen.getByTestId('value-filter');
    const selectColumn = screen.getByTestId('column-filter');
    const selectComparison = screen.getByTestId('comparison-filter');

    await waitFor(() => {
      expect(screen.getByText('Tatooine')).toBeInTheDocument()
        , 2500
    });

    const firstTableRowColumn = screen.getAllByTestId('planet-name')[0];
    expect(firstTableRowColumn.textContent).toBe(firstPlanetName);

    userEvent.type(inputValue, "200001");
    userEvent.click(buttonFilter);
    expect(screen.getAllByTestId('planet-name')[0].textContent).toBe('Alderaan');
    const filters = screen.getAllByTestId('filter');
    expect(filters[0]).toBeInTheDocument();
    expect(filters.length).toBe(1);

    userEvent.selectOptions(selectColumn, 'diameter')
    userEvent.selectOptions(selectComparison, 'menor que')
    userEvent.type(inputValue, "12499");
    userEvent.click(buttonFilter)
    expect(screen.getAllByTestId('planet-name')[0].textContent).toBe('Endor');

    const btnClearFilter = screen.getByRole('button', {
      name: /diameter x/i
    })
    userEvent.click(btnClearFilter)
    expect(screen.getAllByTestId('planet-name')[0].textContent).toBe('Alderaan')

    const columnSortDesc = screen.getByTestId('column-sort-input-desc');
    userEvent.click(columnSortDesc)
    userEvent.click(screen.getByTestId('column-sort-button'))
    expect(screen.getAllByTestId('planet-name')[0].textContent).toBe('Coruscant')

    const columnSortAsc = screen.getByTestId('column-sort-input-asc');
    userEvent.click(columnSortAsc)
    userEvent.click(screen.getByTestId('column-sort-button'))
    expect(screen.getAllByTestId('planet-name')[0].textContent).toBe('Bespin')
  });

  it('Verifica se o botão de limpar todos os filtros esta funcionando.', async () => {
    render(<App />);

    const firstPlanetName = data.results[0].name;
    const buttonFilter = screen.getByTestId('button-filter');
    const buttonRemoveAll = screen.getByTestId('button-remove-filters');
    const inputValue = screen.getByTestId('value-filter');
    const selectColumn = screen.getByTestId('column-filter');
    const selectComparison = screen.getByTestId('comparison-filter');

    await waitFor(() => {
      expect(screen.getByText('Tatooine')).toBeInTheDocument()
        , 2500
    });

    const tableRowColumn = screen.getAllByTestId('planet-name');
    expect(tableRowColumn[0].textContent).toBe(firstPlanetName);


    userEvent.type(inputValue, "200001");
    userEvent.click(buttonFilter)
    userEvent.selectOptions(selectColumn, 'diameter')
    userEvent.selectOptions(selectComparison, 'menor que')
    userEvent.type(inputValue, "12499");
    userEvent.click(buttonFilter)
    userEvent.click(buttonRemoveAll)
    expect(screen.getAllByTestId('planet-name')[0].textContent).toBe(firstPlanetName);


    userEvent.type(inputValue, "18");
    userEvent.selectOptions(selectColumn, 'rotation_period')
    userEvent.selectOptions(selectComparison, 'igual a')
    userEvent.click(buttonFilter)
    expect(screen.getAllByTestId('planet-name')[0].textContent).toBe('Endor');

  });
  
  it('Verifica se o botão Order esta funcionando.', async () => {
    render(<App />);

    const firstPlanetName = data.results[0].name;
    const inputFilterName = screen.getByTestId('name-filter');

    await waitFor(() => {
      expect(screen.getByText('Tatooine')).toBeInTheDocument()
        , 2500
    });

    const firstTableRowColumn = screen.getAllByTestId('planet-name')[0];
    expect(firstTableRowColumn.textContent).toBe(firstPlanetName);
    
  
    userEvent.click(screen.getByTestId('column-sort-input-asc'));
    userEvent.click(screen.getByTestId('column-sort-button'));
     
    expect(screen.getAllByTestId('planet-name')[0].textContent).toBe('Yavin IV')
    
    userEvent.type(screen.getByTestId('value-filter'),"2000000001");//screen.getByTestId('value-filter')
    userEvent.click(screen.getByTestId('button-filter'));
    
    expect(screen.getAllByTestId('planet-name')[0].textContent).toBe('Naboo')
  });
});
