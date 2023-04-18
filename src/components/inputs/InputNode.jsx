import { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import BaseInput from '../BaseInput';
import CheckboxLabels from './../CheckboxLabels'
import { useFormState } from './../../store/form'

export default function InputNode() {
  const { addNode } = useFormState();
  const [potential, setPotential] = useState();
  const [conditional, setСonditional] = useState(false);


  const handleChangeСonditional = (event) => {
    setСonditional(event.target.checked);
    event.target.checked ? setPotential('0.5') : setPotential('');
  }

  const handleChangePotential = (event) => {
    setPotential(event.target.value);
  }

  const handleAddNewNode = () => {
    addNode({
      potential: Number(potential),
      conditional
    })
    setСonditional(false)
    setPotential('')
  }

  return (
    <Box sx={{ minWidth: 120, mb: 2 }}>
      <BaseInput inputProps={
        {
          type: "number",
          value: potential,
          onChange: handleChangePotential,
          disabled: conditional
        }}
        labelProps={{ label: 'Напряжение узла:' }}
      />
      <CheckboxLabels checked={conditional} handleChange={handleChangeСonditional}></CheckboxLabels>
      <Button fullWidth variant="outlined" size="large" onClick={handleAddNewNode}>Добавить новый узел</Button>
    </Box>
  )
}
