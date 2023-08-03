import * as React from 'react';
import DebounceSelect from '../../sections/@dashboard/user/DebounceSelect';
import axiosClient from '../../axios-client';
import BACKEND_URL from '../../url';
import { useState } from 'react';
import { CircularProgress, Typography, Grid, Stack, TextField } from '@mui/material';
import { useEffect } from 'react';
import { LoadingButton } from '@mui/lab';

export default function TrainerEdit({ fetchList, entry }) {

    const [isRetrieving, setRetrieving] = useState(true);
    const [isSubmiting, setSubmiting] = useState(false);

    const [trainerId, setTrainerId] = useState(entry.id);
    const [trainerName, setTrainerName] = useState('');
    const [trainerType, setTrainerType] = useState('');
    const [trainerWorkingPlace, setTrainerWorkingPlace] = useState('');

    const fetchTrainerEditData = async () => {
        const response = await axiosClient.get(BACKEND_URL.STAFF_TRAINER_EDIT_ENDPOINT.concat(`/${entry.id}`))
        const { name, type, working_place } = response.data
        setTrainerName(name);
        setTrainerType(type);
        setTrainerWorkingPlace(working_place);
        setRetrieving(false);
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setSubmiting(true);
        const payload = {
            id: entry.id,
            name: trainerName,
            type: trainerType,
            working_place: trainerWorkingPlace,
        }
        console.log(payload);
        const response = await axiosClient.post(BACKEND_URL.STAFF_TRAINER_EDIT_ENDPOINT.concat(`/${entry.id}`), payload)
        const trainer = response.data;
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
                                disabled
                                id='trainer_id'
                                name='trainer_id'
                                label='Trainer Id'
                                value={trainerId}
                            />
                        </Grid>
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
                        <Grid item xs={12} sm={12}>
                            <TextField
                                required
                                fullWidth
                                id='working_place'
                                name='working_place'
                                label='Working Place'
                                value={trainerWorkingPlace}
                                onChange={(event) => setTrainerWorkingPlace(event.target.value)}
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