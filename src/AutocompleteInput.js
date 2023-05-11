import React, { useState, useEffect, useRef } from 'react';

const AutocompleteInput = ({ options }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
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
  };

  const handleInputClick = (value) => {
    setFilteredOptions(options);
    setShowOptions(true);
  };

  return (
    <div className="autocomplete-container">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onClick={handleInputClick}
        placeholder="Type here..."
        className="autocomplete-input"
        ref={inputRef}
      />
      {showOptions && filteredOptions.length > 0 && (
        <ul className="autocomplete-dropdown">
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option)}
              className="autocomplete-option"
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
