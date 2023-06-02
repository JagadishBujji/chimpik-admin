import { useState } from 'react';
// material
import { Container, Box, Button, Stack, Typography, Card, Grid, TextField } from '@mui/material';
// components
import { doc, setDoc } from 'firebase/firestore';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Page from '../components/Page';
import ProfileCard from '../components/Profile';

import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import { db } from '../Firebase/fbconfig';
import PRODUCTS from '../_mock/products';

// ----------------------------------------------------------------------

export default function Profile() {
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const user = JSON.parse(localStorage.getItem('kangroo'));

  const [formData, setFormData] = useState({
    email: user?.email || '',
    password: user?.password || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
  });

  const [isPending, setIsPending] = useState(false);

  const id = user?.doc_id || '';

  const handleSubmit = () => {
    if (formData.firstName && formData.lastName) {
      const cityRef = doc(db, 'admins', id);
      setIsPending(true);
      const fm = {
        ...formData,
        doc_id: id,
      };
      setDoc(cityRef, fm)
        .then((res) => {
          localStorage.setItem('kangroo', JSON.stringify(fm));
          alert('updated');
          window.location.reload();
        })
        .catch((err) => {
          alert(err);
          console.log(err);
        })
        .finally(() => {
          setIsPending(false);
        });
    } else {
      alert('enter all values');
    }
  };

  return (
    <Page title="Profile">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Profile
        </Typography>

        {/* <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              isOpenFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack> */}
        <Card sx={{ padding: 5 }}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid item xs={4} sx={{ textAlign: 'center' }}>
              {/* <img
                src="/static/mock-images/avatars/avatar_default.jpg"
                alt=""
                style={{ borderRadius: '50%', margin: 'auto' }}
              /> */}
              <ProfileCard user={user} />
              <Typography variant="h6" sx={{ mt: 2 }}>
                {formData.firstName} {formData.lastName}
              </Typography>
              <Typography variant="h6" sx={{ mt: 2 }}>
                {formData.email}
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Box sx={{ padding: '20px' }}>
                <Box>
                  <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid item xs={6}>
                      {/* <span style={{ color: 'gray', fontSize: '15px' }}>Recruiter id</span> */}
                      <TextField
                        fullWidth
                        id="outlined-basic"
                        label="First Name"
                        required
                        value={formData.firstName}
                        variant="outlined"
                        sx={{ marginRight: '10px', marginBottom: '15px' }}
                        onChange={(e) => {
                          setFormData({ ...formData, firstName: e.target.value });
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Last Name"
                        required
                        value={formData.lastName}
                        variant="outlined"
                        sx={{ marginRight: '10px', marginBottom: '15px' }}
                        onChange={(e) => {
                          setFormData({ ...formData, lastName: e.target.value });
                        }}
                      />
                    </Grid>
                  </Grid>{' '}
                </Box>
                <Box>
                  <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="email"
                        id="outlined-basic"
                        type="email"
                        required
                        value={formData.email}
                        // onChange={(e)=>{
                        //   setFormData({...formData,email:e.target.value})
                        // }}
                        variant="outlined"
                        sx={{ marginRight: '10px', marginBottom: '15px' }}
                        disabled
                      />
                    </Grid>
                  </Grid>
                </Box>
                <Box>
                  <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {/* <Grid item xs={12}>
                      <TextField
                        fullWidth
                        type="number"
                        id="outlined-basic"
                        required
                        label="Phone"
                        // value={user.phone}
                        // value={recut?.phone}

                        variant="outlined"
                        sx={{ marginRight: '10px', marginBottom: '15px' }}
                      />
                    </Grid> */}
                  </Grid>{' '}
                </Box>
                <Box>
                  <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid item xs={12}>
                      <>
                        {/* <span style={{ color: 'gray', fontSize: '15px' }}>Phone number</span> */}
                        {/* <TextField
                        fullWidth
                        type="number"
                        id="outlined-basic"
                        required
                        label="Phone"
                        value={user.phone}
                        value={recut?.phone}
                        disabled
                        variant="outlined"
                        sx={{ marginRight: '10px', marginBottom: '15px' }}
                      /> */}
                      </>
                    </Grid>
                  </Grid>{' '}
                </Box>
              </Box>
              <Box
                className="btnrow"
                sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', padding: '20px' }}
              >
                <Button variant="outline" sx={{ marginRight: '10px', border: '1px solid #EEB5EB', color: '#EEB5EB' }}>
                  cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isPending}
                  onClick={handleSubmit}
                  variant="contained"
                  className="publish"
                >
                  save
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Card>
        {/* <ProductList products={PRODUCTS} />
        <ProductCartWidget /> */}
      </Container>
    </Page>
  );
}
