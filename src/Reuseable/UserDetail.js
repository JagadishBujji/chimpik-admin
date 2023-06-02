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
        const docRef = doc(db, 'UserDetails', id);
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
              navigate('/dashboard/user');
            }}
            className="back"
          >
            User <i className="fas fa-chevron-right" /> <span className="team-heading"> User Details</span>
          </Typography>
        </Stack>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={7}>
            <Card sx={{ p: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={6}>
                  <div className="team-hirer">
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
                  </div>
                  <div className="team-hirer">
                    <p>
                      <b>User Name</b>{' '}
                    </p>
                    <p className="pdf data">{user.username}</p>
                  </div>
                  <div className="team-hirer">
                    <p>
                      <b>User Email</b>{' '}
                    </p>
                    <p className="pdf data">{user.email}</p>
                  </div>
                  <div className="team-hirer">
                    <p>
                      <b>Location </b>{' '}
                    </p>
                    <p className="pdf data">{user.district}</p>
                  </div>
                  <div className="team-hirer">
                    <p>
                      <b>Landline no </b>{' '}
                    </p>
                    <p className="pdf data">{user.landline_no ? user.landline_no : 'No Data'}</p>
                  </div>
                  <div className="team-hirer">
                    <p>
                      <b>Phone Number </b>{' '}
                    </p>
                    <p className="pdf data">{user.phone_number ? user.phone_number : 'No Data'}</p>
                  </div>
                  <div className="team-hirer">
                    <p>
                      <b>Alternative No </b>{' '}
                    </p>
                    <p className="pdf data">{user.alternative_no ? user.alternative_no : 'No Data'}</p>
                  </div>
                  <div className="team-hirer">
                    <p>
                      <b>Gender </b>{' '}
                    </p>
                    <p className="pdf data">{user.gender ? user.gender : 'No Data'}</p>
                  </div>
                  <div className="team-hirer">
                    <p>
                      <b>Blood Group </b>{' '}
                    </p>
                    <p className="pdf data">{user.blood_group ? user.blood_group : 'No Data'}</p>
                  </div>
                  <div className="team-hirer">
                    <p>
                      <b>Experience </b>{' '}
                    </p>
                    <p className="pdf data">{user.experience ? user.experience : 'No Data'}</p>
                  </div>
                  <div className="team-hirer">
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
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <div className="team-hirer">
                    <p>
                      <b>Event Type </b>{' '}
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
                      <b>Owner Name </b>
                    </p>
                    <p className="pdf data">{user.owner_name ? user.owner_name : 'No Data'}</p>
                  </div>
                  <div className="team-hirer">
                    <p>
                      <b>Service Type </b>{' '}
                    </p>
                    <ol style={{ paddingLeft: '20px' }}>
                      {user?.service_type?.length === 0 ? (
                        <p className="data" style={{ paddingLeft: '0px' }}>
                          No Data
                        </p>
                      ) : (
                        user?.service_type?.map((serviceType) => <li className="data">{serviceType}</li>)
                      )}
                    </ol>
                  </div>
                  <div className="team-hirer">
                    <p>
                      <b>Specialist </b>{' '}
                    </p>
                    <ol style={{ paddingLeft: '20px' }}>
                      <li className="pdf data">{user.specialist ? user.specialist : 'No Data'}</li>
                    </ol>
                  </div>
                  <div className="team-hirer">
                    <p>
                      <b>Studio Name </b>{' '}
                    </p>
                    <p className="pdf data">{user.studio_name ? user.studio_name : 'No Data'}</p>
                  </div>
                  <div className="team-hirer">
                    <p>
                      <b>Studio Location </b>{' '}
                    </p>
                    <p className="pdf data">{user.studio_location ? user.studio_location : 'No Data'} </p>
                  </div>

                  <div className="team-hirer">
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
                    {/* <img src={user.portfolio_pdf ? user.portfolio_pdf : 'No Data'} alt="" width="80" height="80" className="img-upload" /> */}
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

export default UserDetail;
