import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom'; // Import useLocation from react-router-dom

const Sidebar = () => {
  const location = useLocation(); // Get the current location

  return (
    <StyledSidebar>
      <ul>
        <li className={location.pathname === '/mypage' ? 'active' : ''}>
          <a href="/mypage">프로필 설정</a>
        </li>
        <li className={location.pathname === '/mycocktails' ? 'active' : ''}>
          <a href="/mycocktails">나의 칵테일 레시피</a>
        </li>
        <li className={location.pathname === '/mycooks' ? 'active' : ''}>
          <a href="/mycooks">나의 안주 레시피</a>
        </li>
      </ul>
    </StyledSidebar>
  );
};

const StyledSidebar = styled.div`
  width: 180px;

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 10px;
  }

  a {
    text-decoration: none;
    color: #333;
  }

  li.active a {
    color: #C8256A;
  }
`;

export default Sidebar;
