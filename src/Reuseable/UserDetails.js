import { Grid, Card, Container, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UploadedImage from './UploadedImage';

const UserDetails = () => {
  const navigate = useNavigate();
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
            Jobs <i className="fas fa-chevron-right" /> <span className="team-heading"> Jobs Details</span>
          </Typography>
        </Stack>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6}>
            <Card sx={{ p: 2 }}>
              <div className="row details">
                <div className="col-md-6">
                  <p className="details-para">
                    <b>Order ID:</b> Jagadish Kumar
                  </p>
                  <p className="details-para">
                    <b>Email :</b> Jagadish00198@gmail.com
                  </p>
                  <p className="details-para">
                    <b>AAdhar Card :</b> 123456789012
                  </p>
                  <p className="details-para">
                    <b>Blood Group :</b> b+
                  </p>
                  <p className="details-para">
                    <b>Camera Gear :</b> Nikon D300
                  </p>
                  <p className="details-para">
                    <b>Address :</b> xxx yyyyyyy zzzzzzz
                  </p>
                  <p className="details-para">
                    <b>District :</b> Athipattu Pudunagar
                  </p>
                  <p className="details-para">
                    <b>Alternative No :</b> 6+6
                  </p>
                  <p className="details-para">
                    <b>Gender :</b> Male
                  </p>
                  <p className="details-para">
                    <b>Experience :</b> 5-10 Years
                  </p>
                  <p className="details-para">
                    <b>Education :</b> fdhdh
                  </p>
                  <p className="details-para">
                    <b>Language :</b> Tamil
                  </p>
                  <p className="details-para">
                    <b>Landline No</b> 0416 22333222
                  </p>
                  <p className="details-para">
                    <b>Location :</b> Chennai
                  </p>
                </div>
                <div className="col-md-6">
                  <p className="details-para">
                    <b>Event Type :</b> Chapra Rituals
                  </p>

                  <p className="details-para">
                    <b>Owner Name :</b> Bujji
                  </p>
                  <p className="details-para">
                    <b>Pan Card :</b> 15156515
                  </p>
                  <p className="details-para">
                    <b>Phone Number :</b> 893916966
                  </p>
                  <p className="details-para">
                    <b>Profile Pic :</b>
                  </p>
                  <p className="details-para">
                    <b>Service Type:</b> Videography
                  </p>
                  <p className="details-para">
                    <b>Specialist :</b> Drone Videographer
                  </p>
                  <p className="details-para">
                    <b>Studio Location :</b> abcdef
                  </p>
                  <p className="details-para">
                    <b>Studio Name :</b> Vanakam Studio
                  </p>
                  <p className="details-para">
                    <b>Studio Services :</b>
                  </p>
                  <p className="details-para">
                    <b>Total Labours :</b>
                  </p>
                  <p className="details-para">
                    <b>Video Gear :</b>Sony PXW-Z190 4K
                  </p>
                </div>
              </div>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Card sx={{ p: 2 }}>
              <p>
                <b>Uplaoded Item</b>
              </p>
              <UploadedImage />
            </Card>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
};

export default UserDetails;
