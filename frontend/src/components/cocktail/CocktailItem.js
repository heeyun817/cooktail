import React from 'react';
import styled from 'styled-components';

const CocktailItem = ({ cocktail }) => {
  const { id, title, description, ingredient, recipe, abv, member, views, likes, images } = cocktail;
  let { createdAt, updatedAt } = cocktail;
  createdAt = createdAt.split('T')[0];
  updatedAt = updatedAt ? updatedAt.split('T')[0] : null;
  return (
    <ItemContainer>
      <Image src={images} />
      <TextContainer>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <Info>
          <User><span>{member.nickname}</span></User>
          <span>· {createdAt}</span>
          <span>· 조회 {views}</span>
          <span> · 좋아요 {likes}</span>
        </Info>
      </TextContainer>
    </ItemContainer>
  );
};


const ItemContainer = styled.div`
  width: 268px;
  height: 262px;
  margin: 10px;
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
  width: 268px;
  height: 172px;
  object-fit: cover;
  border-radius: 10px;
`;

const TextContainer = styled.div`
  padding: 5px;
`;

const Title = styled.p`
  font-size: 20px;
  margin-bottom: 0px;
  margin-top: 7px;
`;

const Description = styled.p`
  font-size: 13px;
  margin-bottom: 10px;
  color: #525252;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #525252;
`;

const User = styled.div`
  color: #C8256A;
`;

export default CocktailItem;
