// components/FilterButton.jsx
import React from 'react';
import styles from '../styles/AppMain.module.css';

export default function FilterButton({ onClick }) {
  return (
    <div className={styles.filter}>
      <span className={styles['filter-detail']} onClick={onClick}>
        상세필터
        <img className={styles['filter-button']} src='/images/filter.png' alt='필터 아이콘' />
      </span>
    </div>
  );
}
