import * as React from 'react';
import { Avatar, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import PaymentData from './PaymentData';
import EarningTable from './EarningTable';
import TransactionTable from './TransactionTable';
import PendingTable from './PendingTable';

export default function FinancialTab({ id, user }) {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tab = {
    background: '#fff',
    outline: 'none',
    color: '#000',
    borderRadius: '5px',
    textTransform: 'none',
    '&.Mui-selected': {
      fontWeight: '700',
      background: 'linear-gradient(90deg, rgba(171,26,253,1) 14%, rgba(73,26,255,1) 68%)',
      color: '#fff',
      outline: 'none',
      borderRadius: '5px',
      fontFamily: 'sans-serif',
      fontSize: '16px',
      borderBottom: 'none',
    },
    '&.css-6d3pg0-MuiTabs-indicator': {
      background: 'none!important',
    },
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1', mt: 4, p: 3 }}>
      <Stack direction="row" sx={{ justifyContent: 'start', alignItems: 'center', pb: 4 }}>
        <Avatar alt="" src={user?.profile_pic} />
        <Typography variant="subtitle2" noWrap sx={{ pl: 2 }}>
          {user?.username}
        </Typography>
      </Stack>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 'none', borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab sx={tab} label="Earnings" value="1" />
            <Tab sx={tab} label="Transcation" value="2" />
            <Tab sx={tab} label="Pending Payment" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <EarningTable id={id} />
        </TabPanel>
        <TabPanel value="2">
          <TransactionTable id={id} />
        </TabPanel>
        <TabPanel value="3">
          <PendingTable id={id} />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
