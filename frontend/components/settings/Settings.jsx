'use client';

import React from 'react';
import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import {Box, Tab, Tabs, Typography} from '@mui/material';

import TabPanel from '@/components/common/TabPanel';
import UserPage from '@/components/settings/UserPage';
import NotificationsPage from '@/components/settings/NotificationsPage';
import StatsPage from '@/components/settings/StatsPage';
import PlatformPage from '@/components/settings/PlatformPage';

const tabsMap = {
  0: 'profile',
  1: 'notifications',
  2: 'stats',
  3: 'platform',
};

export default function Settings({page}) {
  const [tab, setTab] = useState(page || 0);

  useEffect(() => {
    const query = window.location.search;

    for (const index in tabsMap) {
      if (query.toLowerCase().includes(tabsMap[index])) {
        setTab(parseInt(index));
      }
    }
  }, []);

  const handleChange = (event, newTab) => {
    window.history.pushState({}, '', `?${tabsMap[newTab]}`);
    setTab(parseInt(newTab));
  };

  return (
    <Box className='w-full h-full p-8 pt-4 pb-12 flex flex-col'>
      <Typography variant='h4' className='my-1'>Settings</Typography>
      <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
        <Tabs value={tab} onChange={handleChange} aria-label="setting-tabs">
          <Tab label="Profile" />
          <Tab label="Notifications" />
          <Tab label="Stats"/>
          <Tab label="Platform"/>
        </Tabs>
      </Box>
      <TabPanel value={tab} index={0} className="flex-grow">
        <UserPage/>
      </TabPanel>
      <TabPanel value={tab} index={1} className="flex-grow">
        <NotificationsPage />
      </TabPanel>
      <TabPanel value={tab} index={2} className="flex-grow">
        <StatsPage />
      </TabPanel>
      <TabPanel value={tab} index={3} className="flex-grow">
        <PlatformPage />
      </TabPanel>
    </Box>
  );
}

Settings.propTypes = {
  page: PropTypes.number,
};
