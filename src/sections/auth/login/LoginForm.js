import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';
import { db } from '../../../Firebase/fbconfig';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: '',
    password: '',
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const [isPending, setIsPending] = useState(false);

  const onSubmit = async (e) => {
    console.log(e.email);
    const email = e.email;
    setIsPending(true);
    const q = query(collection(db, 'admins'), where('email', '==', email));

    const querySnapshot = await getDocs(q);
    if (querySnapshot.size > 0) {
      querySnapshot.forEach((doc) => {
        const dt = doc.data();
        // doc.data() is never undefined for query doc snapshots
        if (e.password === dt.password) {
          localStorage.setItem('kangroo', JSON.stringify(dt));
          window.location.reload();
          setIsPending(false);
        } else {
          alert('wrong password');
          setIsPending(false);
        }
      });
    } else {
      alert('no user found');
      setIsPending(false);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="email" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <RHFCheckbox name="remember" label="Remember me"  sx={{ color: '#644AD1' }}/>
        <Link variant="subtitle2" underline="hover" sx={{ color: '#644AD1' }}>
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        sx={{
          background: '#644AD1',

          '&:hover': {
            background: 'transparent',
            border: '2px solid #644AD1',
            color: '#644AD1',
          },
        }}
        fullWidth
        size="large"
        disabled={isPending}
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Login
      </LoadingButton>
    </FormProvider>
  );
}
