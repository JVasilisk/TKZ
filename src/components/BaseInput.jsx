import React from 'react';
import Box from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';

export default function BaseInput({
  inputProps: {
    ...restInputProps
  },
  labelProps: {
    label,
    ...restLabelProps
  } = {}
}) {
  return (
    <Box>
      {label && <InputLabel sx={{ marginBlock: 1 }} {...restLabelProps}>{label}</InputLabel>}
      <TextField
        sx={{ marginBlockEnd: 1 }}
        fullWidth
        {...restInputProps}
      />
    </Box>
  )
}