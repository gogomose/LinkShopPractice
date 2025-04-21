// src/components/FilterModal.jsx
import React from 'react';
import styles from './FilterModal.module.css';

export default function FilterModal({ orderBy, setOrderBy, setShowFilter }) {
  const options = [
    { label: '최신순', value: 'recent' },
    { label: '좋아요순', value: 'likes' },
    { label: '등록된 상품순', value: 'productsCount' },
  ];

  const handleSelect = (value) => {
    setOrderBy(value);
    setShowFilter(false);
  };

  return (
    <div className={styles.modalOverlay} onClick={() => setShowFilter(false)}>
      <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div className={styles.modalTitle}>정렬</div>
          <button className={styles.modalClose} onClick={() => setShowFilter(false)}></button>
        </div>
        {options.map((option) => (
          <div
            key={option.value}
            className={`${styles.modalOption} ${orderBy === option.value ? styles.selected : ''}`}
            onClick={() => handleSelect(option.value)}
          >
            <span>{option.label}</span>
            {orderBy === option.value && <span className={styles.check}>✔</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
