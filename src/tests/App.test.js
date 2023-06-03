import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Testando a aplicação', () => {
  it('I am your test', () => {
    render(<App />);

    screen.getByText('Column:');
    screen.getByText('Comparison:');
    screen.getByText('Order by:');
    screen.getByText('Remove All Filters');
    screen.getByPlaceholderText('Filter name');
    screen.getByPlaceholderText('Filter value');
    screen.getByTestId('comparison-filter');
    screen.getByTestId('column-filter');
    screen.getByTestId('value-filter');
    screen.getByTestId('column-sort');
    screen.getByTestId('column-sort-input-asc');
    screen.getByTestId('column-sort-input-desc');
    screen.getByTestId('column-sort-button');
    screen.getByTestId('button-filter');


  });
});

