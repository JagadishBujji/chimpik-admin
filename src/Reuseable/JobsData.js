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
import { collection, getDocs, query, where, orderBy as OB, doc, updateDoc } from 'firebase/firestore';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';

// mock
import USERLIST from '../_mock/user';
import { UserMoreMenu, UserListHead } from '../sections/@dashboard/user';
import ReleaseModal from './Modal/ReleaseModal';
import { db } from '../Firebase/fbconfig';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  // { id: 'dateandtime', label: 'Date and Time', alignRight: false },
  { id: 'from', label: 'Order Id ', alignRight: false },
  { id: 'to', label: 'Order Start Date', alignRight: false },
  { id: 'card', label: 'Order End Date', alignRight: false },
  { id: 'type', label: 'Category', alignRight: false },
  { id: 'date', label: 'Salary ', alignRight: false },
  // { id: 'clients', label: 'Total Clients', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  // { id: 'release', label: 'Release', alignRight: false },
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

export default function JobsData({ isPaymentReleased }) {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    const q = query(collection(db, 'hireDetailsList'), OB('timestamp', 'desc'));
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
        console.log('transactions payment:', arr);
        setTransactions(arr);
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  }, []);

  const amountReleased = async (transaction) => {
    // console.log('amountReleased:', transaction);
    // eslint-disable-next-line no-alert, no-restricted-globals
    if (confirm('Please confirm to release amount.') === true) {
      const transactionRef = doc(db, 'hireDetailsList');
      try {
        const currentDate = new Date();

        // Extract day, month, and year
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1; // Note: January is 0
        const year = currentDate.getFullYear();

        // Format the date
        const formattedDate = `${day}-${month}-${year}`;

        await updateDoc(transactionRef, {
          is_payment_released: true,
          payment_released_date: formattedDate,
        });
        // eslint-disable-next-line no-alert
        alert('Successfully Released.');
        setTransactions((prevState) => {
          const arr = [...prevState];
          const index = arr.findIndex((txn) => txn.docId === transaction.docId);
          arr.splice(index, 1);
          return arr;
        });
        handleClose();
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <Card sx={{ padding: '20px' }}>
      {/* <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} /> */}
      <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
        Jobs List
      </Typography>
      <Scrollbar sx={{ padding: '20px' }}>
        <TableContainer sx={{ minWidth: 1400 }}>
          <Table>
            <UserListHead
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={transactions.length}
              numSelected={selected.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
              isPaymentReleased={isPaymentReleased}
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
                      onClick={() => navigate(`/dashboard/jobs/${row.doc_id}`)}
                    >
                      {/* <TableCell padding="checkbox">
                        <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, name)} />
                      </TableCell> */}

                      <TableCell sx={{ color: 'gray' }} component="th" scope="row" padding="none">
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Avatar alt={name} src={avatarUrl} />
                          <Typography variant="subtitle2" noWrap>
                            {row.orderId}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell sx={{ color: 'gray' }} align="left">
                        {row.orderStartDate}
                      </TableCell>
                      <TableCell sx={{ color: 'gray' }} align="left">
                        {row.orderEndDate}
                      </TableCell>
                      <TableCell sx={{ color: 'gray' }} align="left">
                        {row.category}
                      </TableCell>
                      <TableCell sx={{ color: 'gray' }} align="left">
                        {row.salaryPerPerson}
                      </TableCell>
                      {/* <TableCell sx={{ color: 'gray' }} align="left">
                      {row.}
                        </TableCell> */}
                      <TableCell sx={{ color: 'gray' }} align="left">
                        <Label variant="ghost" color={(row.hireStatus === 'success' && 'success') || 'error'}>
                          {sentenceCase(row.hireStatus)}
                        </Label>
                      </TableCell>
                      {/* {!isPaymentReleased && (
                        <TableCell sx={{ color: 'gray' }} align="left">
                          <Button open={open} onClick={handleOpen}>
                            View
                          </Button>
                          {open && (
                            <ReleaseModal
                              id={row.to_id}
                              transaction={row}
                              open={open}
                              handleClose={handleClose}
                              amountReleased={amountReleased}
                            />
                          )}
                        </TableCell>
                      )} */}

                      {/* <TableCell sx={{ color: 'gray' }} align="left">
                        <img src="../images/pdf.png" alt="" width="40px" height="40px" />
                      </TableCell> */}
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
  );
}
