import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
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

// mock
import USERLIST from '../_mock/user';
import { UserMoreMenu, UserListHead } from '../sections/@dashboard/user';
import { db } from '../Firebase/fbconfig';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  // { id: 'dateandtime', label: 'Date and Time', alignRight: false },
  { id: 'from ', label: 'From ', alignRight: false },
  { id: 'card', label: 'Card Title ', alignRight: false },
  { id: 'type', label: 'Card Type', alignRight: false },
  { id: 'date', label: 'Payment Date', alignRight: false },
  { id: 'amount', label: 'Amount', alignRight: false },
  //   { id: 'clients', label: 'Total Clients', alignRight: false },
  //   { id: 'approved', label: 'Total Approved Project', alignRight: false },
  //   { id: 'status', label: 'Status', alignRight: false },
  //   { id: 'eventprice', label: 'Portfolio Pdf', alignRight: false },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderByItem) {
  if (b[orderByItem] < a[orderByItem]) {
    return -1;
  }
  if (b[orderByItem] > a[orderByItem]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderByItem) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderByItem)
    : (a, b) => -descendingComparator(a, b, orderByItem);
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

export default function EarningTable({ id }) {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderByItem, setorderByItem] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderByItem === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setorderByItem(property);
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

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderByItem), filterName);

  const isUserNotFound = filteredUsers.length === 0;
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // console.log('to_id:', id);

    const q = query(
      collection(db, 'transactions'),
      where('to_id', '==', id),
      where('is_payment_released', '==', true),
      where('payment_status', '==', 'success'),
      orderBy('payment_released_timestamp', 'desc')
    );
    getDocs(q)
      .then((querySnapshot) => {
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
        console.log('transactions earning:', arr);
        setTransactions(arr);
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  }, [id]);

  return (
    <Page title="User">
      <Card sx={{ padding: '20px' }}>
        {/* <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} /> */}

        <Scrollbar sx={{ padding: '20px' }}>
          <TableContainer sx={{ minWidth: 1300 }}>
            <Table>
              <UserListHead
                order={order}
                orderByItem={orderByItem}
                headLabel={TABLE_HEAD}
                rowCount={transactions.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {/* {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => { */}
                {transactions.length === 0 ? (
                  <p>No Data</p>
                ) : (
                  transactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, name, avatarUrl } = row;
                    const isItemSelected = selected.indexOf(name) !== -1;

                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                        // onClick={() => navigate(`/dashboard/hirer/:id`)}
                      >
                        {/* <TableCell padding="checkbox">
                        <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, name)} />
                      </TableCell> */}

                        <TableCell sx={{ color: 'gray' }} component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={name} src={avatarUrl} />
                            <Typography variant="subtitle2" noWrap>
                              {row.from_name}
                              {/* {name} */}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell sx={{ color: 'gray' }} align="left">
                          {row.card_title}
                        </TableCell>
                        <TableCell sx={{ color: 'gray' }} align="left">
                          {row.isTeamHire ? 'TeamHire' : 'Freebie'}
                        </TableCell>
                        <TableCell sx={{ color: 'gray' }} align="left">
                          {row.payment_date}
                        </TableCell>
                        <TableCell sx={{ color: 'gray' }} align="left">
                          {row.net_amount}/-
                        </TableCell>

                        {/* <TableCell sx={{ color: 'gray' }} align="right">
                        <UserMoreMenu />
                      </TableCell> */}
                      </TableRow>
                    );
                  })
                )}
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
          count={transactions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Page>
  );
}
