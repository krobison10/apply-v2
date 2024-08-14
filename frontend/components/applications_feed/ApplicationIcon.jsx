import React from 'react';
import PropTypes from 'prop-types';

import ArticleIcon from '@mui/icons-material/Article';
// import faviconFetch from 'favicon-fetch';


export default function ApplicationIcon({application}) {
  return (
    // const faviconUrl = data.company_website && faviconFetch({uri: data.company_website});
    // if (faviconUrl) {
    //   return <img className='m-1 w-10 h-10' src={faviconUrl} alt={data.company_name} width={36} height={36}/>;
    // } else {
    <ArticleIcon className="text-primary-dark inline-block w-10 h-10"/>
    // }
  );
}

ApplicationIcon.propTypes = {
  application: PropTypes.object,
};
