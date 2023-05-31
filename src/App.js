import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import AutocompleteInput from './AutocompleteInput';

const options = [
  { name: 'Apple', value: 'abc' },
  { name: 'Banana', value: 'abc' },
  { name: 'Cherry', value: 'abc' },
  { name: 'Durian', value: 'abc' },
  { name: 'Durwecian', value: 'abc' },
  { name: 'sdf', value: 'abc' },
  { name: 'csadf', value: 'abc' },
  { name: 'Durijhgfan', value: 'abc' },
  { name: 'hgfsdf', value: 'abc' },
  { name: 'acgd', value: 'abc' },
  { name: 'ACHFG', value: 'abc' },
  { name: 'Duwewcrian', value: 'abc' },
];

const FormComponent = () => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="autocomplete"
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <AutocompleteInput
            options={options}
            onChange={onChange}
            value={value}
          />
        )}
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default FormComponent;
