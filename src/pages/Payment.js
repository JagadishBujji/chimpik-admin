import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
// sections
import {
  // AppTasks,
  // AppNewsUpdate,
  // AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  // AppTrafficBySite,
  AppWidgetSummary,
  // AppCurrentSubject,
  // AppConversionRates,
} from '../sections/@dashboard/app';
import OrderTrackingTable from '../sections/@dashboard/app/OrderTrackingTable';
import Tabs from '../Reuseable/Tabs';
import UpComingTabs from '../Reuseable/UpComingTabs';
import PaymentTabs from '../Reuseable/PaymentTabs';

// ----------------------------------------------------------------------

export default function Payment() {
  const theme = useTheme();

  return (
    <Page title="Payment">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Payment
        </Typography>
        <PaymentTabs />
      </Container>
    </Page>
  );
}
