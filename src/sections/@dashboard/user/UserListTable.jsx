import { Helmet } from 'react-helmet-async';
import { debounce, filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useMemo, useState } from 'react';
// @antd
import { Spin } from 'antd';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import Label from '../../../components/label';
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '.';
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
/** 
 * @fetchData =  {
  "current_page": 1,
  "data": [
      {...},
      ],
  "first_page_url": "http://127.0.0.1/api/...?page=1",
  "from": 1,
  "last_page": 2,
  "last_page_url": "http://127.0.0.1/api/...?page=2",
  "links": [
      {
          "url": null,
          "label": "&laquo; Previous",
          "active": false
      },
      {
          "url": "http://127.0.0.1/api/...?page=1",
          "label": "1",
          "active": true
      },
      {
          "url": "http://127.0.0.1/api/...?page=2",
          "label": "2",
          "active": false
      },
      {
          "url": "http://127.0.0.1/api/...?page=2",
          "label": "Next &raquo;",
          "active": false
      }
  ],
  "next_page_url": "http://127.0.0.1/api/...?page=2",
  "path": "http://127.0.0.1/api/...",
  "per_page": 10,
  "prev_page_url": null,
  "to": 10,
  "total": 15
}
 * */

export default function UserListTable({
  TABLE_HEAD = [],
  TABLE_ROW = () => { },
  searchText,
  useStateData = {},
  deleteEntry = async () => { },
  refreshTable
}) {
  const {
    page, setPage,
    order, setOrder,
    selected, setSelected,
    orderBy, setOrderBy,
    filterName, setFilterName,
    rowsPerPage, setRowsPerPage,
    isFetchingData, setFetchingData,
    openId, setOpenId,
    editModalOpen, setEditModalOpen,
    fetchData, setFetchData
  } = useStateData;

  const [open, setOpen] = useState(null);

  const fetchDataTotal = fetchData ? fetchData.total : 0;

  const fetchDataLength = fetchData ? fetchData.data.length : 0;

  const [fetchDataData, setFetchDataData] = useState(fetchData ? fetchData.data : [])

  useEffect(() => {
    const newFetchDataData = fetchData ? fetchData.data : []
    setFetchDataData(newFetchDataData);
  }, [fetchData])

  const handleOpenMenu = (event, id) => {
    setOpen(event.currentTarget);
    setOpenId(id);
  };

  const handleCloseMenu = () => {
    setOpen(null);
    setOpenId(null);
  };

  const handleSingleDelete = async () => {
    setOpen(null);
    setOpenId(null);
    const response = await deleteEntry(openId);
    selected.splice(selected.indexOf(openId), 1)
    refreshTable();
    alert(response.data);
  }

  const handleMultpleDelete = () => {
    let successfulDelete = 0;
    const selectedLen = selected.length;
    const deleteMultipleEntries = async (selectedId) => {
      console.log("Deleting: " + selectedId);
      await deleteEntry(selectedId);
      successfulDelete += 1;

      // Remove the entry from the selected array
      const index = selected.indexOf(selectedId);
      if (index !== -1) {
        selected.splice(index, 1);
        const newSelected = selected
        setSelected(newSelected);
      }

      // Remove the entry from the table data
      const indexToRemove = fetchDataData.findIndex((element) => element.id === selectedId);
      if (indexToRemove !== -1) {
        fetchDataData.splice(indexToRemove, 1);
        setFetchDataData([...fetchDataData]);
      }

      if (successfulDelete === selectedLen) {
        refreshTable();
        alert("All selected deleted successfully!")
      }
    }

    for (let i = selected.length - 1; i >= 0; i--) {
      const selectedId = selected[i];
      deleteMultipleEntries(selectedId);
    }
  }

  const handleRequestSort = (event, property) => {
    if (property.orderable) {
      const isAsc = orderBy === property.id && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property.id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = fetchDataData.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const debounceSetter = useMemo(() => {
    const handleFilterByName = (event) => {
      setPage(0);
      setFilterName(event.target.value);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return debounce(handleFilterByName, 700);
  })


  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - fetchDataTotal) : 0;

  const isNotFound = !fetchDataTotal && !!filterName;


  return (
    <>
      <Card>
        <UserListToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={debounceSetter}
          searchText={searchText}
          handleMultipleDelte={handleMultpleDelete} />
        <Spin spinning={isFetchingData}>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={fetchDataLength}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {fetchDataData.map((row) => {
                    const { id } = row;
                    const selectedUser = selected.indexOf(id) !== -1;

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, id)} />
                        </TableCell>

                        {TABLE_ROW(row)}

                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={(event) => {
                            handleOpenMenu(event, id);
                          }}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {/* {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )} */}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>
        </Spin>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={fetchDataTotal}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem onClick={() => { setEditModalOpen(true) }}>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }} onClick={handleSingleDelete}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
