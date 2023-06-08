import { Grid, Card, Container, Stack, Typography, Avatar } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../Firebase/fbconfig';
import UploadedImage from './UploadedImage';

const ReportedDetails = () => {
  const navigate = useNavigate();
  const id = useParams().id;
  console.log(id);
  const [data, setData] = useState();
  useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, 'reportedJobs', id);
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
  console.log(data);
  return (
    <>
      <Stack>
        <Stack sx={{ mb: 5 }}>
          <Typography
            variant="h4"
            onClick={() => {
              navigate('/dashboard/report-jobs');
            }}
            className="back"
          >
            Reported <i className="fas fa-chevron-right" /> <span className="team-heading"> Reported Details</span>
          </Typography>
        </Stack>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={7}>
            <Card sx={{ p: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={6}>
                  <p>
                    <b>Reported Person Details </b>{' '}
                  </p>

                  <div className="team-hirer">
                    <p>
                      <b>Profile Pic </b>{' '}
                    </p>
                    <p>
                      <Avatar src={data?.reportedPersonProfilePic} />
                    </p>
                  </div>

                  <div className="team-hirer">
                    <p>
                      <b>User Name </b>{' '}
                    </p>
                    <p>{data?.reportedPersonUserName} </p>
                  </div>
                  <div className="team-hirer">
                    <p>
                      <b>Phone Name</b>{' '}
                    </p>
                    <p>{data?.reportedPersonMobileNo}</p>
                  </div>
                  <div className="team-hirer">
                    <p>
                      <b>Reason</b>{' '}
                    </p>
                    <p>{data?.reportReason}</p>
                  </div>
                  <div className="team-hirer">
                    <p>
                      <b>Reported Person User ID </b>{' '}
                    </p>
                    <p>{data?.reportedPersonUserid}</p>
                  </div>

                  {/* {data?.camera_gear && (
                <div className="team-hirer">
                  <p>
                    <b>Photography </b>{' '}
                  </p>
                  <p>
                    {data?.camera_gear
                      ? data?.camera_gear.map((gs) => (
                          <ul key={gs.name}>
                            {gs.Name} Rs-{gs.Price}
                          </ul>
                        ))
                      : ''}
                  </p>
                </div>
              )}
              <div className="team-hirer">
                <p>
                  <b>Videography</b>{' '}
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
                  <b>Location </b>{' '}
                </p>
                <p>{data?.event_loc_link}</p>
              </div> */}
                  {/* <div className="team-hirer">
                <p>
                  <b>Event status </b>{' '}
                </p>
                <p>{data?.event_status}</p>
              </div>
              <div className="team-hirer">
                <p>
                  <b>Experience </b>{' '}
                </p>
                <p>{data?.experience}</p>
              </div>
              <div className="team-hirer">
                <p>
                  <b> Price </b>{' '}
                </p>
                <p>{data?.price}</p>
              </div>
              <div className="team-hirer">
                <p>
                  <b>Section </b>{' '}
                </p>
                <p>{data?.section}</p>
              </div>
              <div className="team-hirer">
                <p>
                  <b>Service </b>{' '}
                </p>
                <p>{data?.service}</p>
              </div> */}
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <p>
                    <b>Jobs Owner Details </b>{' '}
                  </p>
                  <div className="team-hirer">
                    <p>
                      <b> Job Owner Profile Pic </b>{' '}
                    </p>
                    <p>
                      <Avatar src={data?.jobOwnerProfilePic} />
                    </p>
                  </div>
                  <div className="team-hirer">
                    <p>
                      <b>Job Document Id </b>{' '}
                    </p>
                    <p>{data?.JobDocId}</p>
                  </div>
                  <div className="team-hirer">
                    <p>
                      <b>Document Id</b>{' '}
                    </p>
                    <p>{data?.docId}</p>
                  </div>
                  <div className="team-hirer">
                    <p>
                      <b>Job Owner User Name</b>{' '}
                    </p>
                    <p>{data?.jobOwnerUsername}</p>
                  </div>
                  <div className="team-hirer">
                    <p>
                      <b>Job Mobile Number</b>{' '}
                    </p>
                    <p>{data?.jobOwnerMobileNo}</p>
                  </div>
                  <div className="team-hirer">
                    <p>
                      <b>More Report Reason</b>{' '}
                    </p>
                    <p>{data?.moreReportReason}</p>
                  </div>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={5}>
            <Card sx={{ p: 2 }}>
              <p>
                <b>Media files</b>
              </p>
              {data?.invitation_url && <UploadedImage url={data.invitation_url} />}
            </Card>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
};

export default ReportedDetails;
