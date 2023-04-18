import React from 'react';
import { observer } from 'mobx-react-lite';
import BaseInput from '../BaseInput';

import { useFormState } from './../../store/form'


const InputAccuracy = observer(() => {
  const { accuracy, setAccuracy } = useFormState()

  const handleChange = (event) => {
    setAccuracy(Number(event.target.value));
  }

  return (
    <BaseInput inputProps={
      {
        type: "number",
        value: accuracy,
        onChange: handleChange
      }}
      labelProps={{ label: 'Точность:' }}
    />
  )
})

export default InputAccuracy;
