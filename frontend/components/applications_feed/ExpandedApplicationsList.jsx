import React from 'react';
import PropTypes from 'prop-types';

import ApplicationCard from '@/components/applications_feed/ApplicationCard';

export default function ExpandedApplicationsList({applications}) {
  return applications.map((application) => (
    <ApplicationCard key={application.aid} data={application} />
  ));
}

ExpandedApplicationsList.propTypes = {
  applications: PropTypes.array,
};

