import React, { useState, useEffect, useRef } from 'react';
import './index.css'; // Import the CSS file for styling

const AutocompleteInput = (props) => {
  const { options, onChange, inputElement, value, name} = props

  const [inputValue, setInputValue] = useState({
    name: value?.name || '',
    value: value?.value || ''
  });
  const [activeOption, setActiveOption] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [hasMactchingOptions, setHasMactchingOptions] = useState(true);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const optionRefs = useRef([]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setInputValue({
      name: value?.name || '',
      value: value?.value || ''
    });
  }, [value]);

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
    setInputValue({...inputValue,name:value});

    // Filter options based on input value
    const filtered = options.filter((option) =>
      option.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(filtered);
    setShowOptions(true);
    setHasMactchingOptions(filtered.length > 0)
  };

  const handleOptionClick = (option, index) => {
    if(onChange){
      onChange(option)
    }
    setInputValue(option);
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
          (option) => option.name === activeOption
        );
        const nextIndex = (currentIndex + direction + filteredOptions.length) % filteredOptions.length;
        setActiveOption(filteredOptions[nextIndex].name);
  
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
        (option) => option.name === activeOption
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
        
        name={name || 'autocomplete-input'}
        {...props}
        value={inputValue?.name}
        onChange={handleInputChange}
       // onFocus={handleInputFocus}
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
        {hasMactchingOptions ? (filteredOptions.map((option, index) => (
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
        ))) : 
        (
          <li className='autocomplete-option'> no matching options</li>
        )}
      </ul>
      
      )}
    </div>
  );
};

// export default AutocompleteInput;


// import React from 'react';
// import { useForm, Controller, useFieldArray } from 'react-hook-form';
// import Nationality from './Nationality';
// import * as yup from 'yup';

// const schema = yup.object().shape({
//   nationalities: yup.array().of(yup.string().required('Nationality is required')),
// });

// const options = [
//   { name: 'Afghanistan', value: 'AF' },
//   { name: 'Albania', value: 'AL' },
//   { name: 'Algeria', value: 'DZ' },
//   // ...rest of the country options
// ];

// const FormComponent = () => {
//   const { control, handleSubmit, formState: { errors } } = useForm({
//     resolver: yupResolver(schema), // Apply validation schema
//   });
//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: 'nationalities',
//     max: 5,
//     shouldUnregister: true,
//   });

//   const onSubmit = (data) => {
//     console.log(data);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       {fields.map((field, index) => (
//         <div key={field.id}>
//           <Nationality control={control} options={options} />
//           {index === 0 && errors.nationalities && (
//             <p>{errors.nationalities.message}</p>
//           )}
//           <button type="button" onClick={() => remove(index)}>
//             Remove
//           </button>
//         </div>
//       ))}
//       {fields.length < 5 && (!fields.length || !errors.nationalities) && (
//         <button type="button" onClick={() => append({})}>
//           Add Nationality
//         </button>
//       )}
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default FormComponent;

// import React from 'react';
// import { Controller, ErrorMessage } from 'react-hook-form';
// import AutocompleteInput from './AutocompleteInput';

// const Nationality = ({ control, options }) => {
//   return (
//     <div>
//       <Controller
//         control={control}
//         name="nationalities"
//         render={({ field }) => (
//           <AutocompleteInput
//             options={options}
//             value={field.value}
//             onChange={field.onChange}
//             inputElement={<input />} // Customize the input element if needed
//           />
//         )}
//       />
//       <ErrorMessage
//         errors={control.formState.errors}
//         name="nationalities"
//         as={<p>{errors => errors && errors.message}</p>}
//       />
//     </div>
//   );
// };

// export default Nationality;

