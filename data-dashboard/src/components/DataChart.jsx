import React, { Component, useEffect, useState } from "react";
import CryptoJS from 'crypto-js';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
  } from "recharts";

const API_PUBLIC_KEY = import.meta.env.VITE_APP_API_PUBLIC_KEY;
const API_PRIVATE_KEY = import.meta.env.VITE_APP_API_PRIVATE_KEY;

const DataChart = ({  characterid }) => {
    const [characterData, setCharacterData] = useState(null);

    useEffect(() => {
      const getCharacterData = async () => {
        const timestamp = new Date().getTime().toString();
        const hash = CryptoJS.MD5(timestamp + API_PRIVATE_KEY + API_PUBLIC_KEY).toString();
        const response = await fetch(`https://gateway.marvel.com/v1/public/characters?series=1987&limit=100&apikey=${API_PUBLIC_KEY}&ts=${timestamp}&hash=${hash}`);
        const json = await response.json();
        setCharacterData(json.data.results);
      };
      getCharacterData().catch(console.error);
    });

      return (
        <div>
          {characterData ? (// rendering only if API call actually returned us data
            <div>
              <h2>Number of Series, Comics, Stories, Events</h2>
              <BarChart width={1000} height={300} data={characterData}>
              <XAxis dataKey="name"/>
              <YAxis />
              <Bar dataKey="events.available" barSize={30} fill="#8884d8"/>
            </BarChart>
            </div>
          ) : null}
        </div>
      );
    
  };

export default DataChart;