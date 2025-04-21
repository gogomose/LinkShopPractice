// components/SearchBar.jsx
import React from 'react';
import styles from '../styles/AppMain.module.css';

export default function SearchBar({ keyword, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <div className={styles['search-box']}>
        <img className={styles.search} src='/images/search.svg' alt='검색 아이콘' />
        <input
          name='keyword'
          value={keyword}
          onChange={onChange}
          className={styles.input}
          type='text'
          placeholder='샵 이름으로 검색해 보세요.'
        />
      </div>
    </form>
  );
}
