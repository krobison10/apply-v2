'use client';

import {Box, Tab, Tabs, Typography} from '@mui/material';
import React, {useState, useEffect} from 'react';
import TabPanel from '@/components/common/TabPanel';
import PropTypes from 'prop-types';
import BulkArchivePage from '@/components/tools/BulkArchivePage';
import CleanupPage from '@/components/tools/CleanupPage';

const tabsMap = {
  0: 'bulk_archive',
  1: 'clean_up',
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
      <Typography variant='h4' className='my-1'>Tools</Typography>
      <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
        <Tabs value={tab} onChange={handleChange} aria-label="tools-tabs">
          <Tab label="Bulk Archive" />
          <Tab label="Clean Up" />
        </Tabs>
      </Box>
      <TabPanel value={tab} index={0} className="flex-grow">
        <BulkArchivePage/>
      </TabPanel>
      <TabPanel value={tab} index={1} className="flex-grow">
        <CleanupPage/>
      </TabPanel>
    </Box>
  );
}

Settings.propTypes = {
  page: PropTypes.number,
};
