import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import { doc, getDoc } from 'firebase/firestore';

import Page from '../components/Page';
import FinancialTab from './FinancialTab';
import { db } from '../Firebase/fbconfig';

const Financial = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    // console.log('location:', location.state);
    if (location.state) {
      setUser(location.state);
    } else {
      // get user from db
      const getData = async () => {
        const docRef = doc(db, 'UserDetails', params.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // console.log('Document data:', docSnap.data());
          setUser(docSnap.data());
        } else {
          // docSnap.data() will be undefined in this case
          console.log('No such document!');
          navigate('/dashboard/user');
        }
      };

      getData();
    }
  }, [location.state]);

  return (
    <>
      {' '}
      <Page title="Financial">
        <Container maxWidth="xl">
          <Typography
            variant="h4"
            onClick={() => {
              navigate(`/dashboard/user/${params.id}`);
            }}
            className="back"
          >
            User Details <i className="fas fa-chevron-right" /> <span className="team-heading"> Financial</span>
          </Typography>
          {/* <Typography variant="h4" sx={{ mb: 5 }}>
            
          </Typography> */}
          <FinancialTab id={params.id} user={user} />
        </Container>
      </Page>
    </>
  );
};

export default Financial;
