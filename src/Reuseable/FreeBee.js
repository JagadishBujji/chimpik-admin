/* eslint-disable no-nested-ternary */
import { Grid, Card, Container, Stack, Typography } from '@mui/material';
import { doc, getDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UploadedImage from './UploadedImage';
import { db } from '../Firebase/fbconfig';

const FreeBee = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState();

  useEffect(() => {
    const getData = async () => {
      console.log('id:', id);
      const docRef = doc(db, 'freebie_post', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setData(docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        alert('No such document!');
      }
    };
    getData();
  }, []);

  return (
    <>
      <Stack>
        <Stack sx={{ mb: 5 }}>
          <Typography
            variant="h4"
            onClick={() => {
              navigate('/dashboard/user');
            }}
            className="back"
          >
            FreeBee <i className="fas fa-chevron-right" /> <span className="team-heading"> Team Details</span>
          </Typography>
        </Stack>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6}>
            <Card sx={{ p: 2 }}>
              <div className="team-hirer">
                <p>
                  <b>Title </b>{' '}
                </p>
                <p>{data?.title ? data?.title : ''}</p>
              </div>
              <div className="team-hirer">
                <p>
                  <b>Description</b>{' '}
                </p>
                <p>{data?.description ? data?.description : ''}</p>
              </div>
              <div className="team-hirer">
                <p>
                  <b>Event type</b>{' '}
                </p>
                <p>{data?.event_type ? data?.event_type : ''}</p>
              </div>
              <div className="team-hirer">
                <p>
                  <b>Experience </b>{' '}
                </p>
                <p>{data?.experience ? data?.experience : ''}</p>
              </div>
              <div className="team-hirer">
                <p>
                  <b>Price </b>{' '}
                </p>
                <p>{data?.price ? data?.price : 'Not mentioned'}</p>
              </div>
              <div className="team-hirer">
                <p>
                  <b>Service </b>{' '}
                </p>
                <p>{data?.service ? data?.service : 'Not mentioned'}</p>
              </div>
              {/* <div className="team-hirer">
                <p>
                  <b>No of Checkout </b>{' '}
                </p>
                <p>5</p>
              </div> */}
              <div className="team-hirer">
                <p>
                  <b>Video gear </b>{' '}
                </p>
                <p>
                  {data?.video_gear
                    ? data?.video_gear.map((gs) => (
                        <ul key={gs.name}>
                          {gs.Name} Rs-{gs.Price}
                        </ul>
                      ))
                    : ''}
                </p>
              </div>
              <div className="team-hirer">
                <p>
                  <b>Payment Status </b>{' '}
                </p>
                <p>Paid</p>
              </div>
              <div className="team-hirer">
                <p>
                  <b>Event Price </b>{' '}
                </p>
                <p>Rs. {data?.price}/-</p>
              </div>
            </Card>
          </Grid>
          {/* <Grid item xs={12} sm={6} md={6}>
            <Card sx={{ p: 2 }}>
              <p>
                <b>Uplaoded Item</b>
              </p>
              <UploadedImage />
            </Card>
          </Grid> */}
        </Grid>
      </Stack>
    </>
  );
};

export default FreeBee;
