import * as React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import DebounceSelect from '../../sections/@dashboard/user/DebounceSelect';
import axiosClient from '../../axios-client';
import BACKEND_URL from '../../url';
import { useState } from 'react';
import { Stack, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';

export default function CourseCategoryAdd({ fetchList }) {

  const [isSubmiting, setSubmiting] = useState(false);

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const fetchUserAddData = async (search) => {
    const params = {
      search
    };
    const response = await axiosClient.get(BACKEND_URL.ADMIN_USER_ADD_ENDPOINT, { params });
    console.log(response)
    // const courseCategories = response.data.course_categories;
    // return courseCategories.map((courseCategory) => ({
    //   value: courseCategory.id,
    //   label: `${courseCategory.id} ${courseCategory.name}`,
    // }))
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setSubmiting(true);
    const payload = {
      name: userName,
      email:userEmail,
      password: userPassword,
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