import React from 'react';
import styles from './SearchLine.module.css';
const SearchLine = ({ filter, setFilter }) => {
  return (
    <div className={styles.searchdiv}>
      <input
        type='search'
        value={filter.query}
        onChange={(e) => setFilter({...filter, query: e.target.value})}
        placeholder='Знайти...'
      />
    </div>
  );
};

export default SearchLine;
