import { useEffect, useState } from 'react'
import './App.css'
import CryptoJS from 'crypto-js';
import CharacterInfo from "./components/CharacterInfo";

const API_PUBLIC_KEY = import.meta.env.VITE_APP_API_PUBLIC_KEY;
const API_PRIVATE_KEY = import.meta.env.VITE_APP_API_PRIVATE_KEY;

function App() {
  const [list, setList] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [highestComicsCount, setHighestComicsCount] = useState(0);
  const [highestSeriesCount, setHighestSeriesCount] = useState(0);
  const [lowestStoriesCount, setLowestStoriesCount] = useState(0);

  useEffect(() => {
    const fetchAllCharacterData = async () => {
      const timestamp = new Date().getTime().toString();
      const hash = CryptoJS.MD5(timestamp + API_PRIVATE_KEY + API_PUBLIC_KEY).toString();
      const response = await fetch(`https://gateway.marvel.com/v1/public/characters?series=1987&limit=100&apikey=${API_PUBLIC_KEY}&ts=${timestamp}&hash=${hash}`);
      const json = await response.json();
      setList(json.data.results);

      // Calculate highest comics count
      const availableComics = json.data.results.map(character => character.comics.available);
      const maxComics = Math.max(...availableComics);
      setHighestComicsCount(maxComics);

      // Calculate highest comics count
      const availableSeries = json.data.results.map(character => character.series.available);
      const maxSeries = Math.max(...availableSeries);
      setHighestSeriesCount(maxSeries);

      // Calculate highest comics count
      const availableStories = json.data.results.map(character => character.stories.available);
      const minStories = Math.min(...availableStories);
      setLowestStoriesCount(minStories);
    };
    fetchAllCharacterData().catch(console.error);
  }, []);

  const searchItems = searchValue => {
    setSearchInput(searchValue);
    if (searchValue != "") {
      const filteredData = list.filter((item) => 
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      )
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(list);
    }
  };

  const filterSeries = () => {
    const filteredData = list.filter((item) =>
      item.series.available > 100)
    setFilteredResults(filteredData);
  };

  const filterComics = () => {
    const filteredData = list.filter((item) =>
      item.comics.available > 500)
    setFilteredResults(filteredData);
  };

  return (
    <div className="whole-page">
      <h2>Characters from The Amazing Spider-Man (1963-1998)</h2>
      <label>Highest Comics: {highestComicsCount} </label>
      <label>Highest Series: {highestSeriesCount} </label>
      <label>Lowest Stories: {lowestStoriesCount} </label>
      <br></br>
      <input
        type="text"
        placeholder="Search..."
        onChange={(inputString) => searchItems(inputString.target.value)}
      />
    <button type="button" onClick={filterComics}>Comics Greater than 500</button>
    <button type="button" onClick={filterSeries}>Series Greater than 100</button>
      <ul>
      {filteredResults.length > 0
        ? filteredResults && Object.entries(filteredResults).map(([character]) => 
          <CharacterInfo
            image={filteredResults[character].thumbnail.path}
            imagetype={filteredResults[character].thumbnail.extension}
            name={filteredResults[character].name}
            id={filteredResults[character].id}
            comics={filteredResults[character].comics.available}
            series={filteredResults[character].series.available}
            stories={filteredResults[character].stories.available}
            events={filteredResults[character].events.available}
          />
        )
        : list && Object.entries(list).map(([character]) =>
          <CharacterInfo
            image={list[character].thumbnail.path}
            imagetype={list[character].thumbnail.extension}
            name={list[character].name}
            id={list[character].id}
            comics={list[character].comics.available}
            series={list[character].series.available}
            stories={list[character].stories.available}
            events={list[character].events.available}
          />
        )
      }
      </ul>
    </div>
  )
}

export default App