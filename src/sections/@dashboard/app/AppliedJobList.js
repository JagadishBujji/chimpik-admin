import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  MenuItem,
  ListItemText,
} from '@mui/material';
import { collection, getDocs, query, orderBy as oB } from 'firebase/firestore';
import { db } from '../../../Firebase/fbconfig';
// components
import Page from '../../../components/Page';
import Label from '../../../components/Label';
import Scrollbar from '../../../components/Scrollbar';
import Iconify from '../../../components/Iconify';
import SearchNotFound from '../../../components/SearchNotFound';
import { UserListHead, UserListToolbar } from '../user';
import FeebeeMenuMore from './FeebeeMenuMore';
// mock
import USERLIST from '../../../_mock/user';

// ----------------------------------------------------------------------

// const TABLE_HEAD = [
//   { id: 'dateandtime', label: 'Date and Time', alignRight: false },
//   { id: 'name', label: ' Name ', alignRight: false },
//   { id: 'company', label: 'Event Type', alignRight: false },
//   { id: 'role', label: 'Gears List', alignRight: false },
//   { id: 'location', label: 'Location', alignRight: false },
//   { id: 'status', label: 'No of recruiter', alignRight: false },

//   { id: 'isVerified', label: 'Event Status', alignRight: false },
//   { id: 'isVerified', label: 'Payment Status', alignRight: false },
//   { id: 'eventprice', label: 'Event Price', alignRight: false },
// ];
const TABLE_HEAD = [
  { id: 'title', label: 'Hire Order ID', alignRight: false },
  { id: 'service', label: 'Event Close date', alignRight: false },
  { id: 'experience', label: 'Applied Person ID', alignRight: false },
  { id: 'video_gear', label: 'Status', alignRight: false },
  // { id: 'description', label: 'Customer Name', alignRight: false },
  // { id: 'price', label: 'Contact Number', alignRight: false },
  // { id: 'price', label: 'Address', alignRight: false },
  // { id: 'section', label: 'Order Status', alignRight: false },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function AppliedJobList() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  const navigate = useNavigate();

  const [count, setCount] = useState(0);
  const [freeBee, setFreeBee] = useState();
  const [displayData, setDisplayData] = useState();

  useEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(query(collection(db, 'appliedPerson')));
      const arr = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        const obj = {
          doc_id: doc.id,
          ...data,
        };
        arr.push(obj);
      });
      console.log('freebee: ', arr);
      setFreeBee(arr);
      setDisplayData(arr);
    };
    getData();
  }, [count]);

  return (
    <Card sx={{ padding: '20px' }}>
      {/* <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} /> */}
      <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
        Event Jobs list
      </Typography>
      <Scrollbar sx={{ padding: '20px' }}>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <UserListHead
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={displayData?.length}
              numSelected={selected.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {displayData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                // const { id, name, role, status, company, avatarUrl, isVerified } = row;
                const isItemSelected = selected.indexOf(row.title) !== -1;

                return (
                  <TableRow
                    hover
                    key={row.doc_id}
                    tabIndex={-1}
                    role="checkbox"
                    selected={isItemSelected}
                    aria-checked={isItemSelected}
                    onClick={() => navigate(`/dashboard/event/${row.doc_id}`)}
                  >
                    {/* <TableCell padding="checkbox">
                        <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, name)} />
                      </TableCell> */}
                    <TableCell sx={{ color: 'gray', width: '30%' }} align="left" padding="checkbox">
                      {row?.hireOrderId ? row?.hireOrderId : ''}
                    </TableCell>

                    <TableCell sx={{ color: 'gray', width: '25%' }} component="th" scope="row" padding="none">
                      <Stack direction="row" alignItems="center" spacing={2}>
                        {/* <Avatar alt={name} src={avatarUrl} /> */}
                        <Typography variant="subtitle2" noWrap>
                          {/* {row?.service ? row?.service?.map((fs) => `${fs} `) : ''}  */}
                          {/* service is coming as string: service: "Videography" */}
                          {row?.eventcloseDate ? row?.eventcloseDate : ''}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell sx={{ color: 'gray', width: '200px' }} align="left">
                      {row.appliedPersonUid ? row.appliedPersonUid : ''}
                    </TableCell>
                    <TableCell sx={{ color: 'gray', width: '40%' }} align="left">
                      {row.appliedStatus ? row.appliedStatus : ''}
                    </TableCell>
                    {/* <TableCell sx={{ color: 'gray', width: '30%' }} align="left">
                      {row.customerName ? row.customerName : ''}
                    </TableCell>
                    <TableCell sx={{ color: 'gray' }} align="left">
                      {row?.orderStatus}
                    </TableCell> */}
                    {/* <TableCell sx={{ color: 'gray' }} align="left">
                      {row?.section}
                    </TableCell> */}

                    {/* <TableCell onClick={(e) => e.stopPropagation()} sx={{ color: 'gray' }} align="right">
                     
                      <MenuItem
                        onClick={() => {
                          console.log('navigate');
                          navigate(`/dashboard/freebee/${row.doc_id}`);
                        }}
                        sx={{ color: 'text.secondary' }}
                      >
                        <ListItemText primary="View" primaryTypographyProps={{ variant: 'body2' }} />
                      </MenuItem>
                    </TableCell> */}
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>

            {isUserNotFound && (
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                    <SearchNotFound searchQuery={filterName} />
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Scrollbar>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={displayData?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
}
