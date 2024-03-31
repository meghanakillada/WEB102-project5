import React, { useEffect, useState } from "react";

//const API_PUBLIC_KEY = import.meta.env.VITE_APP_API_PUBLIC_KEY;
//const API_PRIVATE_KEY = import.meta.env.VITE_APP_API_PRIVATE_KEY;

const CharacterInfo = ({ image, imagetype, name, id, comics, series, stories, events }) => {
  
    return (
      <div>
          <li className="main-list" key={id}>
            <img
              className="thumbnail"
              src={`${image}.${imagetype}`}
              alt={`Small image for ${name}`}
            />
            {name} <span className="tab"></span> {comics} comics <span className="tab"></span> {series} series <span className="tab"></span> {stories} stories <span className="tab"></span> {events} events
          </li>
      </div>
    );    
  };
  
  export default CharacterInfo;