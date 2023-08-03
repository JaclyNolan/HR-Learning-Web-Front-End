import { Label } from "@mui/icons-material";
import { Avatar, Box, Button, Card, CardActions, CardContent, Container, Divider, Grid, MenuItem, Paper, Select, Skeleton, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import BACKEND_URL from "../../url";
import { LoadingButton } from "@mui/lab";
import account from "../../_mock/account";
import useAuth from "../../hooks/useAuth";

export default function TrainerProfile() {

    const [isRetrieving, setRetrieving] = useState(false);
    const [isSubmiting, setSubmiting] = useState(false);
    const [isEditMode, setEditMode] = useState(false);
    const [initialProfileData, _setInitialProfileData] = useState({});
    const [profileData, _setProfileData] = useState({});
    const { user } = useAuth();

    const setInitialProfileData = (object) => {
        _setInitialProfileData({ ...object });
    }

    const setProfileData = (object) => {
        _setProfileData({ ...object });
    }

    useEffect(() => {
        fetchTrainerProfile();
    }, [])

    const fetchTrainerProfile = async () => {
        setRetrieving(true);
        const response = await axiosClient.get(BACKEND_URL.TRAINER_PROFILE_ENDPOINT);
        const trainer = response.data;
        setInitialProfileData(trainer);
        setProfileData(trainer);
        setRetrieving(false);
    }

    const handleEdit = () => {
        setEditMode(true);
    }

    const handleCancel = () => {
        setEditMode(false);
        setProfileData(initialProfileData);
    }

    const handleSave = async () => {
        setSubmiting(true);
        const response = await axiosClient.post(BACKEND_URL.TRAINER_PROFILE_ENDPOINT, profileData);
        const trainer = response.data;
        setInitialProfileData(trainer);
        setProfileData(trainer);
        setSubmiting(false);
        setEditMode(false);
        alert("Successfully edited your profile!");
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        profileData[name] = value;
        setProfileData(profileData);
    };

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={8} >
                    <Paper elevation={3} sx={{ padding: 3 }}>
                        <Stack spacing={2}>
                            <Typography variant="h4">
                                General Information
                            </Typography>
                            <Divider />
                            <div>
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        {!isRetrieving
                                            ? <>
                                                <Typography sx={{ mb: 1 }}>Full Name:</Typography>
                                                <TextField
                                                    required={!isEditMode}
                                                    disabled={!isEditMode || isSubmiting}
                                                    value={profileData.name}
                                                    name="name"
                                                    onChange={handleChange}
                                                    fullWidth
                                                    placeholder="Enter your name"
                                                />
                                            </>
                                            :
                                            <Stack spacing={1}>
                                                <Skeleton variant="rectangular" fullWidth height={20} />
                                                <Skeleton variant="rectangular" fullWidth height={60} />
                                            </Stack>
                                        }

                                    </Grid>
                                    <Grid item xs={6}>
                                        {!isRetrieving
                                            ? <>
                                                <Typography sx={{ mb: 1 }}>Contact Email:</Typography>
                                                <TextField
                                                    required={!isEditMode}
                                                    disabled={!isEditMode || isSubmiting}
                                                    value={profileData.email}
                                                    name="email"
                                                    onChange={handleChange}
                                                    fullWidth
                                                    placeholder="Enter your contact email"
                                                />
                                            </>
                                            :
                                            <Stack spacing={1}>
                                                <Skeleton variant="rectangular" fullWidth height={20} />
                                                <Skeleton variant="rectangular" fullWidth height={60} />
                                            </Stack>
                                        }
                                    </Grid>
                                    <Grid item xs={6}>
                                        {!isRetrieving
                                            ? <>
                                                <Typography sx={{ mb: 1 }}>Phone Number:</Typography>
                                                <TextField
                                                    required={!isEditMode}
                                                    disabled={!isEditMode || isSubmiting}
                                                    value={profileData.phone_number}
                                                    name="phone_number"
                                                    onChange={handleChange}
                                                    fullWidth
                                                    placeholder="Enter your phone number"
                                                />
                                            </>
                                            :
                                            <Stack spacing={1}>
                                                <Skeleton variant="rectangular" fullWidth height={20} />
                                                <Skeleton variant="rectangular" fullWidth height={60} />
                                            </Stack>
                                        }
                                    </Grid>
                                </Grid>
                            </div>
                            <div />
                            <div />
                            <Typography variant="h4">
                                Work Information
                            </Typography>
                            <Divider />
                            <div>
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        {!isRetrieving
                                            ? <>
                                                <Typography sx={{ mb: 1 }}>Type:</Typography>
                                                <Select
                                                    required={!isEditMode}
                                                    disabled={!isEditMode || isSubmiting}
                                                    value={profileData.type}
                                                    name="type"
                                                    onChange={handleChange}
                                                    fullWidth
                                                >
                                                    <MenuItem value='Internal'>Internal</MenuItem>
                                                    <MenuItem value='External'>External</MenuItem>
                                                </Select>
                                            </>
                                            :
                                            <Stack spacing={1}>
                                                <Skeleton variant="rectangular" fullWidth height={20} />
                                                <Skeleton variant="rectangular" fullWidth height={60} />
                                            </Stack>
                                        }
                                    </Grid>
                                    <Grid item xs={12}>
                                        {!isRetrieving
                                            ? <>
                                                <Typography sx={{ mb: 1 }}>Education:</Typography>
                                                <TextField
                                                    required={!isEditMode}
                                                    disabled={!isEditMode || isSubmiting}
                                                    value={profileData.education}
                                                    name="education"
                                                    onChange={handleChange}
                                                    fullWidth
                                                    placeholder="Enter your education"
                                                />
                                            </>
                                            :
                                            <Stack spacing={1}>
                                                <Skeleton variant="rectangular" fullWidth height={20} />
                                                <Skeleton variant="rectangular" fullWidth height={60} />
                                            </Stack>
                                        }
                                    </Grid>
                                    <Grid item xs={12}>
                                        {!isRetrieving
                                            ? <>
                                                <Typography sx={{ mb: 1 }}>Working Place:</Typography>
                                                <TextField
                                                    required={!isEditMode}
                                                    disabled={!isEditMode || isSubmiting}
                                                    value={profileData.working_place}
                                                    name="working_place"
                                                    onChange={handleChange}
                                                    fullWidth
                                                    placeholder="Enter your working place"
                                                />
                                            </>
                                            :
                                            <Stack spacing={1}>
                                                <Skeleton variant="rectangular" fullWidth height={20} />
                                                <Skeleton variant="rectangular" fullWidth height={60} />
                                            </Stack>
                                        }
                                    </Grid>
                                </Grid>
                            </div>
                        </Stack>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={4} >
                    <Stack spacing={2}>
                        <Paper elevation={3}>
                            <Card sx={{ minWidth: 275 }}>
                                <CardContent>
                                    <Stack direction={'column'} spacing={2}>
                                        {!isRetrieving
                                            ?
                                            <>
                                                <Avatar sx={{ alignSelf: 'center', width: 90, height: 90 }} src={account.photoURL} alt="photoURL" />
                                                <Typography variant="h5" component="div">
                                                    {user.name}
                                                </Typography>
                                                <Typography variant="body2" sx={{ mb: 1.5 }} color="text.secondary">
                                                    Role: {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                                    <br/>
                                                    Email: {user.email}
                                                    <br/>
                                                    Trainer name: {profileData.name}
                                                </Typography>
                                            </>
                                            :
                                            <>
                                                <Skeleton variant="circular" width={90} height={90} />
                                                <Skeleton variant="rounded" fullWidth height={20}/>
                                                <Skeleton variant="rounded" fullWidth height={20}/>
                                                <Skeleton variant="rounded" fullWidth height={20}/>
                                            </>}

                                    </Stack>
                                </CardContent>
                            </Card>
                        </Paper>
                        {!isEditMode
                            ? <LoadingButton loading={isRetrieving} sx={{ width: 70 }} variant="contained"
                                onClick={handleEdit}>Edit</LoadingButton>
                            : <Stack direction={'row'} spacing={2}>
                                <LoadingButton loading={isSubmiting} sx={{ width: 70 }} variant="contained"
                                    onClick={handleSave}>Save</LoadingButton>
                                <LoadingButton loading={isSubmiting} sx={{ width: 70 }} color="error" variant="contained"
                                    onClick={handleCancel}>Cancel</LoadingButton>
                            </Stack>
                        }
                    </Stack>
                </Grid>
            </Grid>
        </>
    )
}