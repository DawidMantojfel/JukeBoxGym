import React from 'react';
import {SearchResult} from "./SearchResult";

export const SearchResultsList = ({results, value}) => {
    return (
        <div className="results-list">
            {
                results.map((result, id) => {
                    return <SearchResult result={result} key={id} value={value}/>;
                })
            }
        </div>
    );
}