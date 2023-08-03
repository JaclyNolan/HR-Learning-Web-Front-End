import * as React from 'react';
import DebounceSelect from './../../sections/@dashboard/user/DebounceSelect';
import axiosClient from '../../axios-client';
import BACKEND_URL from './../../url';
import { useState } from 'react';
import { CircularProgress, Typography, Grid, Stack, TextField } from '@mui/material';
import { useEffect } from 'react';
import { LoadingButton } from '@mui/lab';

export default function CourseEdit({ fetchList, entry }) {

    const [isRetrieving, setRetrieving] = useState(true);
    const [isSubmiting, setSubmiting] = useState(false);

    const [courseId, setCourseId] = useState(entry.id);
    const [courseName, setCourseName] = useState('');
    const [courseCategory, setCourseCategory] = useState({});
    const [initialCourseCategory, setInitialCourseCategory] = useState({});
    const [courseDescription, setCourseDescription] = useState('');

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

    const fetchCourseEditData = async () => {
        const response = await axiosClient.get(BACKEND_URL.STAFF_COURSE_EDIT_ENDPOINT.concat(`/${entry.id}`))
        const { name, description, course_category } = response.data
        setCourseName(name);
        setCourseDescription(description);
        setCourseCategory({ value: course_category.id, label: `${course_category.id} ${course_category.name}` })
        setInitialCourseCategory({ value: course_category.id, label: `${course_category.id} ${course_category.name}` });
        setRetrieving(false);
    }

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

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setSubmiting(true);
        const payload = {
            id: entry.id,
            name: courseName,
            description: courseDescription,
            course_category_id: courseCategory.value
        }
        console.log(payload);
        const response = await axiosClient.post(BACKEND_URL.STAFF_COURSE_EDIT_ENDPOINT.concat(`/${entry.id}`), payload)
        const course = response.data;
        alert('Edited successfully ' + course.name);
        fetchList();
        setSubmiting(false);
    }

    useEffect(() => {
        fetchCourseEditData();
    }, [])

    // console.log(initialValues);
    return (
        <Stack spacing={3}>
            <Typography variant="h6" gutterBottom>
                Edit Course
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
                                id='course_id'
                                name='course_id'
                                label='Course Id'
                                value={courseId}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id='course_name'
                                name='course_name'
                                label='Course Name'
                                value={courseName}
                                onChange={(event) => setCourseName(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <DebounceSelect
                                required
                                id='course_category'
                                name='course_category'
                                label="Category Id"
                                placeholder="Select Category"
                                value={courseCategory}
                                onChange={(value) => setCourseCategory(value)}
                                fetchOptions={fetchCourseAddData}
                                presetOptions={[initialCourseCategory]}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                id='course_description'
                                name='course_description'
                                label='Description'
                                value={courseDescription}
                                onChange={(event) => setCourseDescription(event.target.value)}
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