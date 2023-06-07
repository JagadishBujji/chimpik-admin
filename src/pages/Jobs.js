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
import JobsTabs from '../Reuseable/JobsTabs';

// ----------------------------------------------------------------------

export default function Jobs() {
  const theme = useTheme();

  return (
    <Page title="Jobs">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Jobs
        </Typography>
        <JobsTabs />
      </Container>
    </Page>
  );
}
