import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { UserAddForm } from '../../sections/@dashboard/user';
import DebounceSelect from './../../sections/@dashboard/user/DebounceSelect';
import axiosClient from '../../axios-client';
import BACKEND_URL from './../../url';
import { useState } from 'react';
import { Stack } from '@mui/material';
import { Form } from 'antd';

export default function CourseAdd({ fetchList }) {

  const formInputs = [
    {
      type: 'TextField',
      label: 'Course Name',
      name: 'name',
    },
    // {
    //   type: 'TextField',
    //   label: 'Category Id',
    //   name: 'course_category_id', 
    // },
    {
      type: 'render',
      label: 'Category Id',
      name: 'course_category_id',
      render: () => (<DebounceSelect
        required
        name='course_category_id'
        label="Category Id"
        placeholder="Select Category"
        fetchOptions={fetchCourseAddData}
      />)
    },
    {
      type: 'render',
      label: 'Description',
      name: 'description', sm: 12,
      render: () => (<TextField
        id='Description'
        label='Description'
        fullWidth
        multiline
        rows={4}
        placeholder='Description'
      />)
    }
  ]

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
    const response = await axiosClient.get(BACKEND_URL.STAFF_COURSE_ADD_ENDPOINT, { params });
    // console.log(response)
    const courseCategories = response.data.course_categories;
    return courseCategories.map((courseCategory) => ({
      value: courseCategory.id,
      label: `${courseCategory.id} ${courseCategory.name}`,
    }))
  }

  const addEntry = async (payload, setFetching) => {
    setFetching(true);
    const response = await axiosClient.post(BACKEND_URL.STAFF_COURSE_ADD_ENDPOINT, payload)
    alert('Add successfully!');
    fetchList();
    setFetching(false);
  }

  return (
    <Stack spacing={3}>
      <Typography variant="h6" gutterBottom>
        Add Course
      </Typography>
      <UserAddForm
        buttonLabel={'Add'}
        formInputs={formInputs}
        submitFunc={addEntry}
      />
    </Stack>
  );
}