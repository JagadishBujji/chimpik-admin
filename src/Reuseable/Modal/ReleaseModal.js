import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Divider, Stack } from '@mui/material';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../Firebase/fbconfig';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  //   border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px',
};

export default function ReleaseModal({ id, open, handleClose, amountReleased, transaction }) {
  const [user, setUser] = useState({});
  const [showRelease, setShowRelease] = useState(false);

  useEffect(() => {
    const getData = async () => {
      console.log('id', id);
      const docRef = doc(db, 'UserDetails', id);
      const docSnap = await getDoc(docRef);
      const result = docSnap.data();
      if (docSnap.exists()) {
        console.log('Document data:', result);
        if (
          result.bank_details &&
          result.bank_details.IFSC_code &&
          result.bank_details.account_holder_name &&
          result.bank_details.account_number &&
          result.bank_details.account_type
        ) {
          setShowRelease(true);
        }
        setUser(result);
      } else {
        // docSnap.data() will be undefined in this case
        console.log('No such document!');
      }
    };
    getData();
  }, [id]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Bank Details
          </Typography>
          <Divider />
          <div style={{ marginTop: '20px' }}>
            <div>
              <p>
                <b>IFSC Code</b>{' '}
              </p>
              <p>{user?.bank_details?.IFSC_code || 'No Data'}</p>
            </div>
            <div>
              <p>
                <b>Account Type</b>{' '}
              </p>
              <p>{user?.bank_details?.account_type || 'No Data'}</p>
            </div>
            <div>
              <p>
                <b>Account Holder's Name</b>{' '}
              </p>
              <p>{user?.bank_details?.account_holder_name || 'No Data'}</p>
            </div>
            <div>
              <p>
                <b>Bank Account Number</b>{' '}
              </p>
              <p>{user?.bank_details?.account_number || 'No Data'}</p>
            </div>
          </div>
          <Stack spacing={2} direction="row" sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            {showRelease && (
              <Button variant="contained" onClick={() => amountReleased(transaction)}>
                Release
              </Button>
            )}
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
