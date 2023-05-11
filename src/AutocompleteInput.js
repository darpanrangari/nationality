import React, { useState, useEffect, useRef } from 'react';

const AutocompleteInput = ({ options }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (
      inputRef.current &&
      !inputRef.current.contains(event.target) &&
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setShowOptions(false);
    }
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    // Filter options based on input value
    const filtered = options.filter((option) =>
      option.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(filtered);
    setShowOptions(true);
  };

  const handleOptionClick = (value) => {
    setInputValue(value);
    setFilteredOptions([]);
    setShowOptions(false);
    inputRef.current.focus();
  };

  const handleInputFocus = () => {
    setShowOptions(true);
    setFilteredOptions(options);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (filteredOptions.length > 0) {
        const currentIndex = filteredOptions.indexOf(inputValue);
        const nextIndex =
          currentIndex === filteredOptions.length - 1 ? 0 : currentIndex + 1;
        setInputValue(filteredOptions[nextIndex]);
      }
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (filteredOptions.length > 0) {
        const currentIndex = filteredOptions.indexOf(inputValue);
        const prevIndex =
          currentIndex === 0 ? filteredOptions.length - 1 : currentIndex - 1;
        setInputValue(filteredOptions[prevIndex]);
      }
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const matchingOption = filteredOptions.find(
        (option) => option === inputValue
      );
      if (matchingOption) {
        handleOptionClick(matchingOption);
      }
    }
  };

  return (
    <div className="autocomplete-container">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onKeyDown={handleKeyDown}
        placeholder="Type here..."
        className="autocomplete-input"
        ref={inputRef}
        aria-autocomplete="list"
        aria-expanded={showOptions}
        aria-owns="autocomplete-options"
      />
      {showOptions && (
        <ul
          id="autocomplete-options"
          className="autocomplete-dropdown"
          role="listbox"
          ref={dropdownRef}
        >
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option)}
              className={`autocomplete-option ${
                option === inputValue ? 'selected' : ''
              }`}
              role="option"
              aria-selected={option === inputValue}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteInput;
