import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Avatar, Box, Button, Container, Modal, Stack, TableCell, Typography } from '@mui/material';
import BACKEND_URL from "../../url";
import axiosClient from "../../axios-client";
import Iconify from "../../components/iconify/Iconify";
import UserListTable from "../../sections/@dashboard/user/UserListTable";
import UserAdd from "./UserAdd";
import UserEdit from './UserEdit';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 552,
    bgcolor: 'background.paper',
    border: '0px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function UserList() {

    const [addModalOpen, setAddModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);

    const [openEntry, setOpenEntry] = useState(null);

    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [selected, setSelected] = useState([]);

    const [orderBy, setOrderBy] = useState('name');

    const [filterName, setFilterName] = useState(''); // search keyword

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [fetchData, setFetchData] = useState(null);

    const [isFetchingData, setFetchingData] = useState(true);

    const searchText = 'Search user by name...';

    const fetchRef = useRef(0);

    const useStateData = {
        page, setPage,
        order, setOrder,
        selected, setSelected,
        orderBy, setOrderBy,
        filterName, setFilterName,
        rowsPerPage, setRowsPerPage,
        isFetchingData, setFetchingData,
        openEntry, setOpenEntry,
        editModalOpen, setEditModalOpen,
        fetchData, setFetchData
    }

    const getRoleName = (role_id) => {
        if (role_id === 1) {
          return 'Admin';
        } else if (role_id === 2) {
          return 'Staff';
        } else if (role_id === 3) {
          return 'Trainer';
        } else {
          return 'Unknown';
        }
      };

    const TABLE_HEAD = [
        { id: 'id', label: "Id", alignRight: false, orderable: true },
        { id: 'name', label: 'Name', alignRight: false, orderable: true },
        { id: 'email', label: 'Email', alignRight: false,},
        { id: 'role_id', label: 'Role', alignRight: false,},
        { id: 'trainer.name', label: 'Trainer', alignRight: false },
        { id: 'created_at', label: 'Created At', alignRight: false, orderable: true },
        { id: 'actions' }, // Edit & Delete
    ];

    const TABLE_ROW = (user) => {
        return (<>
            <TableCell align="left">{user.id}</TableCell>


            <TableCell align="left"><Typography variant="subtitle2" noWrap>
                {user.name}
            </Typography></TableCell>
            <TableCell align="left">{user.email}</TableCell>
            <TableCell align="left">{getRoleName(user.role_id)}</TableCell>
            <TableCell align="left">{user.trainer?.name}</TableCell>

            <TableCell align="left">{user.created_at}</TableCell>

        </>)
    }

    const fetchUserData = async () => {
        setFetchingData(true)
        const pagePlusOne = page + 1;
        const params = {
            page: pagePlusOne,
            sortField: orderBy,
            sortOrder: order,
            search: filterName,
            perPage: rowsPerPage,
        }
        fetchRef.current += 1;
        const fetchId = fetchRef.current;
        const response = await axiosClient.get(BACKEND_URL.ADMIN_USER_INDEX_ENDPOINT, { params })
        if (fetchId !== fetchRef.current) return
        setFetchData(response.data);
        setFetchingData(false);
    }

    const deleteUser = async (id) => {
        setFetchingData(true);
        const response = await axiosClient.delete(BACKEND_URL.ADMIN_USER_DELETE_ENDPOINT.concat(`/${id}`));
        return response
    }

    const refreshTable = () => {
        if (page === 0)
            fetchUserData();
        else
            setPage(0);
    }

    const handleAddModalOpen = () => setAddModalOpen(true);
    const handleAddModalClose = () => setAddModalOpen(false);
    const handleEditModalClose = () => setEditModalOpen(false);

    useEffect(() => {
        fetchUserData();
    }, [page, orderBy, order, filterName, rowsPerPage])

    return (
        <>
            <Helmet>
                <title> User Management </title>
            </Helmet>

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                    User Management 
                    </Typography>
                    <Button onClick={handleAddModalOpen} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                        New User
                    </Button>
                </Stack>
                <UserListTable
                    TABLE_HEAD={TABLE_HEAD}
                    TABLE_ROW={TABLE_ROW}
                    useStateData={useStateData}
                    searchText={searchText}
                    deleteEntry={deleteUser}
                    refreshTable={refreshTable}
                />
            </Container>
            <Modal
                key='add'
                open={addModalOpen}
                onClose={handleAddModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <UserAdd fetchList={fetchUserData} />
                </Box>
            </Modal>

            <Modal
                key='edit'
                open={editModalOpen}
                onClose={handleEditModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <UserEdit fetchList={fetchUserData} entry={openEntry} />
                </Box>
            </Modal>

        </>
    );
}