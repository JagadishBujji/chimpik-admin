import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
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
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { db } from '../Firebase/fbconfig';

import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';

import UserTable from '../sections/@dashboard/app/UserTable';
import UpComingTabs from '../Reuseable/UpComingTabs';
import Tabs from '../Reuseable/Tabs';
import ReportedJobTabs from '../Reuseable/ReportedJobTabs';

// ----------------------------------------------------------------------

// const TABLE_HEAD = [
//   { id: 'sno', label: '', alignRight: false },
//   { id: 'name', label: 'Name', alignRight: false },
//   { id: 'email', label: 'Email', alignRight: false },
//   { id: 'address', label: 'Address', alignRight: false },
//   { id: 'gender', label: 'Gender', alignRight: false },
//   { id: 'phone_number', label: 'Phone number', alignRight: false },
//   { id: 'alternative_no', label: 'Alternative number', alignRight: false },
//   { id: 'aadhar_card', label: 'Aadhar', alignRight: false },
//   { id: 'blood_group', label: 'Blood group', alignRight: false },
//   { id: 'district', label: 'District', alignRight: false },
//   { id: 'education', label: 'Education', alignRight: false },
//   { id: 'experience', label: 'Experience', alignRight: false },
//   { id: 'landline_no', label: 'Landline number', alignRight: false },
//   { id: 'language', label: 'Language', alignRight: false },
//   { id: 'location', label: 'Location', alignRight: false },
//   { id: 'owner_name', label: 'Owner Name', alignRight: false },
//   { id: 'pan_card', label: 'Pan card', alignRight: false },
//   { id: 'specialist', label: 'Specialist', alignRight: false },
//   { id: 'studio_location', label: 'Studio Location', alignRight: false },
//   { id: 'studio_name', label: 'Studio Name', alignRight: false },
//   { id: 'studio_services', label: 'Studio services', alignRight: false },
//   { id: 'total_labours', label: 'Total labours', alignRight: false },
//   { id: 'pendingtask', label: 'Pending Task', alignRight: false },
//   { id: 'completedtask', label: 'Completed Task', alignRight: false },
//   { id: 'clients', label: 'Total Clients', alignRight: false },
//   { id: 'approved', label: 'Total Approved Project', alignRight: false, width: 150 },
//   { id: 'status', label: 'Status', alignRight: false },
//   { id: 'eventprice', label: 'Portfolio Pdf', alignRight: false },

//   { id: '' },
// ];

// ----------------------------------------------------------------------

// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function applySortFilter(array, comparator, query) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   if (query) {
//     return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
//   }
//   return stabilizedThis.map((el) => el[0]);
// }

