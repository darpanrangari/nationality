import React from 'react';
import { fireEvent, render, screen, act, waitFor } from '@testing-library/react';
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

  test('shows options on input focus', async () => {
    render(<AutocompleteInput options={options} />);
    const inputElement = screen.getByTestId('autocomplete-input');
    
    await act(async () => {
      userEvent.click(inputElement);
      userEvent.type(inputElement, 'app');
      await waitFor(() => screen.getByTestId('autocomplete-dropdown'));
    });
    
    const dropdownElement = screen.getByTestId('autocomplete-dropdown');
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
  
  test('selects option on enter key press', async () => {
    render(<AutocompleteInput options={options} />);
    const inputElement = screen.getByTestId('autocomplete-input');
  
    await act(async () => {
      userEvent.click(inputElement);
      userEvent.type(inputElement, 'ch');
    
      await waitFor(() => screen.getByText('Cherry'));
    });
  
    userEvent.keyboard('[arrowdown]') 
    userEvent.type(inputElement, '{enter}');
    expect(inputElement.value).toBe('Cherry');
  });
  
  test('navigates options using arrow keys', async () => {
    render(<AutocompleteInput options={options} />);
    const inputElement = screen.getByPlaceholderText('Type here...');
    userEvent.click(inputElement);
    userEvent.type(inputElement, 'a');
    const appleOption = screen.getByText('Apple');
    const bananaOption = screen.getByText('Banana');
    const durianOption = screen.getByText('Durian');
  
    userEvent.type(inputElement, '{arrowdown}');
    expect(appleOption).toHaveClass('selected');
    
    await waitFor(() => {
      userEvent.type(inputElement, '{arrowdown}');
      expect(bananaOption).toHaveClass('selected');
    });
    
    await waitFor(() => {
      userEvent.type(inputElement, '{arrowup}');
      expect(appleOption).toHaveClass('selected');
    });
  
    await waitFor(() => {
      userEvent.type(inputElement, '{arrowup}');
      expect(durianOption).toHaveClass('selected');
    });
  
    userEvent.type(inputElement, '{enter}');
    expect(inputElement.value).toBe('Durian');
  });
  
  test('closes dropdown when clicked outside', () => {
    render(<AutocompleteInput options={options} />);
    const inputElement = screen.getByPlaceholderText('Type here...');
    userEvent.click(inputElement);
    const dropdownElement = screen.getByRole('listbox');
    fireEvent.mouseDown(document.body);

    expect(dropdownElement).not.toBeInTheDocument();
  });

  test('calls onChangeHandler when an option is clicked', () => {
    const options = [{ name: 'Option 1' }, { name: 'Option 2' }, { name: 'Option 3' }];
    const onChangeHandler = jest.fn(); // Create a mock handler

    const { getByPlaceholderText, getByTestId } = render(
      <AutocompleteInput options={options} onChangeHandler={onChangeHandler} />
    );

    const input = getByPlaceholderText('Type here...');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'Option 1' } });

    const dropdown = getByTestId('autocomplete-dropdown');
    const option = dropdown.querySelector('.autocomplete-option');
    fireEvent.click(option);

    expect(onChangeHandler).toHaveBeenCalledTimes(1);
    expect(onChangeHandler).toHaveBeenCalledWith(options[0]);
  });
});
