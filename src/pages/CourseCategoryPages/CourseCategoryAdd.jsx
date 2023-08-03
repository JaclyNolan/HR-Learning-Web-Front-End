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

  const [courseCategoryName, setCourseCategoryName] = useState('');
  const [courseCategoryDescription, setCourseCategoryDescription] = useState('');

  /**
   * 
   * @returns 
    "course_categories": [
        {
            "id": 1,
            "name": "perspiciatis"
        },
        {
            "id": 2,
            "name": "eos"
        },
        {
            "id": 3,
            "name": "rerum"
        }
    ]
   */

  const fetchCourseAddData = async (search) => {
    const params = {
      search
    };
    const response = await axiosClient.get(BACKEND_URL.STAFF_COURSE_CATEGORY_ADD_ENDPOINT, { params });
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
      name: courseCategoryName,
      description: courseCategoryDescription,
    }
    console.log(payload);
    const response = await axiosClient.post(BACKEND_URL.STAFF_COURSE_CATEGORY_ADD_ENDPOINT, payload)
    const courseCategory = response.data;
    alert('Add successfully id: ' + courseCategory.id + ' name: ' + courseCategory.name);
    fetchList();
    setSubmiting(false);
  }

  //console.log(courseCategory);

  return (
    <Stack spacing={3}>
      <Typography variant="h6" gutterBottom>
        Add Course
      </Typography>
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id='courseCategory_name'
              name='courseCategory_name'
              label='Course Category Name'
              value={courseCategoryName}
              onChange={(event) => setCourseCategoryName(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              id='courseCategory_description'
              name='courseCategory_description'
              label='Description'
              value={courseCategoryDescription}
              onChange={(event) => setCourseCategoryDescription(event.target.value)}
              fullWidth
              multiline
              rows={4}
              placeholder='Description'
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