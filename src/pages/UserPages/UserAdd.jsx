import * as React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import DebounceSelect from '../../sections/@dashboard/user/DebounceSelect';
import axiosClient from '../../axios-client';
import BACKEND_URL from '../../url';
import { useState } from 'react';
import { Stack, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';

export default function CourseCategoryAdd({ fetchList }) {

  const [isSubmiting, setSubmiting] = useState(false);

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userRole, setUserRole] = useState('');
  const [trainerId, setTrainerId] = useState(null);

  const handleRoleChange = (event) => {
    setUserRole(event.target.value);
  };

  const fetchTrainerAddData = async (search) => {
    const params = {
      search
    };
    const response = await axiosClient.get(BACKEND_URL.ADMIN_USER_ADD_ENDPOINT, { params });
    // console.log(response)
    const trainer = response.data.trainer;
    return trainer.map((trainer) => ({
      value: trainer.id,
      label: `${trainer.id} ${trainer.name}`,
    }))
  }

  const handleFormSubmit = async (event) => {
    const trainerIdValue = trainerId ? trainerId.value : null

    event.preventDefault();
    setSubmiting(true);
    const payload = {
      name: userName,
      email: userEmail,
      password: userPassword,
      role_id: userRole,
      trainer_id: trainerIdValue,
    }
    console.log(payload);
    const response = await axiosClient.post(BACKEND_URL.ADMIN_USER_ADD_ENDPOINT, payload)
    const user = response.data;
    alert('Add successfully id: ' + user.id + ' name: ' + user.name);
    fetchList();
    setSubmiting(false);
  }

  //console.log(courseCategory);

  return (
    <Stack spacing={3}>
      <Typography variant="h6" gutterBottom>
        Add User
      </Typography>
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id='user_name'
              name='user_name'
              label='User Name'
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id='user_password'
              name='user_password'
              label='Password'
              value={userPassword}
              onChange={(event) => setUserPassword(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              id='user_email'
              name='user_email'
              label='Email'
              value={userEmail}
              onChange={(event) => setUserEmail(event.target.value)}
              fullWidth
              multiline
              rows={4}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="user_role_label">User Role</InputLabel>
              <Select
                labelId="user_role_label"
                id="user_role"
                name="user_role"
                value={userRole}
                onChange={handleRoleChange}
              >
                <MenuItem value={1}>Admin</MenuItem>
                <MenuItem value={2}>Staff</MenuItem>
                <MenuItem value={3}>Trainer</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {userRole === 3 &&
            <Grid item xs={12} sm={6}>
              <DebounceSelect
                required
                id='trainer_id'
                name='trainer_id'
                label="Trainer"
                placeholder="Select Trainer"
                value={trainerId}
                onChange={(value) => setTrainerId(value)}
                fetchOptions={fetchTrainerAddData}
              />
            </Grid>
          }
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