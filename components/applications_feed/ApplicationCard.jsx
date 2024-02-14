'use client';

import React from 'react';
import PropTypes from 'prop-types';
import ApplicationsCardMenu from '@/components/applications_feed/ApplicationCardMenu';


const MAX_DESCRIPTION_LENGTH = 200;

/**
 * Application card component for the ApplicationsFeed
 * @param {Object} data Application object from the API response
 * @return {React.Component}
 */
export default function ApplicationCard({data}) {
  /**
   *
   * @param {string} description
   * @return {string}
   */
  function displayDescription(description) {
    if (description.length > MAX_DESCRIPTION_LENGTH) {
      description = description.slice(0, MAX_DESCRIPTION_LENGTH + 1);
      description += '...';
    }
    return description;
  }

  /**
   * Formats a field in the component card
   * @param {React.ReactNode} children
   * @return {React.Component}
   */
  function Field({children}) {
    return (
      <span className="font-semibold">{children}</span>
    );
  }
  Field.propTypes = {
    children: PropTypes.any,
  };

  return (
    <div className="rounded-lg relative m-4 p-3 mb-6 shadow-sm bg-white">
      <ApplicationsCardMenu aid={data.aid}/>

      <h1 className="font-semibold">{data.title}- {data.company}</h1>
      <ul>
        <li><Field>Status: </Field> {data.status}</li>
        {data.description &&
        <li>
          <Field>Description: </Field>
          {displayDescription(data.description)}
        </li>}
        <li>
          <Field>Created: </Field>{
            // eslint-disable-next-line max-len
            new Date(data.created_at).toLocaleDateString('en-US', {weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZoneName: 'short'})
          }
        </li>
      </ul>
    </div>
  );
}

ApplicationCard.propTypes = {
  data: PropTypes.object,
};
