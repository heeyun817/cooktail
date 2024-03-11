import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { useNavigate } from 'react-router-dom';

const SignUpSuccess = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <Container>
      <Title>
        반가워요, ddd님!
      </Title>
      <WhiteButton onClick={() => navigate('/')}>
        메인으로 가기
      </WhiteButton>
      </Container>
      <Footer />
    </>
  );
};

const Title = styled.h1`
  font-size: 25px;
  text-align: center;
  margin-bottom: 50px;
`;

const Container = styled.div`
  width: 100%;
  max-width: 940px;
  border-radius: 20px;
  border: 1px solid #ccc;
  padding: 40px;
  position: relative;
  margin: 50px auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const WhiteButton = styled.button`
  width: 100%;
  height: 55px;
  margin-top: 15px;
  border-radius: 14px;
  border: 0.5px solid ${(props) => props.theme.Gray_01};
  font-size: 16px;
  background-color: #fff;
  color: ${(props) => props.theme.Black_Main};
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
  > div {
    margin-left: 5px;
  }
`;

export default SignUpSuccess;
