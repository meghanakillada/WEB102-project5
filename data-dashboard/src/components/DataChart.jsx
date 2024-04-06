import React, { Component, useEffect, useState } from "react";
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Label
  } from "recharts";

const API_PUBLIC_KEY = import.meta.env.VITE_APP_API_PUBLIC_KEY;
const API_PRIVATE_KEY = import.meta.env.VITE_APP_API_PRIVATE_KEY;

const DataChart = ({ symbol, market }) => {
    const [histData, setHistData] = useState(null);

      return (
        <div>
          {histData ? (// rendering only if API call actually returned us data
            <div>
              
            </div>
          ) : null}
        </div>
      );
    
  };

export default DataChart;