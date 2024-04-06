import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import Layout from './routes/Layout';
import DetailView from './routes/DetailView';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index={true} element={<App />} />
          <Route index={false} path="/characterDetails/:characterid" element={<DetailView />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
                <Link style={{ color: "white" }} to="/">
                  Back to Home
                </Link>
              </main>
            }
          />
        </Route>
      </Routes>
</BrowserRouter>
  </React.StrictMode>,
)
