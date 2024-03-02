import React from 'react';
import styled from 'styled-components';
import CocktailItem from './CocktailItem';

const CocktailList = ({ cocktails }) => {
  return (
    <ListContainer>
      <SearchContainer>
        <SearchBar placeholder="검색어를 입력하세요" />
        <SearchButton>검색</SearchButton>
        <WriteButton>글쓰기</WriteButton>
      </SearchContainer>
      <List>
        {cocktails.map((cocktail) => (
          <CocktailItem key={cocktail.id} cocktail={cocktail} />
        ))}
      </List>
    </ListContainer>
  );
};

const ListContainer = styled.div`
  width: 100%;
  max-width: 1258px;
  border-radius: 20px;
  border: 1px solid #ccc;
  padding: 50px;
  position: relative;
  margin: 0 auto;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const SearchBar = styled.input`
  width: 65%;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ddd;
  background-color: #F9ECF2;
  box-sizing: border-box;
`;

const SearchButton = styled.button`
  margin-left: 20px;
  padding: 10px 30px;
  border: 1px solid #ddd;
  background-color: #C8256A;
  color: #fff;
  border-radius: 10px;
  cursor: pointer;
`;

const WriteButton = styled.button`
  margin-left: 15px;
  padding: 10px 30px;
  border: 1px solid #ddd;
  background-color: #C8256A;
  color: #fff;
  border-radius: 10px;
  cursor: pointer;
`;
const List = styled.ul`
  margin-top: 3px;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  
  @media (max-width: 1258px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    width: 80%; 
    margin: 0 auto;
  }
`;

export default CocktailList;