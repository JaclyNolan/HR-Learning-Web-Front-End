import * as React from 'react';
import DebounceSelect from '../../sections/@dashboard/user/DebounceSelect';
import axiosClient from '../../axios-client';
import BACKEND_URL from '../../url';
import { useState } from 'react';
import { CircularProgress, Typography, Grid, Stack, TextField } from '@mui/material';
import { useEffect } from 'react';
import { LoadingButton } from '@mui/lab';

export default function TopicEdit({ fetchList, entry }) {

    const [isRetrieving, setRetrieving] = useState(true);
    const [isSubmiting, setSubmiting] = useState(false);

    const [topicId, setTopicId] = useState(entry.id);
    const [topicName, setTopicName] = useState('');
    const [course, setCourse] = useState({});
    const [initialCourse, setInitialCourse] = useState({});
    const [topicDescription, setTopicDescription] = useState('');


    const fetchTopicEditData = async () => {
        const response = await axiosClient.get(BACKEND_URL.STAFF_TOPIC_EDIT_ENDPOINT.concat(`/${entry.id}`))
        const { name, description, course } = response.data
        setTopicName(name);
        setTopicDescription(description);
        setCourse({ value: course.id, label: `${course.id} ${course.name}` })
        setInitialCourse({ value: course.id, label: `${course.id} ${course.name}` });
        setRetrieving(false);
    }

    const fetchTopicAddData = async (search) => {
        const params = {
            search
        };
        const response = await axiosClient.get(BACKEND_URL.STAFF_TOPIC_ADD_ENDPOINT, { params });
        // console.log(response)
        const course = response.data.course;
        return course.map((course) => ({
            value: course.id,
            label: `${course.id} ${course.name}`,
        }))
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setSubmiting(true);
        const payload = {
            id: entry.id,
            name: topicName,
            description: topicDescription,
            course_id: course.value
        }
        console.log(payload);
        const response = await axiosClient.post(BACKEND_URL.STAFF_TOPIC_EDIT_ENDPOINT.concat(`/${entry.id}`), payload)
        const topic = response.data;
        alert('Edited successfully ' + topic.name);
        fetchList();
        setSubmiting(false);
    }

    useEffect(() => {
        fetchTopicEditData();
    }, [])

    // console.log(initialValues);
    return (
        <Stack spacing={3}>
            <Typography variant="h6" gutterBottom>
                Edit Topic
            </Typography>
            {isRetrieving
                ? <CircularProgress />
                : <form onSubmit={handleFormSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                disabled
                                id='topic_id'
                                name='topic_id'
                                label='Topic Id'
                                value={topicId}
                            />
                        </Grid>
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
                                id='course_id'
                                name='course_id'
                                label="Course Id"
                                placeholder="Select Course"
                                value={course}
                                onChange={(value) => setCourse(value)}
                                fetchOptions={fetchTopicAddData}
                                presetOptions={[initialCourse]}
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
                                Edit
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </form>
            }
        </Stack>
    );
}