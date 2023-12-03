"use client";

import { useEffect, useState } from "react";
import { BASE_API_URL } from "../app/app.config";
import ApplicationCard from "./ApplicationCard";

export default function ApplicationsFeed() {
  const [appData, setAppData] = useState([]);

  useEffect(() => {
    fetch(`${BASE_API_URL}applications?expand=true`)
    .then(response => response.json())
    .then(res => {
      console.log(res);
      setAppData(res.results);
    })
    .catch(err => console.log(err));
  }, [])

  return (
    <div>
        {appData.length === 0 && <h1>Loading...</h1>}
        {appData.length !== 0 && appData.map(application => <ApplicationCard key={application.id} data={application}/>)}
    </div>
  );
} 