import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AutocompleteInput from './AutocompleteInput';

describe('AutocompleteInput', () => {
  const options = ['Apple', 'Banana', 'Cherry', 'Grapes', 'Lemon', 'Orange'];

  test('should render input field', () => {
    const { getByPlaceholderText } = render(
      <AutocompleteInput options={options} />
    );
    const inputElement = getByPlaceholderText('Type here...');
    expect(inputElement).toBeInTheDocument();
  });

  test('should show options when input is focused', () => {
    const { getByPlaceholderText, getAllByRole } = render(
      <AutocompleteInput options={options} />
    );
    const inputElement = getByPlaceholderText('Type here...');

    fireEvent.focus(inputElement);

    const optionElements = getAllByRole('option');
    expect(optionElements.length).toBe(options.length);
  });

  test('should select option on click', () => {
    const { getByPlaceholderText, getByText } = render(
      <AutocompleteInput options={options} />
    );
    const inputElement = getByPlaceholderText('Type here...');

    fireEvent.focus(inputElement);

    const selectedOption = options[0];
    const selectedOptionElement = getByText(selectedOption);
    fireEvent.click(selectedOptionElement);

    expect(inputElement.value).toBe(selectedOption);
  });

  test('should filter options based on input value', () => {
    const { getByPlaceholderText, queryByText } = render(
      <AutocompleteInput options={options} />
    );
    const inputElement = getByPlaceholderText('Type here...');

    fireEvent.change(inputElement, { target: { value: 'a' } });

    const filteredOptions = options.filter((option) =>
      option.toLowerCase().includes('a')
    );

    filteredOptions.forEach((option) => {
      const optionElement = queryByText(option);
      expect(optionElement).toBeInTheDocument();
    });
  });

  test('should navigate options with arrow keys', () => {
    const { getByPlaceholderText, getAllByRole } = render(
      <AutocompleteInput options={options} />
    );
    const inputElement = getByPlaceholderText('Type here...');

    fireEvent.focus(inputElement);

    fireEvent.keyDown(inputElement, { key: 'ArrowDown' });
    fireEvent.keyDown(inputElement, { key: 'ArrowDown' });
    fireEvent.keyDown(inputElement, { key: 'Enter' });
    

    expect(inputElement.value).toBe(options[1]);

    fireEvent.keyDown(inputElement, { key: 'ArrowUp' });
    fireEvent.keyDown(inputElement, { key: 'ArrowUp' });
    fireEvent.keyDown(inputElement, { key: 'Enter' });

    expect(inputElement.value).toBe(options[5]);
  });
});
