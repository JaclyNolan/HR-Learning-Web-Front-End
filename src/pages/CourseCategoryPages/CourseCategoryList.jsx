import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Avatar, Box, Button, Container, Modal, Stack, TableCell, Typography } from '@mui/material';
import BACKEND_URL from "../../url";
import axiosClient from "../../axios-client";
import Iconify from "../../components/iconify/Iconify";
import UserListTable from "../../sections/@dashboard/user/UserListTable";
import CourseCategoryAdd from "./CourseCategoryAdd";
import CourseCategoryEdit from './CourseCategoryEdit';

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

const assignStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 660,
    bgcolor: 'background.paper',
    border: '0px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function CourseCategoryList() {

    const [addModalOpen, setAddModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [assignModalOpen, setAssignModalOpen] = useState(false);

    const [openEntry, setOpenEntry] = useState(null);

    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [selected, setSelected] = useState([]);

    const [orderBy, setOrderBy] = useState('name');

    const [filterName, setFilterName] = useState(''); // search keyword

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [fetchData, setFetchData] = useState(null);

    const [isFetchingData, setFetchingData] = useState(true);

    const searchText = 'Search course category by name...';

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

    const TABLE_HEAD = [
        { id: 'id', label: "Id", alignRight: false, orderable: true },
        { id: 'name', label: 'Name', alignRight: false, orderable: true },
        { id: 'description', label: 'Description', alignRight: false },
        { id: 'created_at', label: 'Created At', alignRight: false, orderable: true },
        { id: 'assign' },
        { id: 'actions' }, // Edit & Delete
    ];

    const TABLE_ROW = (courseCategory) => {
        return (<>
            <TableCell align="left">{courseCategory.id}</TableCell>


            <TableCell align="left"><Typography variant="subtitle2" noWrap>
                {courseCategory.name}
            </Typography></TableCell>

            <TableCell align="left">{courseCategory.description}</TableCell>

            <TableCell align="left">{courseCategory.created_at}</TableCell>

            <TableCell align="left"><Button variant='outlined' onClick={() => {
                handleAssignModalOpen(courseCategory);
            }}>Trainees</Button></TableCell>
        </>)
    }

    const fetchCourseCategoryData = async () => {
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
        const response = await axiosClient.get(BACKEND_URL.STAFF_COURSE_CATEGORY_INDEX_ENDPOINT, { params })
        if (fetchId !== fetchRef.current) return
        setFetchData(response.data);
        setFetchingData(false);
    }

    const deleteCourseCategory = async (id) => {
        setFetchingData(true);
        const response = await axiosClient.delete(BACKEND_URL.STAFF_COURSE_CATEGORY_DELETE_ENDPOINT.concat(`/${id}`));
        return response
    }

    const refreshTable = () => {
        if (page === 0)
            fetchCourseCategoryData();
        else
            setPage(0);
    }

    const handleAddModalOpen = () => setAddModalOpen(true);
    const handleAddModalClose = () => setAddModalOpen(false);
    const handleEditModalClose = () => setEditModalOpen(false);

    const handleAssignModalOpen = (entry) => {
        setOpenEntry(entry);
        setAssignModalOpen(true);
    } 
    const handleAssignModalClose = () => setAssignModalOpen(false);

    useEffect(() => {
        fetchCourseCategoryData();
    }, [page, orderBy, order, filterName, rowsPerPage])

    return (
        <>
            <Helmet>
                <title> Course Category Management </title>
            </Helmet>

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                    Course Category Management 
                    </Typography>
                    <Button onClick={handleAddModalOpen} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                        New Course Category
                    </Button>
                </Stack>
                <UserListTable
                    TABLE_HEAD={TABLE_HEAD}
                    TABLE_ROW={TABLE_ROW}
                    useStateData={useStateData}
                    searchText={searchText}
                    deleteEntry={deleteCourseCategory}
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
                    <CourseCategoryAdd fetchList={fetchCourseCategoryData} />
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
                    <CourseCategoryEdit fetchList={fetchCourseCategoryData} entry={openEntry} />
                </Box>
            </Modal>

        </>
    );
}