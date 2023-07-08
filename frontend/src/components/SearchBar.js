import React, {useState} from 'react'
import {FaSearch} from "react-icons/fa"
import Grid from "@material-ui/core/Grid";

export const SearchBar = ({ setResults, setValue }) => {
    const [input, setInput] = useState("");

    const fetchTestData = (value) => {
        fetch(`/api/get-gym-entities?search=${value}`)
            .then((response) => response.json())
            .then((json) => {
                const results = json.filter((gym) => {
                    return value &&
                           gym &&
                           gym.name &&
                           gym.name.toLowerCase().includes(value);
                });
                setResults(results);
                setValue(value);
            });
    }

    const handleChange = (value) => {
        setInput(value);
        fetchTestData(value);
    }
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} align="center">
                <div className="input-wrapper">
                    <FaSearch id="search-icon" />
                    <input type="text"
                           className="search-bar-input"
                           placeholder="Input gym name..."
                           value={input}
                           onChange={(e) => handleChange(e.target.value)}
                    />
                </div>
            </Grid>
        </Grid>
    )
}