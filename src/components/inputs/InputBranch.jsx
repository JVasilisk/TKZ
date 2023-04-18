import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import BasicSelect from '../BasicSelect';
import BaseInput from '../BaseInput';

import { useFormState } from './../../store/form'

export default function InputBranch() {
  const [resistance, setResistance] = useState('');
  const [startNode, setStartNode] = useState('');
  const [endNode, setEndNode] = useState('');

  const { nodes, addBranch } = useFormState();

  const handleChangeResistance = (event) => {
    setResistance(event.target.value);
  }

  const handleAddNewBranch = () => {
    addBranch({
      resistance: Number(resistance),
      startNode: Number(startNode),
      endNode: Number(endNode)
    })
    setStartNode('')
    setEndNode('')
  }

  return (
    <>
      <BaseInput inputProps={
        {
          type: "number",
          value: resistance,
          onChange: handleChangeResistance
        }}
        labelProps={{ label: 'Сопротивление ветки:' }}
      />
      <Typography sx={{ mb: 1 }}>
        <Grid container >
          <Grid item xs={6} sx={{ pr: 1 }} >
            <BasicSelect nodes={nodes} label="Узел начала ветви" value={startNode} setValue={setStartNode} />
          </Grid>
          <Grid item xs={6} sx={{ pl: 1 }}>
            <BasicSelect nodes={nodes} label="Узел конца ветви" value={endNode} setValue={setEndNode} />
          </Grid>
        </Grid>
        <Button fullWidth variant="outlined" size="large" onClick={handleAddNewBranch}>Добавить ветвь</Button>
      </Typography>
    </>
  )
}
