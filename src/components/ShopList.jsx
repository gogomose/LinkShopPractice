// src/components/ShopList.jsx
import React from 'react';
import LinkCard from './LinkCard';
import SearchNull from './SearchNull';

export default function ShopList({ shops, hasSearched }) {
  // 검색 후 결과가 없을 때만 SearchNull 표시
  if (shops.length === 0 && hasSearched) {
    return <SearchNull />;
  }

  return (
    <>
      {shops.map((shop) => (
        <LinkCard key={shop.id} data={shop} />
      ))}
    </>
  );
}
