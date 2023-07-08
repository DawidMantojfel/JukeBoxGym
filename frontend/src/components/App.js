import React, { useState } from "react";
import { render } from "react-dom";
import { SearchBar } from "./SearchBar";
import { SearchResultsList } from "./SearchResultsList";

const App = () => {
  const [results, setResults] = useState([]);

  return (
    <div className="search-bar-container">
      <SearchBar setResults={setResults} />
      <SearchResultsList results={results} />
    </div>
  );
};

const appDiv = document.getElementById("app");
render(<App />, appDiv);