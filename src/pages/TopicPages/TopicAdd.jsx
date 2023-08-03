import * as React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import DebounceSelect from '../../sections/@dashboard/user/DebounceSelect';
import axiosClient from '../../axios-client';
import BACKEND_URL from '../../url';
import { useState } from 'react';
import { Stack, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';

export default function TopicAdd({ fetchList }) {

  const [isSubmiting, setSubmiting] = useState(false);

  const [topicName, setTopicName] = useState('');
  const [course, setCourse] = useState(null);
  const [topicDescription, setTopicDescription] = useState('');

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

  const fetchTopicAddData = async (search) => {
    const params = {
      search
    };
    const response = await axiosClient.get(BACKEND_URL.STAFF_TOPIC_ADD_ENDPOINT, { params });
    console.log(response)
    const courseCategories = response.data.course;
    return courseCategories.map((course) => ({
      value: course.id,
      label: `${course.id} ${course.name}`,
    }))
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setSubmiting(true);
    const payload = {
      name: topicName,
      description: topicDescription,
      course_id: course.value,
    }
    console.log(payload);
    const response = await axiosClient.post(BACKEND_URL.STAFF_TOPIC_ADD_ENDPOINT, payload)
    const topic = response.data;
    alert('Add successfully id: ' + topic.id + ' name: ' + topic.name);
    fetchList();
    setSubmiting(false);
  }

  return (
    <Stack spacing={3}>
      <Typography variant="h6" gutterBottom>
        Add Topic
      </Typography>
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id='topic_name'
              name='topic_name'
              label='Topic Name'
              value={topicName}
              onChange={(event) => setTopicName(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DebounceSelect
              required
              id='course'
              name='course'
              label="Course Id"
              placeholder="Select Course"
              value={course}
              onChange={(value) => setCourse(value)}
              fetchOptions={fetchTopicAddData}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              id='topic_description'
              name='topic_description'
              label='Description'
              value={topicDescription}
              onChange={(event) => setTopicDescription(event.target.value)}
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