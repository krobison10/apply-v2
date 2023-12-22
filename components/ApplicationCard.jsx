import React from 'react';

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
    children: propTypes.React.ReactNode,
  };

  return (
    <div className="rounded shadow-sm m-4 p-3 bg-white">
      <h1 className="font-semibold">{data.title}- {data.name}</h1>
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
  data: Object,
};
