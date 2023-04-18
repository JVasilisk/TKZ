import { useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function CheckboxLabels({ checked, handleChange }) {
  return (
    <FormGroup>
      <FormControlLabel control={<Checkbox checked={checked}
        onChange={handleChange} />} label="Условное" />
    </FormGroup>
  );
}