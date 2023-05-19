import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AutocompleteInput from './AutocompleteInput';

describe('AutocompleteInput', () => {
  const options = [
    { name: 'Apple' },
    { name: 'Banana' },
    { name: 'Cherry' },
    { name: 'Durian' },
    { name: 'plum' },
    { name: 'strawberry' },
    { name: 'orange' },
    { name: 'Rubrab' }
  ];

  test('renders input element', () => {
    render(<AutocompleteInput options={options} />);
    const inputElement = screen.getByPlaceholderText('Type here...');
    expect(inputElement).toBeInTheDocument();
  });

  test('shows options on input focus', () => {
    render(<AutocompleteInput options={options} />);
    const inputElement = screen.getByPlaceholderText('Type here...');
    userEvent.click(inputElement);
    const dropdownElement = screen.getByRole('listbox');
    expect(dropdownElement).toBeInTheDocument();
  });

  test('filters options based on input value', () => {
    render(<AutocompleteInput options={options} />);
    const inputElement = screen.getByPlaceholderText('Type here...');
    userEvent.click(inputElement);
    userEvent.type(inputElement, 'a');
    const dropdownElement = screen.getByRole('listbox');
    const appleOption = screen.getByText('Apple');
    const bananaOption = screen.getByText('Banana');
    expect(dropdownElement).toBeInTheDocument();
    expect(appleOption).toBeInTheDocument();
    expect(bananaOption).toBeInTheDocument();
  });

  test('selects option on click', () => {
    render(<AutocompleteInput options={options} />);
    const inputElement = screen.getByPlaceholderText('Type here...');
    userEvent.click(inputElement);
    userEvent.type(inputElement, 'ap');
    const appleOption = screen.getByText('Apple');
    userEvent.click(appleOption);
    expect(inputElement.value).toBe('Apple');
  });
  
  test('selects option on enter key press', () => {
    render(<AutocompleteInput options={options} />);
    const inputElement = screen.getByPlaceholderText('Type here...');
    userEvent.click(inputElement);
    userEvent.type(inputElement, 'ch');
    userEvent.keyboard('[arrowdown]') 
    userEvent.type(inputElement, '{enter}');
    console.log('--------------',inputElement)

    expect(inputElement.value).toBe('Cherry');
  });
  
  test('navigates options using arrow keys', () => {
    const { getByPlaceholderText, getByRole } = render(
      <AutocompleteInput options={options} />
    );

    const input = getByPlaceholderText('Type here...');
    userEvent.click(input);
    userEvent.type(input, 'a');

    userEvent.keyboard('{ArrowDown}');
    expect(getByRole('option', { name: 'Apple' })).toHaveClass('selected');

    userEvent.keyboard('{ArrowDown}');
    expect(getByRole('option', { name: 'Banana' })).toHaveClass('selected');

    userEvent.keyboard('{ArrowUp}');
    expect(getByRole('option', { name: 'Apple' })).toHaveClass('selected');
  });

  test('closes dropdown when clicked outside', () => {
    render(<AutocompleteInput options={options} />);
    const inputElement = screen.getByPlaceholderText('Type here...');
    userEvent.click(inputElement);
    const dropdownElement = screen.getByRole('listbox');
    fireEvent.mouseDown(document.body);

    expect(dropdownElement).not.toBeInTheDocument();
  });
});
