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

export default function CourseTraineeAssign({ fetchList, entry }) {

    const [isRetrieving, setRetrieving] = useState(true);
    const [isSubmiting, setSubmiting] = useState(false);
    const [isEditMode, setEditMode] = useState(false);

    const [initialTraineeData, _setInitialTraineeData] = useState([]);
    const [traineeData, _setTraineeData] = useState([]);

    const setInitialTraineeData = (array) => {
        _setInitialTraineeData([...array]);
    }
    const setTraineeData = (array) => {
        _setTraineeData([...array]);
    }

    useEffect(() => {
        fetchTraineesByCourse();
    }, [])

    const fetchTenTrainees = async (search) => {
        const params = {
            search
        }
        const response = await axiosClient.get(BACKEND_URL.STAFF_TRAINEE_TAKETEN_ENDPOINT, { params })
        const trainees = response.data
        return trainees.map((trainee) => ({
            ...trainee,
            value: trainee.id,
            label: `${trainee.id} ${trainee.name}`,
        }))
    }

    const fetchTraineesByCourse = async () => {
        setRetrieving(true);
        const response = await axiosClient.get(BACKEND_URL.STAFF_COURSE_EDIT_TRAINEE_ENDPOINT + `/${entry.id}`);
        console.log(response);
        const { trainees } = response.data;
        setInitialTraineeData(trainees);
        setTraineeData(trainees);
        setRetrieving(false);
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setSubmiting(true);
        const payload = {
            trainee_ids: traineeData.map((trainee) => trainee.id)
        }
        console.log('old: ', payload);
        const response = await axiosClient.post(BACKEND_URL.STAFF_COURSE_EDIT_TRAINEE_ENDPOINT.concat(`/${entry.id}`), payload)
        setSubmiting(false);
        setEditMode(false);
        const { trainees } = response.data;
        console.log('new: ', trainees)
        setInitialTraineeData(trainees);
        setTraineeData(trainees);
        alert('Edited trainees successfully of ' + entry.name);
    }

    const addTraineeToData = (newTrainee) => {
        // console.log(newTrainee)
        for (const trainee of traineeData) {
            if (trainee.id === newTrainee.id) return
        }
        setTraineeData([newTrainee, ...traineeData]);
    }

    const handleDelete = (id) => {
        const matchingIndex = traineeData.findIndex((trainee) => trainee.id === id)
        traineeData.splice(matchingIndex, 1);
        setTraineeData(traineeData);
    }

    const handleEdit = () => {
        setEditMode(true);
    }

    const handleView = () => {
        setEditMode(false);
        setTraineeData(initialTraineeData);
    }

    return (
        <Stack spacing={3}>
            <Typography variant="h6" gutterBottom>
                Trainee of {entry.name}
            </Typography>
            {isRetrieving
                ? <CircularProgress />
                : <form onSubmit={handleFormSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12}>
                            <div style={{ position: 'relative' }}>
                                <DebounceSelectForAssign
                                    id='trainee'
                                    name='trainee'
                                    label="Add a new trainee"
                                    placeholder="Search trainee by name"
                                    value={null}
                                    onChange={(value) => addTraineeToData(value)}
                                    fetchOptions={fetchTenTrainees}
                                    disableOptions={traineeData}
                                />
                                <GrayBackdrop open={!isEditMode} style={{ position: 'absolute' }} />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Typography
                                fullWidth
                                align='right'
                                variant="overline" display="block"
                                gutterBottom
                                paddingRight={2}>
                                Total Trainee: {traineeData.length}
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
                                            {traineeData.map((trainee) => {
                                                return (<TableRow hover key={trainee.id}>
                                                    <TableCell align='left'>
                                                        {trainee.id}
                                                    </TableCell>
                                                    <TableCell align='left'>
                                                        {trainee.name}
                                                    </TableCell>
                                                    {isEditMode &&
                                                        <TableCell align='left'>
                                                            <IconButton onClick={() => { handleDelete(trainee.id) }}>
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