import React from 'react';
import { useForm } from 'react-hook-form';

const Title = () => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Perform further actions with the submitted data
  };

  const selectedTitle = watch('title');

  const handleTitleChange = (event) => {
    const { value } = event.target;
    setValue('title', value);

    if (value !== 'Other') {
      setValue('customTitle', '');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="title-select">Select Title:</label>
        <select
          id="title-select"
          {...register('title', { required: 'Please select a title' })}
          onChange={handleTitleChange}
        >
          <option value="Mr">Mr</option>
          <option value="Mrs">Mrs</option>
          <option value="Miss">Miss</option>
          <option value="Dr">Dr</option>
          <option value="Other">Other</option>
        </select>
        {errors.title && <span>{errors.title.message}</span>}

        {selectedTitle === 'Other' && (
          <div>
            <label htmlFor="custom-title-input">Enter Custom Title:</label>
            <input
              id="custom-title-input"
              type="text"
              {...register('customTitle', {
                required: 'Please enter a custom title',
              })}
            />
            {errors.customTitle && <span>{errors.customTitle.message}</span>}
          </div>
        )}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Title;
