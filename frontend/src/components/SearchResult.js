import React from 'react';

export const SearchResult = ({ result, value }) => {
  const formatName = () => {
    const name = result.name;

    const regex = new RegExp(value, 'i'); // Utworzenie wyrażenia regularnego z wartości

    const formattedName = name.replace(regex, (match) => `<strong>${match}</strong>`);

    return { __html: formattedName };
  };

  return (
    <div
      className="search-result"
      onClick={(e) => alert(`You clicked on ${result.name}`)}
      dangerouslySetInnerHTML={formatName()}
    ></div>
  );
};