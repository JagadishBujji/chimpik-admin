import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { collection, getDocs, query, orderBy as oB } from 'firebase/firestore';
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
} from '@mui/material';
// components
import Page from '../../../components/Page';
import Label from '../../../components/Label';
import Scrollbar from '../../../components/Scrollbar';
import Iconify from '../../../components/Iconify';
import SearchNotFound from '../../../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../user';
// mock
import USERLIST from '../../../_mock/user';
import DashboardMoreMenu from '../../../Reuseable/DashboardMoreMenu';
import { db } from '../../../Firebase/fbconfig';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'User Name ', alignRight: false },
  { id: 'company', label: 'Phone Number', alignRight: false },
  { id: 'camera gear', label: 'Address', alignRight: false },
  { id: 'video_gear', label: 'Profession', alignRight: false },
  { id: 'description', label: 'Experience', alignRight: false },
  // { id: 'posted_on', label: 'Posted on', alignRight: false },
  // { id: 'dateandtime', label: 'Start Date and Time', alignRight: false },
  // { id: 'end_date', label: 'End date and time', alignRight: false },
  // { id: 'event_location', label: 'Event location', alignRight: false },
  // { id: 'event_status', label: 'Event status', alignRight: false },
  // { id: 'experience', label: 'Experience', alignRight: false },
  // { id: 'invitation_url', label: 'Invitation Link', alignRight: false },
  // { id: 'eventprice', label: 'Event Price', alignRight: false },
  // { id: 'section', label: 'Section', alignRight: false },
  // { id: 'services', label: 'Services', alignRight: false },
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

export default function OrderTrackingTable() {
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
  const [teamHire, setTeamHire] = useState();
  const [displayData, setDisplayData] = useState();

  useEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(query(collection(db, 'userDetails')));
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
      console.log("userDetails:".arr);
      setTeamHire(arr);
      setDisplayData(arr);
    };
    getData();
  }, [count]);

  return (
    <Card sx={{ padding: '20px' }}>
      {/* <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} /> */}
      <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
        User List
      </Typography>
      <Scrollbar sx={{ padding: '20px' }}>
        <TableContainer sx={{ width: '100%' }}>
          <Table>
            <UserListHead
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={USERLIST.length}
              numSelected={selected.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {displayData &&
                displayData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  const { id, name, role, status, company, avatarUrl, isVerified } = row;
                  const isItemSelected = selected.indexOf(row.title) !== -1;

                  return (
                    <TableRow
                      hover
                      key={row.doc_id}
                      tabIndex={-1}
                      role="checkbox"
                      selected={isItemSelected}
                      aria-checked={isItemSelected}
                      // onClick={() => navigate(`/dashboard/hirer/:id`)}
                      onClick={() => navigate(`/dashboard/user/${row.doc_id}`)}
                    >
                      {/* <TableCell padding="checkbox">
                        <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, name)} />
                      </TableCell> */}

                      <TableCell sx={{ color: 'gray', width: '100px' }} component="th" scope="row" padding="none">
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Avatar alt={name} src={avatarUrl} />
                          <Typography variant="subtitle2" noWrap>
                            {row.userName}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell sx={{ color: 'gray', width: '150px' }} align="left">
                        {row.ContactID ? row.ContactID : ''}
                      </TableCell>
                      <TableCell sx={{ color: 'gray', width: '200px' }} align="left">
                        {row.address ? row.address : ''}
                      </TableCell>
                      <TableCell sx={{ color: 'gray', width: '200px' }} align="left">
                        {row.profession ? row.profession : ''}
                      </TableCell>

                      <TableCell sx={{ color: 'gray', width: '200px' }} align="left">
                        {row.experience ? row.experience : ''}
                      </TableCell>
                      {/* <TableCell sx={{ color: 'gray', width: '150px' }} align="left" padding="checkbox">
                        {row.posted_on_date ? row.posted_on_date : ''}
                      </TableCell>
                      <TableCell sx={{ color: 'gray', width: '300px' }} align="left" padding="checkbox">
                        {row.start_date ? row.start_date : ''} {row.start_time ? row.start_time : ''}
                      </TableCell>
                      <TableCell sx={{ color: 'gray', width: '300px' }} align="left">
                        {row.end_date ? row.end_date : ''} {row.end_time ? row.end_time : ''}
                      </TableCell>
                      <TableCell sx={{ color: 'gray' }} align="left">
                        {row.event_loc_link ? row.event_loc_link : ''}
                      </TableCell>
                      <TableCell sx={{ color: 'gray', width: '200px' }} align="left">
                        <Label variant="ghost" color={(row === 'banned' && 'error') || 'success'}>
                          {sentenceCase(row?.event_status)}
                        </Label>
                      </TableCell>
                      <TableCell sx={{ color: 'gray', width: '200px' }} align="left">
                        {row.experience ? row.experience : ''}
                      </TableCell>
                      <TableCell
                        onClick={(e) => e.stopPropagation()}
                        sx={{ color: 'gray', width: '200px' }}
                        align="left"
                      >
                        {row.invitation_url.length > 0 ? (
                          <a href={row.invitation_url[0]} target="_blank" rel="noreferrer">
                            {' '}
                            Link{' '}
                          </a>
                        ) : (
                          'No link provided'
                        )}
                      </TableCell>
                      <TableCell sx={{ color: 'gray', width: '200px' }} align="left">
                        {row.price ? row.price : ''}
                      </TableCell>
                      <TableCell sx={{ color: 'gray', width: '200px' }} align="left">
                        {row.section ? row.section : ''}
                      </TableCell>
                      <TableCell sx={{ color: 'gray', width: '200px' }} align="left">
                        {row.service ? row.service : ''}
                      </TableCell> */}
                      {/*  <TableCell sx={{ color: 'gray' }} align="left">
                        chennai
                      </TableCell>
                      <TableCell sx={{ color: 'gray' }} align="left">
                        {isVerified ? 'Yes' : 'No'}
                      </TableCell>
                      <TableCell sx={{ color: 'gray' }} align="left">
                        {isVerified ? 'Yes' : 'No'}
                      </TableCell>

                      <TableCell sx={{ color: 'gray' }} align="left">
                        <Label variant="ghost" color={(status === 'banned' && 'error') || 'success'}>
                          {sentenceCase(status)}
                        </Label>
                      </TableCell>
                      <TableCell sx={{ color: 'gray' }} align="left">
                        <Label variant="ghost" color={(status === 'banned' && 'error') || 'success'}>
                          {sentenceCase(status)}
                        </Label>
                      </TableCell>
                      <TableCell sx={{ color: 'gray' }} align="left">
                        2000/-
                      </TableCell>
                      <TableCell sx={{ color: 'gray' }} align="right">
                        <DashboardMoreMenu />
                      </TableCell> */}
                      {/* <TableCell onClick={(e)=>e.stopPropagation()} sx={{ color: 'gray' }} align="right">
                        <UserMoreMenu count={count} setCount={setCount} collection="team_hire_post" id={row.doc_id} />
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
        count={USERLIST.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
}
