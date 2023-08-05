import * as React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import DebounceSelect from '../../sections/@dashboard/user/DebounceSelect';
import axiosClient from '../../axios-client';
import BACKEND_URL from '../../url';
import { useState } from 'react';
import { Stack, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';

export default function TraineeAdd({ fetchList }) {

  const [isSubmiting, setSubmiting] = useState(false);

  const [traineeName, setTraineeName] = useState('');
  const [traineeAccount, setTraineeAccount] = useState('');
  const [traineeAge, setTraineeAge] = useState('');
  const [traineeDateOfBirth, setTraineeDateOfBirth] = useState(dayjs());
  const [traineeEducation, setTraineeEducation] = useState('');
  const [traineeMain, setTraineeMain] = useState('');
  const [traineeDepartment, setTraineeDepartment] = useState('');
  const [traineeToeicScore, setTraineeToeicScore] = useState('');
  const [traineeLocation, setTraineeLocation] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setSubmiting(true);
    const payload = {
      name: traineeName,
      account: traineeAccount,
      age: traineeAge,
      date_of_birth: traineeDateOfBirth.format("YYYY-MM-DD").toString(),
      education: traineeEducation,
      main_programming_language: traineeMain,
      department: traineeDepartment,
      toeic_score: traineeToeicScore,
      location: traineeLocation,
    }
    console.log(payload);
    const response = await axiosClient.post(BACKEND_URL.STAFF_TRAINEE_ADD_ENDPOINT, payload)
    const trainee = response.data;
    alert('Add successfully id: ' + trainee.id + ' name: ' + trainee.name);
    fetchList();
    setSubmiting(false);
  }

  return (
    <Stack spacing={3}>
      <Typography variant="h6" gutterBottom>
        Add Trainee
      </Typography>
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id='trainee_name'
              name='trainee_name'
              label='Trainee Name'
              value={traineeName}
              onChange={(event) => setTraineeName(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id='traineeAccount'
              name='traineeAccount'
              label='Trainee Account'
              value={traineeAccount}
              onChange={(event) => setTraineeAccount(event.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              required
              fullWidth
              id='traineeAge'
              name='traineeAge'
              label='Trainee Age'
              value={traineeAge}
              onChange={(event) => setTraineeAge(event.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={8}>
            <DatePicker
              required
              fullWidth
              id='date_of_birth'
              name='date_of_birth'
              label='Birthday'
              format='DD/MM/YYYY'
              value={traineeDateOfBirth}
              onChange={(value) => setTraineeDateOfBirth(value)}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              required
              fullWidth
              id='traineeEducation'
              name='traineeEducation'
              label='Trainee Education'
              value={traineeEducation}
              onChange={(event) => setTraineeEducation(event.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              required
              fullWidth
              id='traineeMain'
              name='traineeMain'
              label='Trainee Main'
              value={traineeMain}
              onChange={(event) => setTraineeMain(event.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              required
              fullWidth
              id='traineeDepartment'
              name='traineeDepartment'
              label='Trainee Department'
              value={traineeDepartment}
              onChange={(event) => setTraineeDepartment(event.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              required
              fullWidth
              id='traineeToeicScore'
              name='traineeToeicScore'
              label='Trainee Toeic Score'
              value={traineeToeicScore}
              onChange={(event) => setTraineeToeicScore(event.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={8}>
            <TextField
              required
              fullWidth
              id='traineeLocation'
              name='traineeLocation'
              label='Trainee Location'
              value={traineeLocation}
              onChange={(event) => setTraineeLocation(event.target.value)}
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