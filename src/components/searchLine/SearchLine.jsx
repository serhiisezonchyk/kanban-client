import React from 'react';
import'./SearchLine.scss';
const SearchLine = ({ filter, setFilter }) => {
  return (
    <div className='search-div'>
      <input
        type='search'
        value={filter.query}
        onChange={(e) => setFilter({...filter, query: e.target.value})}
        placeholder='Find...'
      />
    </div>
  );
};

export default SearchLine;
