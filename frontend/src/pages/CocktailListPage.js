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
        description: "설명입니당",
        ingredient: "hihi",
        recipe: "hihi",
        abv: 2.5,
        member: {
          id: 1,
          nickname: "heeyun"
        },
        createdAt: "2024-02-29T13:11:17.382313",
        updatedAt: "2024-02-29T13:11:17.382313",
        views: 123,
        likes: 20,
        images: [
          "https://sw-team9.s3.ap-northeast-2.amazonaws.com/cook/6183b2b5-ddca-443b-81c3-22b529ed36ce.banner.jpeg"
        ]
      },{
        id: 2,
        title: "test2",
        description: "설명입니당",
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
          "https://sw-team9.s3.ap-northeast-2.amazonaws.com/cook/6183b2b5-ddca-443b-81c3-22b529ed36ce.banner.jpeg"
        ]
      },{
        id: 3,
        title: "test3",
        description: "설명입니당",
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
          "https://sw-team9.s3.ap-northeast-2.amazonaws.com/cook/6183b2b5-ddca-443b-81c3-22b529ed36ce.banner.jpeg"
        ]
      },{
        id: 4,
        title: "test4",
        description: "설명입니당",
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
          "https://sw-team9.s3.ap-northeast-2.amazonaws.com/cook/6183b2b5-ddca-443b-81c3-22b529ed36ce.banner.jpeg"
        ]
      },{
        id: 5,
        title: "test5",
        description: "설명입니당",
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
          "https://sw-team9.s3.ap-northeast-2.amazonaws.com/cook/6183b2b5-ddca-443b-81c3-22b529ed36ce.banner.jpeg"
        ]
      },{
        id: 6,
        title: "test5",
        description: "설명입니당",
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
          "https://sw-team9.s3.ap-northeast-2.amazonaws.com/cook/6183b2b5-ddca-443b-81c3-22b529ed36ce.banner.jpeg"
        ]
      },
      
    ];
    setCocktails(mockCocktails);
  }, []);

  return (
    <>
      <Header />
      <BoardTitle>칵테일 레시피</BoardTitle>
      <CocktailList cocktails={cocktails} />
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
