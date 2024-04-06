import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CryptoJS from 'crypto-js';

const API_PUBLIC_KEY = import.meta.env.VITE_APP_API_PUBLIC_KEY;
const API_PRIVATE_KEY = import.meta.env.VITE_APP_API_PRIVATE_KEY;

const CharacterDetail = () => {
    let params = useParams();
    const [fullDetails, setFullDetails] = useState(null);

    useEffect(() => {
        const getCharacterDetail = async () => {
            const timestamp = new Date().getTime().toString();
            const hash = CryptoJS.MD5(timestamp + API_PRIVATE_KEY + API_PUBLIC_KEY).toString();
            const response = await fetch(`https://gateway.marvel.com/v1/public/characters/${params.characterid}?apikey=${API_PUBLIC_KEY}&ts=${timestamp}&hash=${hash}`);
            const json = await response.json();
            setFullDetails(json.data.results[0]);
        };
        getCharacterDetail().catch(console.error);
      }, [params.characterid]);

      if (!fullDetails) {
        return <div>Loading...</div>;
      }

    return (
        <>
            <h1>{fullDetails.name}</h1>
            <img
                className="images"
                src={`${fullDetails.thumbnail.path}.${fullDetails.thumbnail.extension}`}
                alt={`Small image for ${fullDetails.name}`}
            />
            <div> {fullDetails.description}</div>
            <br></br>
            <div class="flex-container">
                <div class="card">
                    <div class="container">
                        <h4><b>Comics</b></h4>
                        <ul>
                            {fullDetails.comics.items.map((item) => (
                                <li>{item.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div class="card">
                    <div class="container">
                        <h4><b>Series</b></h4>
                        <ul>
                            {fullDetails.series.items.map((item) => (
                                <li>{item.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div class="card">
                    <div class="container">
                        <h4><b>Stories</b></h4>
                        <ul>
                            {fullDetails.stories.items.map((item) => (
                                <li>{item.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div class="card">
                    <div class="container">
                        <h4><b>Events</b></h4>
                        <ul>
                            {fullDetails.events.items.map((item) => (
                                <li>{item.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
  };
  
  export default CharacterDetail;