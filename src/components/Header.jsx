// src/components/Header.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/AppMain.module.css';

export default function Header() {
  const navigate = useNavigate();

  // 로고 클릭 시 /list로 이동 + 새로고침
  const handleLogoClick = () => {
    navigate('/list'); // 경로 이동
    window.location.reload(); // 새로고침
  };

  return (
    <div className={styles.header}>
      <h1 className={styles.logo} onClick={handleLogoClick}>
        LINK SHOP
      </h1>
      <h1>
        <button className={styles['create-button']} onClick={() => navigate('/linkpost')}>
          생성하기
        </button>
      </h1>
    </div>
  );
}
