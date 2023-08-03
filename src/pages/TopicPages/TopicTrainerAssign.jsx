import * as React from 'react';
import DebounceSelect from './../../sections/@dashboard/user/DebounceSelect';
import axiosClient from '../../axios-client';
import BACKEND_URL from './../../url';
import { useState } from 'react';
import { CircularProgress, Typography, Grid, Stack, TextField, Autocomplete, TableContainer, Table, TableRow, TableHead, Checkbox, TableCell, TableBody, IconButton } from '@mui/material';
import { useEffect } from 'react';
import { LoadingButton } from '@mui/lab';
import { AutoComplete } from 'antd';
import DebounceSelectForAssign from './../../sections/@dashboard/user/DebounceMultipleSelect';
import Iconify from './../../components/iconify/Iconify';
import GrayBackdrop from '../../components/gray-backdrop';

export default function TopicTrainerAssign({ fetchList, entry }) {

    const [isRetrieving, setRetrieving] = useState(true);
    const [isSubmiting, setSubmiting] = useState(false);
    const [isEditMode, setEditMode] = useState(false);

    const [initialTrainerData, _setInitialTrainerData] = useState([]);
    const [trainerData, _setTrainerData] = useState([]);

    const setInitialTrainerData = (array) => {
        _setInitialTrainerData([...array]);
    }
    const setTrainerData = (array) => {
        _setTrainerData([...array]);
    }

    useEffect(() => {
        fetchTrainersByTopic();
    }, [])

    const fetchTenTrainers = async (search) => {
        const params = {
            search
        }
        const response = await axiosClient.get(BACKEND_URL.STAFF_TRAINER_TAKETEN_ENDPOINT, { params })
        const trainers = response.data
        return trainers.map((trainer) => ({
            ...trainer,
            value: trainer.id,
            label: `${trainer.id} ${trainer.name}`,
        }))
    }

    const fetchTrainersByTopic = async () => {
        setRetrieving(true);
        const response = await axiosClient.get(BACKEND_URL.STAFF_TOPIC_EDIT_TRAINER_ENDPOINT + `/${entry.id}`);
        console.log(response);
        const { trainers } = response.data;
        setInitialTrainerData(trainers);
        setTrainerData(trainers);
        setRetrieving(false);
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setSubmiting(true);
        const payload = {
            trainer_ids: trainerData.map((trainer) => trainer.id)
        }
        console.log('old: ', payload);
        const response = await axiosClient.post(BACKEND_URL.STAFF_TOPIC_EDIT_TRAINER_ENDPOINT.concat(`/${entry.id}`), payload)
        setSubmiting(false);
        setEditMode(false);
        const { trainers } = response.data;
        console.log('new: ', trainers)
        setInitialTrainerData(trainers);
        setTrainerData(trainers);
        alert('Edited trainers successfully of ' + entry.name);
    }

    const addTrainerToData = (newTrainer) => {
        for (const trainer of trainerData) {
            if (trainer.id === newTrainer.id) return
        }
        setTrainerData([newTrainer, ...trainerData]);
    }

    const handleDelete = (id) => {
        const matchingIndex = trainerData.findIndex((trainer) => trainer.id === id)
        trainerData.splice(matchingIndex, 1);
        setTrainerData(trainerData);
    }

    const handleEdit = () => {
        setEditMode(true);
    }

    const handleView = () => {
        setEditMode(false);
        setTrainerData(initialTrainerData);
    }

    return (
        <Stack spacing={3}>
            <Typography variant="h6" gutterBottom>
                Trainers of {entry.name}
            </Typography>
            {isRetrieving
                ? <CircularProgress />
                : <form onSubmit={handleFormSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12}>
                            <div style={{ position: 'relative' }}>
                                <DebounceSelectForAssign
                                    id='trainer'
                                    name='trainer'
                                    label="Add a new trainer"
                                    placeholder="Search trainer by name"
                                    value={null}
                                    onChange={(value) => addTrainerToData(value)}
                                    fetchOptions={fetchTenTrainers}
                                    disableOptions={trainerData}
                                />
                                <GrayBackdrop open={!isEditMode} style={{ position: 'absolute' }} />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Typography
                                align='right'
                                variant="overline" display="block"
                                gutterBottom
                                paddingRight={2}>
                                Total Trainer: {trainerData.length}
                            </Typography>

                            <div style={{ position: 'relative' }}>
                                <TableContainer sx={{ height: 400 }}>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align='left'>
                                                    Id
                                                </TableCell>
                                                <TableCell align='left'>
                                                    Name
                                                </TableCell>
                                                {isEditMode &&
                                                    <TableCell align='left' width={20}>
                                                        Action
                                                    </TableCell>}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {trainerData.map((trainer) => {
                                                return (<TableRow hover key={trainer.id}>
                                                    <TableCell align='left'>
                                                        {trainer.id}
                                                    </TableCell>
                                                    <TableCell align='left'>
                                                        {trainer.name}
                                                    </TableCell>
                                                    {isEditMode &&
                                                        <TableCell align='left'>
                                                            <IconButton onClick={() => { handleDelete(trainer.id) }}>
                                                                <Iconify icon="eva:trash-2-fill" />
                                                            </IconButton>
                                                        </TableCell>
                                                    }
                                                </TableRow>)
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <GrayBackdrop open={!isEditMode} style={{ position: 'absolute' }} />
                            </div>
                        </Grid>
                        {!isEditMode
                            ?
                            <Grid item sm={6} xs={6}>
                                <LoadingButton id='edit' onClick={handleEdit} fullWidth size="large" variant="contained">
                                    Edit
                                </LoadingButton>
                            </Grid>
                            : <>
                                <Grid item sm={6} xs={6}>
                                    <LoadingButton id='save' type='submit' loading={isSubmiting} fullWidth size="large" variant="contained">
                                        Save
                                    </LoadingButton>
                                </Grid>
                                <Grid item sm={6} xs={6}>
                                    <LoadingButton id='cancel' onClick={handleView} loading={isSubmiting} color='error' fullWidth size="large" variant="contained">
                                        Cancel
                                    </LoadingButton>
                                </Grid></>}

                    </Grid>
                </form>
            }
        </Stack>
    );
}