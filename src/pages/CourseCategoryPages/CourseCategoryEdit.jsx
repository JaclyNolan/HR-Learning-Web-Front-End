import * as React from 'react';
import DebounceSelect from '../../sections/@dashboard/user/DebounceSelect';
import axiosClient from '../../axios-client';
import BACKEND_URL from '../../url';
import { useState } from 'react';
import { CircularProgress, Typography, Grid, Stack, TextField } from '@mui/material';
import { useEffect } from 'react';
import { LoadingButton } from '@mui/lab';

export default function CourseCategoryEdit({ fetchList, entry }) {

    const [isRetrieving, setRetrieving] = useState(true);
    const [isSubmiting, setSubmiting] = useState(false);

    const [courseCategoryId, setCourseCategoryId] = useState(entry.id);
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

    const fetchCourseCategoryEditData = async () => {
        const response = await axiosClient.get(BACKEND_URL.STAFF_COURSE_CATEGORY_EDIT_ENDPOINT.concat(`/${entry.id}`))
        const { name, description } = response.data
        setCourseCategoryName(name);
        setCourseCategoryDescription(description);
        setRetrieving(false);
    }

    const fetchCourseCategoryAddData = async (search) => {
        const params = {
            search
        };
        const response = await axiosClient.get(BACKEND_URL.STAFF_COURSE_Category_ADD_ENDPOINT, { params });
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setSubmiting(true);
        const payload = {
            id: entry.id,
            name: courseCategoryName,
            description: courseCategoryDescription,
        }
        console.log(payload);
        const response = await axiosClient.post(BACKEND_URL.STAFF_COURSE_CATEGORY_EDIT_ENDPOINT.concat(`/${entry.id}`), payload)
        const courseCategory = response.data;
        alert('Edited successfully ' + courseCategory.name);
        fetchList();
        setSubmiting(false);
    }

    useEffect(() => {
        fetchCourseCategoryEditData();
    }, [])

    // console.log(initialValues);
    return (
        <Stack spacing={3}>
            <Typography variant="h6" gutterBottom>
                Edit Course Category
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
                                id='courseCategory_id'
                                name='courseCategory_id'
                                label='Course Category Id'
                                value={courseCategoryId}
                            />
                        </Grid>
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
                                Edit
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </form>
            }
        </Stack>
    );
}