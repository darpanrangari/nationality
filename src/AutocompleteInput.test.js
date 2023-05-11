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

  test('should show options when input is clicked', () => {
    const { getByPlaceholderText, getByText } = render(
      <AutocompleteInput options={options} />
    );
    const inputElement = getByPlaceholderText('Type here...');

    fireEvent.click(inputElement);

    options.forEach((option) => {
      const optionElement = getByText(option);
      expect(optionElement).toBeInTheDocument();
    });
  });

  test('should select option on click', () => {
    const { getByPlaceholderText, getByText } = render(
      <AutocompleteInput options={options} />
    );
    const inputElement = getByPlaceholderText('Type here...');

    fireEvent.click(inputElement);

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

    options.forEach((option) => {
      if (option.toLowerCase().includes('a')) {
        const optionElement = queryByText(option);
        expect(optionElement).toBeInTheDocument();
      } else {
        const optionElement = queryByText(option);
        expect(optionElement).not.toBeInTheDocument();
      }
    });
  });
});
