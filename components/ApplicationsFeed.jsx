'use client';

import React from 'react';

import {useEffect, useState} from 'react';
import {BASE_API_URL} from '../app/app.config';
import ApplicationCard from './ApplicationCard';

/**
 * Infinite scroll (soon) feed for the applications
 * @return {React.Component}
 */
export default function ApplicationsFeed() {
  const [appData, setAppData] = useState([]);

  useEffect(() => {
    fetch(`${BASE_API_URL}applications?expand=true`)
        .then(async (response) => await response.json())
        .then((res) => {
          console.log(res);
          setAppData(res.results);
        })
        .catch((err) => {
          console.log(err);
        });
  }, []);

  return (
    <div>
      {appData.length === 0 && <h1>Loading...</h1>}
      {appData.length !== 0 &&
        appData.map((application) => (
          <ApplicationCard key={application.id} data={application} />
        ))}
    </div>
  );
}
