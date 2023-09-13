import React, {Component} from 'react';
import SearchResult from "./SearchResult";

export const SearchResultsList = ({results, searchValue, setGymName}) => {
    return (
        <div className="results-list">
            {
                results.map((result, id) => {
                    return <SearchResult result={result} key={id} searchValue={searchValue} setGymName={setGymName}/>;
                })
            }
        </div>
    );
}