export default function ReportJobs() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [oBy, setOBy] = useState(true);
  // const handleRequestSort = (event, property) => {
  //   console.log(property);
  //   setOBy(!oBy);
  //   if (property === 'name') {
  //     if (oBy) {
  //       const sortedObjs = users.sort((a, b) => (a.username.toLowerCase() > b.username.toLowerCase() ? 1 : -1));
  //       console.log(sortedObjs);
  //     } else {
  //       const sortedObjs = users.sort((a, b) => (a.username.toLowerCase() < b.username.toLowerCase() ? 1 : -1));
  //       console.log(sortedObjs);
  //     }
  //   }

  //   const isAsc = orderBy === property && order === 'asc';
  //   setOrder(isAsc ? 'desc' : 'asc');
  //   setOrderBy(property);
  // };

  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     const newSelecteds = USERLIST.map((n) => n.name);
  //     setSelected(newSelecteds);
  //     return;
  //   }
  //   setSelected([]);
  // };

  // const handleClick = (event, name) => {
  //   const selectedIndex = selected.indexOf(name);
  //   let newSelected = [];
  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, name);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
  //   }
  //   setSelected(newSelected);
  // };

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  // const handleFilterByName = (event) => {
  //   setFilterName(event.target.value);
  // };

  // const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  // const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  // const isUserNotFound = filteredUsers.length === 0;
  // const [count, setCount] = useState(0);
  // const [users, setUsers] = useState();
  // const [displayData, setDisplayData] = useState();
  // // console.log(selected)
  // useEffect(() => {
  //   const getData = async () => {
  //     const querySnapshot = await getDocs(collection(db, 'UserDetails'));
  //     const arr = [];
  //     querySnapshot.forEach((doc) => {
  //       const data = doc.data();
  //       // doc.data() is never undefined for query doc snapshots
  //       // console.log(doc.id, " => ", doc.data());
  //       const obj = {
  //         doc_id: doc.id,
  //         ...data,
  //       };
  //       arr.push(obj);
  //     });
  //     console.log('users:', arr);
  //     setUsers(arr);
  //     setDisplayData(arr);
  //   };
  //   getData();
  // }, [count]);

  // const handleStatus = async (changeTo, user) => {
  //   // console.log('handleStatus:', changeTo, user);
  //   // eslint-disable-next-line no-restricted-globals, no-alert
  //   if (confirm('Please click ok to update the status.')) {
  //     const userRef = doc(db, 'UserDetails', user.user_id);
  //     let updatedData = {};
  //     if (changeTo === 'active') {
  //       updatedData = {
  //         isBlocked: 'false',
  //         isInactive: 'false',
  //         isVerified: 'false',
  //       };
  //     } else if (changeTo === 'inactive') {
  //       updatedData = {
  //         isBlocked: 'false',
  //         isInactive: 'true',
  //         isVerified: 'false',
  //       };
  //     } else if (changeTo === 'block') {
  //       updatedData = {
  //         isBlocked: 'true',
  //         isInactive: 'false',
  //         isVerified: 'false',
  //       };
  //     } else if (changeTo === 'verified') {
  //       updatedData = {
  //         isBlocked: 'false',
  //         isInactive: 'false',
  //         isVerified: 'true',
  //       };
  //     }
  //     try {
  //       await updateDoc(userRef, updatedData);
  //       setDisplayData((prevState) => {
  //         const arr = [...prevState];
  //         const index = arr.findIndex((item) => item.user_id === user.user_id);
  //         arr[index] = {
  //           ...arr[index],
  //           ...updatedData,
  //         };
  //         return arr;
  //       });
  //       // eslint-disable-next-line no-alert
  //       alert('Status updated.');
  //     } catch (e) {
  //       console.log('e:', e);
  //     }
  //   }
  // };

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Reported jobs
          </Typography>
          {/* <Button variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill" />}>
            New User
          </Button> */}
        </Stack>

        {/* <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <UserTable />
          <UserListToolbar
            users={users}
            setUsers={setDisplayData}
            setSelected={setSelected}
            setCount={setCount}
            count={count}
            selected={selected}
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 1700 }}>
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
                  {displayData?.length === 0 && <p> No data available </p>}

                  {displayData?.map((row) => {
                    const isItemSelected = selected.indexOf(row.doc_id) !== -1;
                    let status = 'Active';
                    if (row.isBlocked === 'true') {
                      status = 'Blocked';
                    } else if (row.isInactive === 'true') {
                      status = 'Inactive';
                    } else if (row.isVerified === 'true') {
                      status = 'Verified';
                    }
                    return (
                      <TableRow
                        hover
                        key={row.doc_id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, row.doc_id)} />
                        </TableCell>
                        <TableCell component="th" scope="row" sx={{ padding: '10px' }}>
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={row.username} src={row.profile_pic ? row.profile_pic : ''} />
                            <Typography variant="subtitle2" noWrap>
                              {row.username}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{row.email ? row.email : ''}</TableCell>
                        <TableCell align="left">{row.address ? row.address : ''}</TableCell>
                        <TableCell align="left">{row.gender ? row.gender : ''}</TableCell>
                        <TableCell align="left">{row.phone_number ? row.phone_number : ''}</TableCell>
                        <TableCell align="left">{row.alternative_no ? row.alternative_no : ''}</TableCell>
                        <TableCell align="left">{row.aadhar_card ? row.aadhar_card : ''}</TableCell>
                        <TableCell align="left">{row.blood_group ? row.blood_group : ''}</TableCell>
                        <TableCell align="left">{row.district ? row.district : ''}</TableCell>
                        <TableCell align="left">{row.education ? row.education : ''}</TableCell>
                        <TableCell align="left">{row.experience ? row.experience : ''}</TableCell>
                        <TableCell align="left">{row.landline_no ? row.landline_no : ''}</TableCell>
                        <TableCell align="left">{row.language ? row.language : ''}</TableCell>
                        <TableCell align="left">{row.district ? row.district : '0'}</TableCell>
                        <TableCell align="left" minWidth={120}>
                          {row.pending_task ? row.pending_task : '0'}
                        </TableCell>
                        <TableCell align="left"> {row.completed_task ? row.completed_task : '0'}</TableCell>

                        <TableCell align="left">{row.total_clients ? row.total_clients : '0'}</TableCell>
                        <TableCell align="left">
                          {row.total_approved_projects ? row.total_approved_projects : '0'}
                        </TableCell>
                        <TableCell align="left">{status}</TableCell>
                        <TableCell align="left">6</TableCell>

                        <TableCell align="left">{row.owner_name ? row.owner_name : ''}</TableCell>
                        <TableCell align="left">{row.pan_card ? row.pan_card : ''}</TableCell>
                        <TableCell align="left">{row.specialist ? row.specialist : ''}</TableCell>
                        <TableCell align="left">{row.studio_location ? row.studio_location : ''}</TableCell>
                        <TableCell align="left">{row.studio_name ? row.studio_name : ''}</TableCell>
                        <TableCell align="left">{row.studio_services ? row.studio_services : ''}</TableCell>
                        <TableCell align="left">{row.total_labours ? row.total_labours : ''}</TableCell>

                        <TableCell align="right">
                          <UserMoreMenu
                            count={count}
                            setCount={setCount}
                            collection="UserDetails"
                            id={row.doc_id}
                            user={row}
                            handleStatus={handleStatus}
                          />
                        </TableCell>
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
        </Card> */}
        <ReportedJobTabs/>
      </Container>
    </Page>
  );
}
