import React from 'react';
import AutocompleteInput from './AutocompleteInput';
import Title from './Title';

const App = () => {
  const options = [
    "United States",
    "Canada",
    "United Kingdom",
    "Germany",
    "France",
    "Italy",
    "Australia",
    "Japan",
    "Brazil",
    "Mexico",
    "China",
    "India",
    "South Africa",
    "Russia",
    "Spain",
    "Argentina",
    "Netherlands",
    "Sweden",
    "Saudi Arabia",
    "New Zealand"
];

  return (
    <div>
      <h1>Autocomplete Input Example</h1>
      <AutocompleteInput options={options} />

      <Title/>
    </div>
  );
};

export default App;