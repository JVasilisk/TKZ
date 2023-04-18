import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({ nodes, label, value, setValue }) {
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120, mb: 1 }}>
      <InputLabel sx={{ marginBlock: 1 }}>{label}</InputLabel>
      <FormControl fullWidth>
        <Select
          value={value}
          onChange={handleChange}
        >
          {nodes.map(node => <MenuItem value={node.id}>Номер узла {node.id}</MenuItem>)}
        </Select>
      </FormControl>
    </Box>
  );
}


