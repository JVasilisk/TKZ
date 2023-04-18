import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import InputNode from './inputs/InputNode'
import InputBranch from './inputs/InputBranch'
import InputBaseVoltage from './inputs/InputBaseVoltage'
import InputAccuracy from './inputs/InputAccuracy'

import { useFormState } from './../store/form'

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import callculate from '../helper/callculate'
import { observer } from 'mobx-react-lite';



const Form = observer(() => {
  const [result, setResult] = useState({});

  const { accuracy, current, nodes, branches } = useFormState()

  const getResult = () => {
    setResult(callculate({ nodes, branches, current, accuracy }))
  }

  return <>
    <Box sx={{ display: 'flex', flexGrow: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
      <Typography variant="h4" component="h2" sx={{ mt: 3 }}>
        Исходные данные
      </Typography>
      <Grid container spacing={2} sx={{ mt: 1, mb: 5 }}>
        <Grid item xs={6}>
          <Box sx={{ minWidth: 120}}>
            <InputAccuracy />
            <InputBaseVoltage />
          </Box>
          <Divider />
          <InputNode />
          <Divider />
          <InputBranch />
        </Grid>
        <Grid item xs={6}>
          <Grid item>
            Точность: {accuracy}
          </Grid>
          <Grid item>
            Базовый ток: {current}
          </Grid>
          <Grid item>
            Узлы: {nodes.map((value) => <div key={value.id}>{value.id}: {value.potential}</div>)}
          </Grid>
          <Grid item>
            Ветви: {branches.map((value) => <div key={value.id}>{value.id}: {value.resistance} {value.startNode} {value.endNode}</div>)}
          </Grid>
        </Grid>
      </Grid>
      <Button variant="outlined" size="large" onClick={getResult}>Рассчитать</Button>
      <Grid container spacing={2} sx={{ mt: 2, mb: 5 }}>
        <Grid item xs={12}>
          Полный ток КЗ, кА = {result.fullIKA}
        </Grid>
        <Grid item xs={12}>
          Ударный ток КЗ, кА = {result.fullIHitKA}
        </Grid>
      </Grid>
    </Box >
  </>
})

export default Form;