import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CharacterInfo = ({ image, imagetype, name, id, comics, series, stories, events }) => {
  
    return (
      <tr>
        <td className="main-list" key={id}>
          <img
            className="thumbnail"
            src={`${image}.${imagetype}`}
            alt={`Small image for ${name}`}
          />
        </td>
        <td>
          <Link to={`/characterDetails/${id}`} key={id}>{name}</Link>
        </td>
        <td>{comics} comics <span className="tab"></span></td>
        <td>{series} series <span className="tab"></span></td>
        <td>{stories} stories <span className="tab"></span></td>
        <td>{events} events</td>
      </tr>
    );    
  };
  
  export default CharacterInfo;