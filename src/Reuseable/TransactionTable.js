import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
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
} from '@mui/material';
import { collection, getDocs, query, where } from 'firebase/firestore';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
// import CurrencyRupeeIcon from '@mui/icons-material';

// mock
import USERLIST from '../_mock/user';
import { UserMoreMenu, UserListHead } from '../sections/@dashboard/user';
import { db } from '../Firebase/fbconfig';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  // { id: 'dateandtime', label: 'Date and Time', alignRight: false },
  { id: 'from ', label: 'From', alignRight: false },
  // { id: 'to ', label: 'To', alignRight: false },
  { id: 'card', label: 'Card Title ', alignRight: false },
  { id: 'type', label: 'Card Type', alignRight: false },
  // { id: 'credited', label: 'Credited', alignRight: false },
  // { id: 'debited', label: 'Debited', alignRight: false },
  { id: 'amount', label: 'Amount', alignRight: false },
  //   { id: 'clients', label: 'Total Clients', alignRight: false },
  //   { id: 'approved', label: 'Total Approved Project', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  //   { id: 'eventprice', label: 'Portfolio Pdf', alignRight: false },
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

export default function TransactionTable({ id }) {
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

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const q1 = query(
      collection(db, 'transactions'),
      where('from_id', '==', id),
      where('payment_status', '==', 'success')
    );

    const q2 = query(
      collection(db, 'transactions'),
      where('to_id', '==', id),
      where('payment_status', '==', 'success'),
      where('is_payment_released', '==', true)
    );

    Promise.all([getDocs(q1), getDocs(q2)])
      .then(([querySnapshot1, querySnapshot2]) => {
        const arr1 = [];
        const arr2 = [];

        querySnapshot1.forEach((doc) => {
          const data = doc.data();
          const obj = {
            doc_id: doc.id,
            status: 'debited',
            ...data,
          };
          arr1.push(obj);
        });

        querySnapshot2.forEach((doc) => {
          const data = doc.data();
          const obj = {
            doc_id: doc.id,
            status: 'credited',
            ...data,
          };
          arr2.push(obj);
        });

        console.log('transactions debited:', arr1);
        console.log('transactions credited:', arr2);
        setTransactions([...arr1, ...arr2]);
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
          <TableContainer sx={{ minWidth: 900 }}>
            <Table>
              <UserListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={transactions.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {transactions.length === 0 ? (
                  <p>No Data</p>
                ) : (
                  transactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, name, pendingtask, status, mail, clients, approved, avatarUrl, isVerified } = row;
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
                            </Typography>
                          </Stack>
                        </TableCell>
                        {/* <TableCell sx={{ color: 'gray' }} align="left">
                          {row.to_name}
                        </TableCell> */}
                        <TableCell sx={{ color: 'gray' }} align="left">
                          {row.card_title}
                        </TableCell>
                        <TableCell sx={{ color: 'gray' }} align="left">
                          {row.isTeamHire ? 'TeamHire' : 'Freebie'}
                        </TableCell>
                        {/* <TableCell sx={{ color: 'gray' }} align="left">
                          10
                        </TableCell>
                        <TableCell sx={{ color: 'gray' }} align="left">
                          10
                        </TableCell> */}
                        <TableCell sx={{ color: 'gray' }} align="left">
                          {/* <CurrencyRupeeIcon /> */}
                          {row.net_amount}/-
                        </TableCell>
                        <TableCell sx={{ color: row.status === 'credited' ? 'green' : 'red' }} align="left">
                          {sentenceCase(row.status)}
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
          count={USERLIST.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Page>
  );
}
