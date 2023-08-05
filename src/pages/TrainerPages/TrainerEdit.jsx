import * as React from 'react';
import DebounceSelect from '../../sections/@dashboard/user/DebounceSelect';
import axiosClient from '../../axios-client';
import BACKEND_URL from '../../url';
import { useState } from 'react';
import { CircularProgress, Typography, Grid, Stack, TextField, Select, MenuItem } from '@mui/material';
import { useEffect } from 'react';
import { LoadingButton } from '@mui/lab';

export default function TrainerEdit({ fetchList, entry }) {

    const [isRetrieving, setRetrieving] = useState(true);
    const [isSubmiting, setSubmiting] = useState(false);

    const [trainerId, setTrainerId] = useState(entry.id);
    const [trainerName, setTrainerName] = useState('');
    const [trainerType, setTrainerType] = useState('');
    const [trainerEducation, setTrainerEducation] = useState('');
    const [trainerWorkingPlace, setTrainerWorkingPlace] = useState('');
    const [trainerPhoneNumber, setTrainerPhoneNumber] = useState('');
    const [trainerEmail, setTrainerEmail] = useState('');

    const fetchTrainerEditData = async () => {
        const response = await axiosClient.get(BACKEND_URL.STAFF_TRAINER_EDIT_ENDPOINT.concat(`/${entry.id}`))
        const { name, type, education, working_place, phone_number, email } = response.data
        setTrainerName(name);
        setTrainerType(type);
        setTrainerEducation(education);
        setTrainerWorkingPlace(working_place);
        setTrainerPhoneNumber(phone_number);
        setTrainerEmail(email);
        setRetrieving(false);
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setSubmiting(true);
        const payload = {
            name: trainerName,
            type: trainerType,
            education: trainerEducation,
            working_place: trainerWorkingPlace,
            phone_number: trainerPhoneNumber,
            email: trainerEmail,
        }
        console.log(payload);
        const response = await axiosClient.post(BACKEND_URL.STAFF_TRAINER_EDIT_ENDPOINT.concat(`/${entry.id}`), payload)
        const trainer = response.data;
        const { name, type, education, working_place, phone_number, email } = response.data
        setTrainerName(name);
        setTrainerType(type);
        setTrainerEducation(education);
        setTrainerWorkingPlace(working_place);
        setTrainerPhoneNumber(phone_number);
        setTrainerEmail(email);
        setRetrieving(false);
        alert('Edited successfully ' + trainer.name);
        fetchList();
        setSubmiting(false);
    }

    useEffect(() => {
        fetchTrainerEditData();
    }, [])

    // console.log(initialValues);
    return (
        <Stack spacing={3}>
            <Typography variant="h6" gutterBottom>
                Edit Trainer
            </Typography>
            {isRetrieving
                ? <CircularProgress />
                : <form onSubmit={handleFormSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id='trainer_name'
                                name='trainer_name'
                                label='Trainer Name'
                                value={trainerName}
                                onChange={(event) => setTrainerName(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                select
                                required
                                id='trainer_type'
                                name='trainer_type'
                                label='Trainer Type'
                                value={trainerType}
                                onChange={(event) => setTrainerType(event.target.value)}
                                fullWidth
                            >
                                <MenuItem value='Internal'>Internal</MenuItem>
                                <MenuItem value='External'>External</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                required
                                fullWidth
                                id='trainer_education'
                                name='trainer_education'
                                label='Trainer Education'
                                value={trainerEducation}
                                onChange={(event) => setTrainerEducation(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                required
                                fullWidth
                                id='trainer_working_place'
                                name='trainer_working_place'
                                label='Trainer Working Place'
                                value={trainerWorkingPlace}
                                onChange={(event) => setTrainerWorkingPlace(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id='trainer_phone_number'
                                name='trainer_phone_number'
                                label='Trainer Phone Number'
                                value={trainerPhoneNumber}
                                onChange={(event) => setTrainerPhoneNumber(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id='trainer_email'
                                name='trainer_email'
                                label='Trainer Email'
                                value={trainerEmail}
                                onChange={(event) => setTrainerEmail(event.target.value)}
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