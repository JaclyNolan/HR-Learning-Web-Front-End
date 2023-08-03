import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Avatar, Box, Button, Container, Modal, Stack, Table, TableCell, TableContainer, TableHead, TableRow, Typography, Card, CircularProgress, TableBody, IconButton, Collapse } from '@mui/material';
import BACKEND_URL from "../../url";
import axiosClient from "../../axios-client";
import Scrollbar from "../../components/scrollbar/Scrollbar";
import GrayBackdrop from "../../components/gray-backdrop/GrayBackdrop";
import { KeyboardArrowDown, KeyboardArrowDownOutlined, KeyboardArrowUpOutlined } from "@mui/icons-material";

const Row = (props) => {
    const { row: course } = props;
    const [open, setOpen] = useState(false);

    return (<>
        <TableRow key={course.id}>
            <TableCell align="center">
                <IconButton
                    aria-label="expand-now"
                    size="small"
                    onClick={() => setOpen(!open)}
                >
                    {open
                        ? <KeyboardArrowUpOutlined />
                        : <KeyboardArrowDownOutlined />}
                </IconButton>
            </TableCell>
            <TableCell align="left">
                {course.name}
            </TableCell>
            <TableCell align="left">
                {course.description}
            </TableCell>
            <TableCell align="left">
                {course.course_category.name}
            </TableCell>
        </TableRow>
        <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
                <Collapse in={open} timeout='auto' unmountOnExit>
                    <Box sx={{ margin: 1 }}>
                        <Typography variant="h6" gutterBottom component="div">
                            Topics of {course.name}
                        </Typography>
                        <Table size="small" aria-label="purchases">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ width: 150 }}>Topic Name</TableCell>
                                    <TableCell>Description</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {course.topics.map((topic) => (
                                    <TableRow key={topic.id}>
                                        <TableCell component="th" scope="row">
                                            {topic.name}
                                        </TableCell>
                                        <TableCell>{topic.description}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    </>)
}

export default function TrainerCourseList() {

    const [order, setOrder] = useState('asc');

    const [selected, setSelected] = useState([]);

    const [orderBy, setOrderBy] = useState('name');

    const [filterName, setFilterName] = useState(''); // search keyword

    const [fetchData, setFetchData] = useState([]);

    const [isRetrieving, setRetrieving] = useState(true);

    const fetchRef = useRef(0);

    /** 
   * @fetchData {
        "id": 6,
        "name": "occaecati",
        "description": "Sint laboriosam rerum aut rerum odio est. Provident aliquid sapiente ipsum ut unde eius. Qui non totam et eum.",
        "updated_at": "2023-07-29T08:03:02.000000Z",
        "deleted_at": null,
        "course_category_id": 2,
        "course_category": {
            "id": 2,
            "name": "nobis"
        },
        "topics": [
            {
                "id": 17,
                "name": "omnis",
                "course_id": 6
            }
        ]
    },
   * */
    const fetchCourseData = async () => {
        setRetrieving(true)
        const params = {
            sortField: orderBy,
            sortOrder: order,
            search: filterName,
        }
        fetchRef.current += 1;
        const fetchId = fetchRef.current;
        const response = await axiosClient.get(BACKEND_URL.TRAINER_COURSE_INDEX_ENDPOINT, { params })
        if (fetchId !== fetchRef.current) return
        setFetchData(response.data);
        setRetrieving(false);
    }

    useEffect(() => {
        fetchCourseData();
    }, [orderBy, order, filterName])

    return (
        <>
            <Helmet>
                <title> Your Courses </title>
            </Helmet>

            <Container>
                <Stack direction="row" alignItems="left" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Your Courses
                    </Typography>
                </Stack>

                <Card>
                    <div style={{ position: "relative" }}>
                        <Scrollbar>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center" sx={{ width: 40 }}>
                                                Topics
                                            </TableCell>
                                            <TableCell align="left" sx={{ width: 150 }}>
                                                Course Name
                                            </TableCell>
                                            <TableCell align="left">
                                                Description
                                            </TableCell>
                                            <TableCell align="left" sx={{ width: 150 }}>
                                                Category
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {fetchData.map((course) => {
                                            return <Row key={course.id} row={course} />
                                        })}
                                        {fetchData.length === 0 && <TableRow sx={{ height: 400 }}></TableRow>}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Scrollbar>
                        <GrayBackdrop open={isRetrieving} style={{ position: "absolute" }}>
                            <CircularProgress color="inherit" />
                        </GrayBackdrop>
                    </div>
                </Card>
            </Container>
        </>
    );
}