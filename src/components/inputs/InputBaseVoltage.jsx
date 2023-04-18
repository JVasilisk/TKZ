import React from 'react';

import { useFormState } from './../../store/form'
import BaseInput from '../BaseInput';

export default function InputBaseVoltage() {
  const { voltage, setVoltage } = useFormState();

  const handleChange = (event) => {
    setVoltage(event.target.value);
  }

  return (
    <BaseInput inputProps={
      {
        type: "number",
        value: voltage,
        onChange: handleChange
      }}
      labelProps={{ label: 'Питающее напряжение:' }}
    />
  )
}
