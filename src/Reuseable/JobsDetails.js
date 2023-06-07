import { useEffect, useState } from 'react';
import { Grid, Card, Container, Stack, Typography, Button } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../Firebase/fbconfig';
import UploadedImage from './UploadedImage';

const images = [
  {
    imageUrl: '/images/pdf.png',
  },
];
const JobsDetails = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const location = useLocation();
  const { id } = useParams();

  useEffect(() => {
    // console.log('state:', location.state, location, id);
    if (location.state) {
      setUser(location.state);
    } else {
      const getData = async () => {
        const docRef = doc(db, 'hireDetailsList', id);
        const docSnap = await getDoc(docRef);
        const result = docSnap.data();
        // console.log('user: ', result);
        setUser(result);
      };
      getData();
    }
  }, [id, location]);

  return (
    <>
      <Stack>
        <Stack sx={{ mb: 5 }}>
          <Typography
            variant="h4"
            onClick={() => {
              navigate('/dashboard/jobs');
            }}
            className="back"
          >
            Jobs <i className="fas fa-chevron-right" /> <span className="team-heading"> Jobs Details</span>
          </Typography>
        </Stack>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={7}>
            <Card sx={{ p: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={6}>
                  {/* <div className="team-hirer">
                    <p>
                      <b>Profile Pic</b>{' '}
                    </p>
                    <img
                      src={user.profile_pic ? user.profile_pic : 'No Data'}
                      alt=""
                      width="80"
                      height="80"
                      className="img-upload1"
                    />
                  </div> */}
                  <div className="team-hirer">
                    <p>
                      <b>Order ID</b>{' '}
                    </p>
                    <p className="pdf data">{user.orderId}</p>
                  </div>
                  <div className="team-hirer">
                    <p>
                      <b>Order Start Date</b>{' '}
                    </p>
                    <p className="pdf data">{user.orderStartDate}</p>
                  </div>
                  <div className="team-hirer">
                    <p>
                      <b>Order End Date </b>{' '}
                    </p>
                    <p className="pdf data">{user.orderEndDate}</p>
                  </div>
                  <div className="team-hirer">
                    <p>
                      <b>Event Start Date</b>{' '}
                    </p>
                    <p className="pdf data">{user.eventDate ? user.eventDate : 'No Data'}</p>
                  </div>
                  <div className="team-hirer">
                    <p>
                      <b>Category</b>{' '}
                    </p>
                    <p className="pdf data">{user.category ? user.category : 'No Data'}</p>
                  </div>
                  <div className="team-hirer">
                    <p>
                      <b>Salary</b>{' '}
                    </p>
                    <p className="pdf data">{user.salaryPerPerson ? user.salaryPerPerson : 'No Data'}</p>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <div className="team-hirer">
                    <p>
                      <b>Status </b>{' '}
                    </p>
                    <p className="pdf data">{user.hireStatus ? user.hireStatus : 'No Data'}</p>
                  </div>
                  <div className="team-hirer">
                    <p>
                      <b>Category </b>{' '}
                    </p>
                    <p className="pdf data">{user.category ? user.category : 'No Data'}</p>
                  </div>
                  <div className="team-hirer">
                    <p>
                      <b>Job Created time and date </b>{' '}
                    </p>
                    <p className="pdf data">{user.timestamp ? user.timestamp : 'No Data'}</p>
                  </div>
                  <div className="team-hirer">
                    <p>
                      <b>Job Open</b>{' '}
                    </p>
                    <p className="pdf data">{user.jobOpen ? user.jobOpen : 'No Data'}</p>
                  </div>
                  <div className="team-hirer">
                    <p>
                      <b>Gadgets </b>{' '}
                    </p>
                    <ol style={{ paddingLeft: '20px' }}>
                      <li className="pdf data">{user.needeGadgets ? user.needeGadgets : 'No Data'}</li>
                    </ol>
                  </div>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={5}>
            <Card sx={{ p: 2 }}>
              <p>
                <b>Invitation Card</b>
              </p>
              <UploadedImage url={images} />
            </Card>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
};

export default JobsDetails;
