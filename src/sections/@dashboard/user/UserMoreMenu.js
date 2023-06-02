import { useRef, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { deleteDoc, doc } from 'firebase/firestore';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// component
import Iconify from '../../../components/Iconify';
import { db } from '../../../Firebase/fbconfig';

// ----------------------------------------------------------------------

export default function UserMoreMenu({ count, setCount, collection, id, user, handleStatus }) {
  const ref = useRef(null);
  const navigate = useNavigate();

  const [isPending, setIsPending] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = async () => {
    if (window.confirm('Are you sure want to delete')) {
      setIsPending(true);
      await deleteDoc(doc(db, collection, id))
        .then(() => {
          setCount(count + 1);
          alert('Deleted');
          setIsOpen(false);
        })
        .catch((err) => {
          alert(err);
          setIsOpen(false);
        })
        .finally(() => {
          setIsPending(true);
        });
    } else {
      setIsOpen(false);
    }
  };

  let ui = null;
  if (user.isBlocked === 'false' && user.isInactive === 'false' && user.isVerified === 'false') {
    // if (user.isVerified) {
    // console.log('corr');
    ui = (
      <div>
        <MenuItem
          component={RouterLink}
          to="#"
          sx={{ color: 'text.secondary' }}
          onClick={() => {
            setIsOpen(false);
            handleStatus('inactive', user);
          }}
        >
          <ListItemText primary="InActive" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <MenuItem
          component={RouterLink}
          to="#"
          sx={{ color: 'text.secondary' }}
          onClick={() => {
            setIsOpen(false);
            handleStatus('block', user);
          }}
        >
          <ListItemText primary="Block" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <MenuItem
          component={RouterLink}
          to="#"
          sx={{ color: 'text.secondary' }}
          onClick={() => {
            setIsOpen(false);
            handleStatus('verified', user);
          }}
        >
          <ListItemText primary="Verified" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </div>
    );
  } else if (user.isInactive === 'true') {
    ui = (
      <div>
        <MenuItem
          component={RouterLink}
          to="#"
          sx={{ color: 'text.secondary' }}
          onClick={() => {
            setIsOpen(false);
            handleStatus('active', user);
          }}
        >
          <ListItemText primary="Active" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        {/* <MenuItem
          component={RouterLink}
          to="#"
          sx={{ color: 'text.secondary' }}
          onClick={() => {
            setIsOpen(false);
            handleStatus('inactive', user);
          }}
        >
          <ListItemText primary="InActive" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem> */}
        <MenuItem
          component={RouterLink}
          to="#"
          sx={{ color: 'text.secondary' }}
          onClick={() => {
            setIsOpen(false);
            handleStatus('block', user);
          }}
        >
          <ListItemText primary="Block" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <MenuItem
          component={RouterLink}
          to="#"
          sx={{ color: 'text.secondary' }}
          onClick={() => {
            setIsOpen(false);
            handleStatus('verified', user);
          }}
        >
          <ListItemText primary="Verified" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </div>
    );
  } else if (user.isBlocked === 'true') {
    ui = (
      <div>
        <MenuItem
          component={RouterLink}
          to="#"
          sx={{ color: 'text.secondary' }}
          onClick={() => {
            setIsOpen(false);
            handleStatus('active', user);
          }}
        >
          <ListItemText primary="Active" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <MenuItem
          component={RouterLink}
          to="#"
          sx={{ color: 'text.secondary' }}
          onClick={() => {
            setIsOpen(false);
            handleStatus('inactive', user);
          }}
        >
          <ListItemText primary="InActive" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        {/* <MenuItem
          component={RouterLink}
          to="#"
          sx={{ color: 'text.secondary' }}
          onClick={() => {
            setIsOpen(false);
            handleStatus('block', user);
          }}
        >
          <ListItemText primary="Block" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem> */}
        <MenuItem
          component={RouterLink}
          to="#"
          sx={{ color: 'text.secondary' }}
          onClick={() => {
            setIsOpen(false);
            handleStatus('verified', user);
          }}
        >
          <ListItemText primary="Verified" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </div>
    );
  } else if (user.isVerified === 'true') {
    ui = (
      <div>
        <MenuItem
          component={RouterLink}
          to="#"
          sx={{ color: 'text.secondary' }}
          onClick={() => {
            setIsOpen(false);
            handleStatus('active', user);
          }}
        >
          <ListItemText primary="Active" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <MenuItem
          component={RouterLink}
          to="#"
          sx={{ color: 'text.secondary' }}
          onClick={() => {
            setIsOpen(false);
            handleStatus('inactive', user);
          }}
        >
          <ListItemText primary="InActive" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <MenuItem
          component={RouterLink}
          to="#"
          sx={{ color: 'text.secondary' }}
          onClick={() => {
            setIsOpen(false);
            handleStatus('block', user);
          }}
        >
          <ListItemText primary="Block" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        {/* <MenuItem
          component={RouterLink}
          to="#"
          sx={{ color: 'text.secondary' }}
          onClick={() => {
            setIsOpen(false);
            handleStatus('verified', user);
          }}
        >
          <ListItemText primary="Verified" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem> */}
      </div>
    );
  }

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {/* <MenuItem disabled={isPending} onClick={handleClick} sx={{ color: 'text.secondary' }}>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem> */}

        <MenuItem
          // component={RouterLink}
          // to="#"
          onClick={() => {
            console.log('navigate');
            navigate(`/dashboard/user/${id}`, { state: user });
          }}
          sx={{ color: 'text.secondary' }}
        >
          <ListItemText primary="View" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        {ui}
      </Menu>
    </>
  );
}
