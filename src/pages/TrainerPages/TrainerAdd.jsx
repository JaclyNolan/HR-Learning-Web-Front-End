import * as React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import DebounceSelect from '../../sections/@dashboard/user/DebounceSelect';
import axiosClient from '../../axios-client';
import BACKEND_URL from '../../url';
import { useState } from 'react';
import { Stack, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';

export default function TrainerAdd({ fetchList }) {

  const [isSubmiting, setSubmiting] = useState(false);

  const [trainerName, setTrainerName] = useState('');
  const [trainerType, setTrainerType] = useState('');
  const [trainerTypeName, setTrainerTypeName] = useState('');
  const [trainerWorkingPlace, setTrainerWorkingPlace] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setSubmiting(true);
    const payload = {
      name: trainerName,
      type: trainerType,
      working_place: trainerWorkingPlace,
    }
    console.log(payload);
    const response = await axiosClient.post(BACKEND_URL.STAFF_TRAINER_ADD_ENDPOINT, payload)
    const trainer = response.data;
    alert('Add successfully id: ' + trainer.id + ' name: ' + trainer.name);
    fetchList();
    setSubmiting(false);
  }

  return (
    <Stack spacing={3}>
      <Typography variant="h6" gutterBottom>
        Add Trainer
      </Typography>
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id='trainer_name'
              name='trainer_name'
              label='Trainer Name'
              value={trainerName}
              onChange={(event) => setTrainerName(event.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id='trainer_type'
              name='trainer_type'
              label='Trainer Type'
              value={trainerType}
              onChange={(event) => setTrainerType(event.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              required
              fullWidth
              id='trainer_working_place'
              name='trainer_working_place'
              label='Trainer Working Place'
              value={trainerWorkingPlace}
              onChange={(event) => setTrainerWorkingPlace(event.target.value)}
            />
          </Grid>
          <Grid item sm={6} xs={6}>
            <LoadingButton loading={isSubmiting} fullWidth size="large" type="submit" variant="contained">
              Add
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </Stack>
  );
}