import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Header = () => {
  const isLoggedIn = false; // 로그인 상태 여부

  return (
    <HeaderContainer>
      <Logo>COOKTAIL</Logo>
      <Navigation>
        <ul>
          <NavItem><Link to="/cocktails">칵테일 레시피</Link></NavItem>
          <NavItem><Link to="/cooks">안주 레시피</Link></NavItem>
          <NavItem><Link to="/mypage">마이 페이지</Link></NavItem>
        </ul>
      </Navigation>
      <UserActions>
        {isLoggedIn ? (
          <button>로그아웃</button>
        ) : (
          <button>로그인</button>
        )}
      </UserActions>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 10px 50px;
  background-color: #fff;
`;

const Logo = styled.div`
  height: 25px;
  font-size: 20px;
  color: #C8256A;
  font-weight: bold;
  display: flex;
  align-items: center;
`;

const Navigation = styled.nav`
margin-left: auto;
  ul {
    list-style: none;
    display: flex;
    margin-left: auto;
  }
`;

const NavItem = styled.li`
  margin-left: 20px;

  a {
    text-decoration: none;
    color: #000;
    font-weight: bold;
    font-size: 15px;
  }
`;

const UserActions = styled.div`
  button {
    background-color: #C8256A;
    color: white;
    border: none;
    padding: 5px 20px;
    text-align: center;
    text-decoration: none;
    font-size: 15px;
    cursor: pointer;
    border-radius: 10px;
    margin-left: 20px;
    display: flex;
    align-items: center; 
  }
`;

export default Header;
