import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import OrderTrackingTable from '../sections/@dashboard/app/OrderTrackingTable';
import FreeBeeTable from '../sections/@dashboard/app/FreeBeeTable';
import Tabs from './Tabs';

export default function UpComingTabs() {
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
      <TabContext value={value}>
        <Box sx={{ borderBottom: 'none', borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab sx={tab} label="UpComing" value="1" />
            <Tab sx={tab} label="Completed" value="2" />
            {/* <Tab label="Item Three" value="3" /> */}
          </TabList>
        </Box>
        <TabPanel value="1">
          <Tabs type="upcoming" />
        </TabPanel>
        <TabPanel value="2">
          <Tabs type="completed" />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
