import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const CocktailDetailPage = () => {

  const cocktailData = {
    "id": 1,
    "title": "아주멋진칵텔",
    "description": "클래식 칵테일인 올드패션드입니다 도수가 조금 쌔긴 하지만 향긋하며 맛있는 칵테일 입니다",
    "ingredient": "보드카 30ml\n말리부 코코넛 럼 30ml\n복숭아 리큐르 45ml\n얼음 5개토닉워터 200ml",
    "recipe": "1. 롱 드링크잔에 얼음을 담아주세요.\n 2.보드카 30ml를 부어주세요",
    "abv": 2.5,
    "member": {
      "id": 1,
      "email": "test@email.com",
      "password": "$2a$10$25jrtytapLmpsK3w83z78uhXN0I.malSwKaSQ.Pi.VOTksrk.FLry",
      "name": "John Doe",
      "nickname": "johnny",
      "phone": "01012345678",
      "image": "https://avatar.iran.liara.run/public/",
      "birthDate": "1990-01-01",
      "bio": "소개글을 작성해주세요."
    },
    "createdAt": "2024-03-02",
    "updatedAt": "2024-03-03",
    "views": 3,
    "likes": 0,
    "images": [
      "https://sw-team9.s3.ap-northeast-2.amazonaws.com/cocktail/526e447a-5cbf-41b5-8fb2-b782b1ba3dba.%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202023-08-22%20181730.png",
      "https://sw-team9.s3.ap-northeast-2.amazonaws.com/cocktail/a371a487-a8cd-426f-9ecb-f803a1e913ab.%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202023-12-04%20153358.png",
      "https://sw-team9.s3.ap-northeast-2.amazonaws.com/cocktail/f4ec493c-8644-4a1f-8d87-79a7ba256b13.%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202023-11-28%20152245.png",
      "https://sw-team9.s3.ap-northeast-2.amazonaws.com/cocktail/a751a825-9086-4cc9-a5da-118910d5ac4a.%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202023-11-28%20145641.png"
    ]
  };

  const {
    title,
    description,
    ingredient,
    recipe,
    abv,
    member,
    createdAt,
    updatedAt,
    views,
    likes,
    images,
  } = cocktailData;
  
  const [mainImage, setMainImage] = useState(images[0]);
  const [thumbnails, setThumbnails] = useState(images.slice(1));

  const handleThumbnailClick = (clickedImage) => {
    setThumbnails((prevThumbnails) => {
      const updatedThumbnails = [...prevThumbnails, mainImage];
      setMainImage(clickedImage);
      return updatedThumbnails.filter((thumbnail) => thumbnail !== clickedImage);
    });
  };


  return (
    <>
      <Header />
      <BoardTitle>{title}</BoardTitle>
      <Container>
        <ImagesContainer>
        <MainImage src={mainImage} alt="Main Cocktail Image" />
          <ThumbnailContainer>
          {thumbnails.map((thumbnail, index) => (
            <Thumbnail
              key={index}
              src={thumbnail}
              alt={`Cocktail Thumbnail ${index + 1}`}
              onClick={() => handleThumbnailClick(thumbnail)}
            />
          ))}
          </ThumbnailContainer>
        </ImagesContainer>
        <ExplainContainer>
        <InfoContainer>
        <Info>
        <User>{member.nickname}님의 레시피</User>
        <Abv>도수 : {abv}</Abv>
        <Like>좋아요 {likes}</Like>
        <View>조회수 {views}</View>
        </Info>
        <Details>
              <Section>
                <Title>칵테일 설명</Title>
                <Content>{description}</Content>
              </Section>
              <Section>
                <Title>재료 정보</Title>
                <Content>{ingredient}</Content>
              </Section>
              <Section>
                <Title>레시피 설명</Title>
                <Content>{recipe}</Content>
              </Section>
            </Details>
          </InfoContainer>
          <DateContainer>
            <DateSpan>작성일: {createdAt}</DateSpan>
            {createdAt !== updatedAt &&<DateSpan>수정일: {updatedAt}</DateSpan>}
          </DateContainer>
      </ExplainContainer>
      </Container>
      <Footer />
    </>
  );
};

const BoardTitle = styled.h1`
  font-size: 25px;
  text-align: center;
  margin-bottom: 50px;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1258px;
  border-radius: 20px;
  border: 1px solid #ccc;
  padding: 50px;
  position: relative;
  margin: 0 auto;
  display: flex;
  align-items: flex-start;
`;

const ImagesContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainImage = styled.img`
  width: 500px;
  height: 500px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const ThumbnailContainer = styled.div`
  display: flex;
  gap: 25px;
`;

const Thumbnail = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 10px;
`;

const ExplainContainer = styled.div`
  width: 100%;
  display: flex;
  margin-top: 20px;
`;

const Info = styled.div`
  display: flex;
  padding-left: 70px;
`;

const User = styled.button`
  margin-left: 35px;
  padding: 10px 30px;
  border: 1px solid #ddd;
  background-color: #C8256A;
  color: #fff;
  border-radius: 10px;
  cursor: pointer;
  font-size: 18px;
`;

const Abv = styled.button`
  margin-left: 18px;
  padding: 10px 30px;
  border: 1px solid #ddd;
  background-color: #C8256A;
  color: #fff;
  border-radius: 10px;
  font-size: 18px;
`;

const Like = styled.span`
  font-size: 20px;
  margin-left: 18px;
  padding: 8px;
  color: #C8256A;
`;

const View = styled.span`
  font-size: 20px;
  margin-left: 18px;
  padding: 8px;
  color: #C8256A;
`;

const Details = styled.div`
  margin-top: 20px;
  padding-left: 80px;
  padding-right: 30px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Section = styled.div`
  margin-bottom: 30px;
`;

const Title = styled.h2`
  font-size: 25px;
  color: #C8256A;
  margin-bottom: 10px;
`;

const Content = styled.p`
  font-size: 18px;
  margin-bottom: 10px;
`;

const DateContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 40px;
`;

const DateSpan = styled.span`
  font-size: 14px;
  color: #777;
  margin-right: 10px;
`;


export default CocktailDetailPage;
