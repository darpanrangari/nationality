import React, { useState, useEffect, useRef } from 'react';
import './index.css'; // Import the CSS file for styling

const AutocompleteInput = (props) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const optionRefs = useRef([]);
  const { options, onChangeHandler, inputElement} = props

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
      option.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(filtered);
    setShowOptions(true);
  };

  const handleOptionClick = (option, index) => {
    if(onChangeHandler){
      onChangeHandler(option)
    }
    setInputValue(option.name);
    setFilteredOptions([]);
    setShowOptions(false);
    inputRef.current.focus();
  
  };
  

  const handleInputFocus = () => {
    setShowOptions(true);
  };

  // const handleKeyDown = (event) => {
  //   if (event.key === 'ArrowDown') {
  //     event.preventDefault();
  //     if (filteredOptions.length > 0) {
  //       const currentIndex = filteredOptions.findIndex(
  //         (option) => option.name === inputValue
  //       );
  //       const nextIndex =
  //         currentIndex === filteredOptions.length - 1 ? 0 : currentIndex + 1;
  //       setInputValue(filteredOptions[nextIndex].name);
  
  //       // Scroll to the selected option
  //       if (dropdownRef.current && optionRefs[nextIndex]) {
  //         const optionNode = optionRefs[nextIndex];
  //         const optionOffsetTop = optionNode.offsetTop;
  //         const optionHeight = optionNode.offsetHeight;
  //         const dropdownScrollTop = dropdownRef.current.scrollTop;
  //         const dropdownHeight = dropdownRef.current.offsetHeight;
  
  //         if (optionOffsetTop < dropdownScrollTop) {
  //           // Selected option is above the visible area
  //           dropdownRef.current.scrollTop = optionOffsetTop;
  //         } else if (optionOffsetTop + optionHeight > dropdownScrollTop + dropdownHeight) {
  //           // Selected option is below the visible area
  //           dropdownRef.current.scrollTop = optionOffsetTop + optionHeight - dropdownHeight;
  //         }
  //       }
  //     }
  //   } else if (event.key === 'ArrowUp') {
  //     event.preventDefault();
  //     if (filteredOptions.length > 0) {
  //       const currentIndex = filteredOptions.findIndex(
  //         (option) => option.name === inputValue
  //       );
  //       const prevIndex =
  //         currentIndex === 0 ? filteredOptions.length - 1 : currentIndex - 1;
  //       setInputValue(filteredOptions[prevIndex].name);
  
  //       // Scroll to the selected option
  //       if (dropdownRef.current && optionRefs[prevIndex]) {
  //         const optionNode = optionRefs[prevIndex];
  //         const optionOffsetTop = optionNode.offsetTop;
  //         const optionHeight = optionNode.offsetHeight;
  //         const dropdownScrollTop = dropdownRef.current.scrollTop;
  //         const dropdownHeight = dropdownRef.current.offsetHeight;
  
  //         if (optionOffsetTop < dropdownScrollTop) {
  //           // Selected option is above the visible area
  //           dropdownRef.current.scrollTop = optionOffsetTop;
  //         } else if (optionOffsetTop + optionHeight > dropdownScrollTop + dropdownHeight) {
  //           // Selected option is below the visible area
  //           dropdownRef.current.scrollTop = optionOffsetTop + optionHeight - dropdownHeight;
  //         }
  //       }
  //     }
  //   } else if (event.key === 'Enter') {
  //     event.preventDefault();
  //     const matchingOption = filteredOptions.find(
  //       (option) => option.name === inputValue
  //     );
  //     if (matchingOption) {
  //       handleOptionClick(matchingOption);
  //     }
  //   }
  // };
  const handleKeyDown = (event) => {
    const handleOptionNavigation = (direction) => {
      event.preventDefault();
      if (filteredOptions.length > 0) {
        const currentIndex = filteredOptions.findIndex(
          (option) => option.name === inputValue
        );
        const nextIndex = (currentIndex + direction + filteredOptions.length) % filteredOptions.length;
        setInputValue(filteredOptions[nextIndex].name);
  
        // Scroll to the selected option
        if (dropdownRef.current && optionRefs[nextIndex]) {
          const optionNode = optionRefs[nextIndex];
          const optionOffsetTop = optionNode.offsetTop;
          const optionHeight = optionNode.offsetHeight;
          const dropdownScrollTop = dropdownRef.current.scrollTop;
          const dropdownHeight = dropdownRef.current.offsetHeight;
  
          if (optionOffsetTop < dropdownScrollTop) {
            // Selected option is above the visible area
            dropdownRef.current.scrollTop = optionOffsetTop;
          } else if (optionOffsetTop + optionHeight > dropdownScrollTop + dropdownHeight) {
            // Selected option is below the visible area
            dropdownRef.current.scrollTop = optionOffsetTop + optionHeight - dropdownHeight;
          }
        }
      }
    };
  
    if (event.key === 'ArrowDown') {
      handleOptionNavigation(1);
    } else if (event.key === 'ArrowUp') {
      handleOptionNavigation(-1);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const matchingOption = filteredOptions.find(
        (option) => option.name === inputValue
      );
      if (matchingOption) {
        handleOptionClick(matchingOption);
      }
    }
  };
    

  return (
    <div className="autocomplete-container">
      {React.isValidElement(inputElement) ? React.cloneElement(inputElement,{
        value:inputValue,
        ref:inputRef,
        error:props?.error,
        ...props,
        onChange:handleInputChange,
        onFocus: handleInputFocus,
        onKeyDown: handleKeyDown,
        placeholder:'Type hear...',
        className:'autocomplete-input',
        'data-testid': 'autocomplete-input',
      }):
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
        data-testid='autocomplete-input'
      />}
      {showOptions && (
        <ul
        id="autocomplete-options"
        className="autocomplete-dropdown"
        role="listbox"
        ref={dropdownRef}
        data-testid ='autocomplete-dropdown'
      >
        {filteredOptions.map((option, index) => (
          <li
            key={index}
            onClick={() => handleOptionClick(option, index)}
            className={`autocomplete-option ${
              option.name === inputValue ? 'selected' : ''
            }`}
            role="option"
            aria-selected={option.name === inputValue}
            ref={(ref) => (optionRefs[index] = ref)}
          >
            {option.name}
          </li>
        ))}
      </ul>
      
      )}
    </div>
  );
};

export default AutocompleteInput;
