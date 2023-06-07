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
const UserDetail = () => {
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
        const docRef = doc(db, 'orders', id);
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
              navigate('/dashboard/event');
            }}
            className="back"
          >
            Event <i className="fas fa-chevron-right" /> <span className="team-heading"> Event Details</span>
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
                      <b>Order Name</b>{' '}
                    </p>
                    <p className="pdf data">{user.orderName}</p>
                  </div>
                  <div className="team-hirer">
                    <p>
                      <b>Order Number</b>{' '}
                    </p>
                    <p className="pdf data">{user.orderNo}</p>
                  </div>
                  <div className="team-hirer">
                    <p>
                      <b>Event Location </b>{' '}
                    </p>
                    <p className="pdf data">{user.eventLocation}</p>
                  </div>
                  <div className="team-hirer">
                    <p>
                      <b>Event Start Date</b>{' '}
                    </p>
                    <p className="pdf data">{user.eventDate ? user.eventDate : 'No Data'}</p>
                  </div>
                  <div className="team-hirer">
                    <p>
                      <b>Event End Date </b>{' '}
                    </p>
                    <p className="pdf data">{user.eventEndDate ? user.eventEndDate : 'No Data'}</p>
                  </div>
                  <div className="team-hirer">
                    <p>
                      <b>Event Start</b>{' '}
                    </p>
                    <p className="pdf data">{user.eventStart ? user.eventStart : 'No Data'}</p>
                  </div>
                  <div className="team-hirer">
                    <p>
                      <b>Event Close </b>{' '}
                    </p>
                    <p className="pdf data">{user.eventClose ? user.eventClose : 'No Data'}</p>
                  </div>
                  <div className="team-hirer">
                    <p>
                      <b>Category </b>{' '}
                    </p>
                    <p className="pdf data">{user.category ? user.category : 'No Data'}</p>
                  </div>
                  <div className="team-hirer">
                    <p>
                      <b>Session </b>{' '}
                    </p>
                    <p className="pdf data">{user.session ? user.session : 'No Data'}</p>
                  </div>
                  {/* <div className="team-hirer">
                    <p>
                      <b>Language</b>{' '}
                    </p>
                    <p className="pdf data">{user.language ? user.language : 'No Data'}</p>
                  </div>
                  <div className="team-hirer">
                    <p>
                      <b>Aadhar Card </b>{' '}
                    </p>
                    <p className="pdf data">{user.aadhar_card ? user.aadhar_card : 'No Data'}</p>
                  </div>
                  <div className="team-hirer">
                    <p>
                      <b>Pan Card </b>{' '}
                    </p>
                    <p className="pdf data">{user.pan_card ? user.pan_card : 'No Data'}</p>
                  </div>
                  <div className="team-hirer">
                    <p>
                      <b>District </b>{' '}
                    </p>
                    <p className="pdf data">{user.district ? user.district : 'No Data'}</p>
                  </div>
                  <div className="team-hirer">
                    <p>
                      <b>Education </b>{' '}
                    </p>
                    <p className="pdf data">{user.education ? user.education : 'No Data'}</p>
                  </div> */}
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <div className="team-hirer">
                    <p>
                      <b>Customer Details </b>{' '}
                    </p>

                    <ol style={{ paddingLeft: '20px' }}>
                      {user?.event_type?.length === 0 ? (
                        <p className="data" style={{ paddingLeft: '0px' }}>
                          No Data
                        </p>
                      ) : (
                        user?.event_type?.map((eventType) => <li className="data">{eventType}</li>)
                      )}
                    </ol>
                  </div>
                  <div className="team-hirer">
                    <p>
                      <b>Customer Name </b>
                    </p>
                    <p className="pdf data">{user.customerName ? user.customerName : 'No Data'}</p>
                  </div>
                  <div className="team-hirer">
                    <p>
                      <b>Customer Phone Number</b>{' '}
                    </p>
                    <p className="pdf data">{user.contactNumber ? user.contactNumber : 'No Data'}</p>
                    {/* <ol style={{ paddingLeft: '20px' }}>
                      {user?.service_type?.length === 0 ? (
                        <p className="data" style={{ paddingLeft: '0px' }}>
                          No Data
                        </p>
                      ) : (
                        user?.service_type?.map((serviceType) => <li className="data">{serviceType}</li>)
                      )}
                    </ol> */}
                  </div>
                  <div className="team-hirer">
                    <p>
                      <b>Customer Address </b>{' '}
                    </p>
                    {/* <ol style={{ paddingLeft: '20px' }}>
                      <li className="pdf data"></li>
                    </ol> */}
                    <p className="pdf data">{user.address ? user.address : 'No Data'}</p>
                  </div>
                  <div className="team-hirer">
                    <p>
                      <b>Advance Amount</b>{' '}
                    </p>
                    <p className="pdf data">{user.advanceAmount ? user.advanceAmount : 'No Data'}</p>
                  </div>
                  <div className="team-hirer">
                    <p>
                      <b>Total Amount </b>{' '}
                    </p>
                    <p className="pdf data">{user.totalAmount ? user.totalAmount : 'No Data'} </p>
                  </div>

                  {/* <div className="team-hirer">
                    <p>
                      <b>Studio Services </b>{' '}
                    </p>
                    <p className="pdf data">{user.studio_services ? user.studio_services : 'No Data'} </p>
                  </div>
                  <div className="team-hirer">
                    <p>
                      <b>Camera Gear</b>{' '}
                    </p>
                    <ol style={{ paddingLeft: '0px' }}>
                      {user?.camera_gear?.length === 0 ? (
                        <p className="data" style={{ paddingLeft: '0px' }}>
                          No Data
                        </p>
                      ) : (
                        user?.camera_gear?.map((gear) => <li className="data">{gear}</li>)
                      )}
                    </ol>
                  </div>
                  <div className="team-hirer">
                    <p>
                      <b>Video Gear</b>{' '}
                    </p>
                    <ol style={{ paddingLeft: '20px' }}>
                      {user?.video_gear?.map((videoGear) => (
                        <li className="data">{videoGear}</li>
                      ))}
                    </ol>
                  </div>
                  <div className="team-hirer">
                    <p>
                      <b>Portfolio Pdf </b>{' '}
                    </p>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={user.portfolio_pdf ? user.portfolio_pdf : 'No Data'}
                      className="pdf data"
                    >
                      {user.portfolio_pdf ? user.portfolio_pdf : 'No Data'}
                    </a>
                   
                  </div>
                  {user?.bank_details && (
                    <>
                      <h3 className="bank">
                        <b>Bank Details</b>
                      </h3>
                      <div className="team-hirer">
                        <p>
                          <b>IFSC Code</b>{' '}
                        </p>
                        <p className="pdf data">
                          {user?.bank_details.IFSC_code ? user?.bank_details.IFSC_code : 'No Data'}{' '}
                        </p>
                      </div>
                      <div className="team-hirer">
                        <p>
                          <b>Account Type</b>{' '}
                        </p>
                        <p className="pdf data">
                          {user?.bank_details.account_type ? user?.bank_details.account_type : 'No Data'}{' '}
                        </p>
                      </div>
                      <div className="team-hirer">
                        <p>
                          <b>Account Holder's Name</b>{' '}
                        </p>
                        <p className="pdf data">
                          {user?.bank_details.account_holder_name ? user?.bank_details.account_holder_name : 'No Data'}{' '}
                        </p>
                      </div>
                      <div className="team-hirer">
                        <p>
                          <b>Bank Account Number</b>{' '}
                        </p>
                        <p className="pdf data">
                          {user?.bank_details.account_number ? user?.bank_details.account_number : 'No Data'}
                        </p>
                      </div>
                    </>
                  )}

                  <div className="team-hirer">
                    <Button
                      variant="contained"
                      onClick={() => {
                        navigate(`/dashboard/user/${user?.user_id}/financial`, { state: user });
                      }}
                    >
                      Financial
                    </Button>
                  </div> */}
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

export default UserDetail;
