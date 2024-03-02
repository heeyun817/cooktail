import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import CocktailList from '../components/cocktail/CocktailList';
import { getAllCocktails } from '../api/Cocktail';

const CocktailListPage = () => {
  const [cocktails, setCocktails] = useState([]);
  const [sortOption, setSortOption] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let data;
      try {
        data = await getAllCocktails({ sortBy: sortOption });
        setCocktails(data.content || []); 
      } catch (error) {
        console.error('Error fetching cocktails:', error.message);
      }
    };

    fetchData();
  }, [sortOption]);

  const handleSortClick = (sortOption) => {
    setSortOption(sortOption);
  };

  return (
    <>
      <Header />
      <BoardTitle>칵테일 레시피</BoardTitle>
      <CocktailList
        cocktails={cocktails}
        onSortClick={handleSortClick} />
      <Footer />
    </>
  );
};

const BoardTitle = styled.h1`
  font-size: 25px;
  text-align: center;
  margin-bottom: 50px;
`;

export default CocktailListPage;
