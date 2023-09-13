import React, {useState} from "react";
import {render} from "react-dom";
import {SearchBar} from "./SearchBar";
import GymRooms from "./GymRooms";

const App = () => {
    const [results, setResults] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [gymName, setGymName] = useState(null);

    const handleGymNameInput = (data) => {
        setGymName(data);
    };

    return (
        <Grid container>
            <Grid item xs={12}>
                <div className="search-bar-container">
                    <div className="search-bar-wrapper">
                        <SearchBar setResults={setResults} setSearchValue={setSearchValue}/>
                    </div>
                </div>
            </Grid>
            <Grid item xs={12} className="search-results-container">
                <div className="search-result-wrapper">

                    <SearchResultsList results={results} searchValue={searchValue} setGymName={setGymName}/>
                </div>
            </Grid>
            <Grid item xs={12} className="gym-rooms-container">
                {/* Renderuj komponent GymRooms na tym samym poziomie */}
                <div>gymName: {gymName}</div>
                {gymName !== null && <GymRooms gymName={gymName}/>}
            </Grid>
        </Grid>


    );
};

import {SearchResultsList} from "./SearchResultsList";
import Grid from "@material-ui/core/Grid";

const appDiv = document.getElementById("app");
render(<App/>, appDiv);