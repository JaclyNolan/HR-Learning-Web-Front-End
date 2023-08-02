import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Avatar, Box, Button, Container, Modal, Stack, TableCell, Typography } from '@mui/material';
import BACKEND_URL from "../../url";
import axiosClient from "../../axios-client";
import Iconify from "../../components/iconify/Iconify";
import UserListTable from "../../sections/@dashboard/user/UserListTable";
import CourseAdd from "./CourseAdd";
import CourseEdit from './CourseEdit';
import CourseTraineeAssign from "./CourseTraineeAssign";

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

export default function CourseList() {

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

    const searchText = 'Search course by name...';

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
        { id: 'course_category.name', label: 'Category', alignRight: false },
        { id: 'created_at', label: 'Created At', alignRight: false, orderable: true },
        { id: 'assign' },
        { id: 'actions' }, // Edit & Delete
    ];

    const TABLE_ROW = (course) => {
        return (<>
            <TableCell align="left">{course.id}</TableCell>

            {/* <TableCell component="th" scope="row" padding="none">
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar alt={course.name} src={avatarUrl} />
                    <Typography variant="subtitle2" noWrap>
                        {course.name}
                    </Typography>
                </Stack>
            </TableCell> */}

            <TableCell align="left"><Typography variant="subtitle2" noWrap>
                {course.name}
            </Typography></TableCell>

            <TableCell align="left">{course.description}</TableCell>

            <TableCell align="left">{course.course_category.name}</TableCell>

            <TableCell align="left">{course.created_at}</TableCell>

            <TableCell align="left"><Button variant='outlined' onClick={() => {
                handleAssignModalOpen(course);
            }}>Trainees</Button></TableCell>
        </>)
    }
    /** 
   * @fetchData =  {
    "current_page": 1,
    "data": [
        {
            "id": 2,
            "name": "autem",
            "description": "Aspernatur dolore omnis rerum. Aperiam voluptatem debitis sit commodi. Corporis et mollitia labore inventore molestias.",
            "created_at": "2023-07-25T06:56:19.000000Z",
            "updated_at": "2023-07-25T06:56:19.000000Z",
            "deleted_at": null,
            "course_category_id": 1,
            "course_category": {
                "id": 1,
                "name": "dolores"
            }
        },
        ],
    "first_page_url": "http://127.0.0.1/api/staff/courses?page=1",
    "from": 1,
    "last_page": 2,
    "last_page_url": "http://127.0.0.1/api/staff/courses?page=2",
    "links": [
        {
            "url": null,
            "label": "&laquo; Previous",
            "active": false
        },
        {
            "url": "http://127.0.0.1/api/staff/courses?page=1",
            "label": "1",
            "active": true
        },
        {
            "url": "http://127.0.0.1/api/staff/courses?page=2",
            "label": "2",
            "active": false
        },
        {
            "url": "http://127.0.0.1/api/staff/courses?page=2",
            "label": "Next &raquo;",
            "active": false
        }
    ],
    "next_page_url": "http://127.0.0.1/api/staff/courses?page=2",
    "path": "http://127.0.0.1/api/staff/courses",
    "per_page": 10,
    "prev_page_url": null,
    "to": 10,
    "total": 15
}
   * */
    const fetchCourseData = async () => {
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
        const response = await axiosClient.get(BACKEND_URL.STAFF_COURSE_INDEX_ENDPOINT, { params })
        if (fetchId !== fetchRef.current) return
        setFetchData(response.data);
        setFetchingData(false);
    }

    const deleteCourse = async (id) => {
        setFetchingData(true);
        const response = await axiosClient.delete(BACKEND_URL.STAFF_COURSE_DELETE_ENDPOINT.concat(`/${id}`));
        return response
    }

    const refreshTable = () => {
        if (page === 0)
            fetchCourseData();
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
        fetchCourseData();
    }, [page, orderBy, order, filterName, rowsPerPage])

    return (
        <>
            <Helmet>
                <title> Course Management </title>
            </Helmet>

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Course Management
                    </Typography>
                    <Button onClick={handleAddModalOpen} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                        New Course
                    </Button>
                </Stack>
                <UserListTable
                    TABLE_HEAD={TABLE_HEAD}
                    TABLE_ROW={TABLE_ROW}
                    useStateData={useStateData}
                    searchText={searchText}
                    deleteEntry={deleteCourse}
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
                    <CourseAdd fetchList={fetchCourseData} />
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
                    <CourseEdit fetchList={fetchCourseData} entry={openEntry} />
                </Box>
            </Modal>

            <Modal
                key='assign'
                open={assignModalOpen}
                onClose={handleAssignModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={assignStyle}>
                    <CourseTraineeAssign fetchList={fetchCourseData} entry={openEntry}/>
                </Box>
            </Modal>
        </>
    );
}