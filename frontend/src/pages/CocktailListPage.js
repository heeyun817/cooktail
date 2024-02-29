import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import CocktailList from '../components/cocktail/CocktailList';

const CocktailListPage = () => {

  const [cocktails, setCocktails] = useState([]);

  useEffect(() => {
    const mockCocktails = [
      {
        id: 1,
        title: "test1",
        ingredient: "hihi",
        recipe: "hihi",
        abv: 2.5,
        member: {
          id: 1,
          nickname: "heeyun"
        },
        createdAt: "2024-02-29T13:11:17.382313",
        updatedAt: "2024-02-29T13:11:17.382313",
        views: 0,
        likes: 0,
        images: [
          "https://sw-team9.s3.ap-northeast-2.amazonaws.com/cocktail/2057abed-fc89-4ad1-b605-7a6dbd8b9aec.%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202023-11-28%20152245.png"
        ]
      },{
        id: 2,
        title: "test2",
        ingredient: "hihi",
        recipe: "hihi",
        abv: 2.5,
        member: {
          id: 1,
          nickname: "heeyun"
        },
        createdAt: "2024-02-29T13:11:17.382313",
        updatedAt: "2024-02-29T13:11:17.382313",
        views: 0,
        likes: 0,
        images: [
          "https://sw-team9.s3.ap-northeast-2.amazonaws.com/cocktail/2057abed-fc89-4ad1-b605-7a6dbd8b9aec.%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202023-11-28%20152245.png"
        ]
      },{
        id: 3,
        title: "test3",
        ingredient: "hihi",
        recipe: "hihi",
        abv: 2.5,
        member: {
          id: 1,
          nickname: "heeyun"
        },
        createdAt: "2024-02-29T13:11:17.382313",
        updatedAt: "2024-02-29T13:11:17.382313",
        views: 0,
        likes: 0,
        images: [
          "https://sw-team9.s3.ap-northeast-2.amazonaws.com/cocktail/2057abed-fc89-4ad1-b605-7a6dbd8b9aec.%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202023-11-28%20152245.png"
        ]
      },{
        id: 4,
        title: "test4",
        ingredient: "hihi",
        recipe: "hihi",
        abv: 2.5,
        member: {
          id: 1,
          nickname: "heeyun"
        },
        createdAt: "2024-02-29T13:11:17.382313",
        updatedAt: "2024-02-29T13:11:17.382313",
        views: 0,
        likes: 0,
        images: [
          "https://sw-team9.s3.ap-northeast-2.amazonaws.com/cocktail/2057abed-fc89-4ad1-b605-7a6dbd8b9aec.%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202023-11-28%20152245.png"
        ]
      },
      
    ];
    setCocktails(mockCocktails);
  }, []);

  return (
    <>
      <Header />
      <CocktailList cocktails={cocktails} />
      <Footer />
    </>
  );
};

export default CocktailListPage;
