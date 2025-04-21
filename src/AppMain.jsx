// src/pages/AppMain.jsx
import React, { useEffect, useState } from 'react';
import { getLinkShopList } from './api/linkShopApi';
import FilterButton from './components/FilterButton';
import FilterModal from './components/FilterModal';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ShopList from './components/ShopList';
import { Spinner } from './components/Spinner';
import styles from './styles/AppMain.module.css';

export default function AppMain() {
  const [showFilter, setShowFilter] = useState(false);
  const [orderBy, setOrderBy] = useState('recent');
  const [linkShoplist, setLinkShopList] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // ✅ 페이지 최초 로딩 시 전체 상품 리스트 불러오기
  useEffect(() => {
    // 1.컴포넌트가 처음 화면에 나타났을 때 실행됨
    (async () => {
      // 2.비동기 함수: 데이터를 기다릴 수 있음
      setIsLoading(true); // 3.로딩 중 상태로 바꿈 (스피너 같은 걸 보여줄 수 있음)

      try {
        const result = await getLinkShopList('', orderBy);
        // -> 서버에 상품 리스트 요청 ('검색어 없이 전체 요청', 정렬기준은 orderBy)

        setLinkShopList(result || []);
        // -> 받아온 데이터를 화면에 쓸 수 있도록 저장
        // ->혹시라도 결과가 없으면 빈 배열 넣음
      } catch (err) {
        console.error('초기 상품 로딩 실패:', err.message);
        // 에러가 나면 콜솔에 출력해줌

        // 에러가 나든 성공하든 무조건 실행됨
      } finally {
        setIsLoading(false);
        // ->"로딩 끝" 상태로 바꿈
      }
    })(); // 비동기 함수 바로 실행
  }, []); // 딱 한 번만 실행 (처음 화면에 나타날 때만)

  // ✅ 검색 제출 시 keyword로 상품 리스트 호출
  const handleSearchSubmit = async (e) => {
    // e는 이벤트 객체야. 폼이 제출되면 이 함수가 호출돼.

    e.preventDefault();
    // 원래 폼은 제출하면 페이지가 새로고침이 되는데, 그걸 막는 코드야.

    const inputKeyword = e.target['keyword'].value;
    // 사용자가 입력한 검색어를 꺼내오는 부분이야.
    // <input name="keyword" /> 에서 가져오는 거야!

    setKeyword(inputKeyword); // 검색어 상태 저장
    setHasSearched(true); // "검색했음" 표시
    setIsLoading(true); // 로딩 시작
    // 상태값들을 바꿔준다. (로딩 표시하거나 조건부 렌더링 등에 사용)

    try {
      const result = await getLinkShopList(inputKeyword, orderBy);
      setLinkShopList(result || []);
      // API에 검색어와 정렬 기준을 보내서 결과를 받아오고, 상태에 저장
    } catch (err) {
      console.error('검색 API 실패:', err.message);
      // 에러가 나면 콘솔에 메세지 출력
    } finally {
      setIsLoading(false);
      // 성공이든 실패든 로딩은 무조건 종료
    }
  };

  // ✅ 정렬 필터 변경 시 API 호출. 핵심함수 : handleSortChange
  const handleSortChange = async (newOrder) => {
    setOrderBy(newOrder); // 정렬기분 상태 저장
    setShowFilter(false); // 정렬 모달 닫기
    setIsLoading(true); // 로딩 시작 표시

    try {
      const result = await getLinkShopList(keyword, newOrder);
      setLinkShopList(result || []);
      // 모달에서 사용자가 새로운 정렬 기준을 선택하면 실행됨
      // 현재 검색어(keyword) + 정렬 기준(newOrder)으로 API 요청
      // 받은 결과를 화면에 다시 보여줌
    } catch (err) {
      console.error('정렬 API 실패:', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <SearchBar
        // 검색창을 담당하는 컴포넌트 (SearchBar)
        keyword={keyword}
        // 현재 입력된 검색어 값을 props로 전달
        onChange={(e) => setKeyword(e.target.value)}
        // 사용자가 입력할 때마다 상태(keyword)를 바꾸는 함수
        onSubmit={handleSearchSubmit}
        // 사용자가 Enter 또는 검색 버튼을 눌렀을 때 실행될 함수
      />
      <FilterButton onClick={() => setShowFilter(true)} />

      {/* 사용자가 클릭하면 setShowFilter(true)실행 */}
      {/* orderBy: 현재 선택된 정렬 기준
          setOrderBy: 정렬 기준을 선택했을 때 실행할 함수 (handleSortChange)
          setShowFilter: 모달을 닫기 위해 상태를 false 변경할 함수  */}

      {showFilter && (
        <FilterModal
          orderBy={orderBy}
          setOrderBy={handleSortChange}
          setShowFilter={setShowFilter}
        />
      )}

      <main className={styles['main-container']}>
        {isLoading ? (
          <Spinner /> // 로딩 중이면 스피너 보여주기
        ) : (
          <ShopList
            shops={linkShoplist} // 받아온 상품 데이터 리스트
            hasSearched={hasSearched}
          /> // 검색 여부 (결과 없을 경우 메세지용)
        )}
      </main>
    </>
  );
}
