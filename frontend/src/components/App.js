import React, { useState } from "react";
import { render } from "react-dom";
import { SearchBar } from "./SearchBar";
import { SearchResultsList } from "./SearchResultsList";

const App = () => {
  const [results, setResults] = useState([]);
  const [value, setValue] = useState("");

  return (
    <div className="search-bar-container">
      <SearchBar setResults={setResults} setValue={setValue}/>
      <SearchResultsList results={results} value={value}/>
    </div>
  );
};

const appDiv = document.getElementById("app");
render(<App />, appDiv);