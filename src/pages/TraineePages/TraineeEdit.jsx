import * as React from 'react';
import DebounceSelect from '../../sections/@dashboard/user/DebounceSelect';
import axiosClient from '../../axios-client';
import BACKEND_URL from '../../url';
import { useState } from 'react';
import { CircularProgress, Typography, Grid, Stack, TextField } from '@mui/material';
import { useEffect } from 'react';
import { LoadingButton } from '@mui/lab';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';

export default function TraineeEdit({ fetchList, entry }) {

    const [isRetrieving, setRetrieving] = useState(true);
    const [isSubmiting, setSubmiting] = useState(false);

    const [traineeId, setTraineeId] = useState(entry.id);
    const [traineeName, setTraineeName] = useState('');

    const [traineeAccount, setTraineeAccount] = useState('');
    const [traineeAge, setTraineeAge] = useState('');
    const [traineeDateOfBirth, setTraineeDateOfBirth] = useState(dayjs());
    const [traineeEducation, setTraineeEducation] = useState('');
    const [traineeMain, setTraineeMain] = useState('');
    const [traineeDepartment, setTraineeDepartment] = useState('');
    const [traineeToeicScore, setTraineeToeicScore] = useState('');
    const [traineeLocation, setTraineeLocation] = useState('');

    const fetchTraineeEditData = async () => {
        const response = await axiosClient.get(BACKEND_URL.STAFF_TRAINEE_EDIT_ENDPOINT.concat(`/${entry.id}`))
        const { name,account, age , date_of_birth,education,main_programming_language, toeic_score, department, location } = response.data
        setTraineeName(name);
        setTraineeAccount(account);
        setTraineeAge(age);
        setTraineeEducation(education);
        setTraineeDateOfBirth(dayjs(date_of_birth));
        setTraineeMain(main_programming_language);
        setTraineeDepartment(department);
        setTraineeToeicScore(toeic_score);
        setTraineeLocation(location);
        setRetrieving(false);
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setSubmiting(true);
        const payload = {
            id: entry.id,
            name: traineeName,
            account: traineeAccount,
            age: traineeAge,
            education: traineeEducation,
            date_of_birth: traineeDateOfBirth.format("YYYY-MM-DD").toString(),
            main_programming_language: traineeMain,
            department: traineeDepartment,
            toeic_score: traineeToeicScore,
            location: traineeLocation,
        }
        console.log(payload);
        const response = await axiosClient.post(BACKEND_URL.STAFF_TRAINEE_EDIT_ENDPOINT.concat(`/${entry.id}`), payload)
        const trainee = response.data;
        alert('Edited successfully ' + trainee.name);
        fetchList();
        setSubmiting(false);
    }

    useEffect(() => {
        fetchTraineeEditData();
    }, [])

    // console.log(initialValues);
    return (
        <Stack spacing={3}>
            <Typography variant="h6" gutterBottom>
                Edit Trainee
            </Typography>
            {isRetrieving
                ? <CircularProgress />
                : <form onSubmit={handleFormSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                required
                                sx={{width: 100}}
                                disabled
                                id='trainee_id'
                                name='trainee_id'
                                label='Trainee Id'
                                value={traineeId}
                            />
                        </Grid>
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
                                id='account'
                                name='account'
                                label='Account'
                                value={traineeAccount}
                                onChange={(event) => setTraineeAccount(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                required
                                fullWidth
                                id='trainee_age'
                                name='trainee_age'
                                label='Age'
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
                                id='education'
                                name='education'
                                label='Education'
                                value={traineeEducation}
                                onChange={(event) => setTraineeEducation(event.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id='main_programming_language'
                                name='main_programming_language'
                                label='Main'
                                value={traineeMain}
                                onChange={(event) => setTraineeMain(event.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id='toeic_score'
                                name='toeic_score'
                                label='Toeic Score'
                                value={traineeToeicScore}
                                onChange={(event) => setTraineeToeicScore(event.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <TextField
                                required
                                fullWidth
                                id='department'
                                name='department'
                                label='Department'
                                value={traineeDepartment}
                                onChange={(event) => setTraineeDepartment(event.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <TextField
                                required
                                fullWidth
                                id='location'
                                name='location'
                                label='Location'
                                value={traineeLocation}
                                onChange={(event) => setTraineeLocation(event.target.value)}
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