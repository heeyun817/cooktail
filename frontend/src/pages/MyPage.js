import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { getToken } from '../api/Auth';
import { getMyInfo, changeMyInfo } from '../api/MyPage';
import editIcon from '../assets/images/edit.png';

const MyPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [formValues, setFormValues] = useState({
    name: '',
    nickname: '',
    phone: '',
    birthDate: '',
    bio: ''
    // 기타 필요한 폼 필드 추가
  });
  const [profileImage, setProfileImage] = useState(null); // 프로필 이미지 상태 추가

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = await getToken(); // 토큰 가져오기
        const userData = await getMyInfo(token); // 사용자 정보 가져오기
        setUserInfo(userData); // 가져온 사용자 정보로 상태 업데이트
        // 가져온 사용자 정보로 폼 데이터 초기화
        setFormValues({
          name: userData.name,
          nickname: userData.nickname,
          phone: userData.phone,
          birthDate: userData.birthDate,
          bio: userData.bio,
          image: userData.image
          // 기타 필요한 필드 초기화
        });
      } catch (error) {
        console.error('사용자 정보 가져오기 오류:', error.message);
      }
    };

    fetchUserInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // 프로필 이미지 변경 이벤트 처리 함수
  const handleImageChange = (e) => {
    const imageFile = e.target.files[0]; // 파일 선택
    setProfileImage(imageFile); // 선택된 이미지를 상태에 저장
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await getToken(); // 토큰 가져오기
      await changeMyInfo(formValues, profileImage, token); // 수정된 정보와 프로필 이미지 전송
      window.location.reload(); // 페이지 새로고침
    } catch (error) {
      console.error('내 정보 수정 오류:', error);
      // 오류 처리
    }
  };

  return (
    <>
      <Header />
      <BoardTitle>마이페이지</BoardTitle>
      <Container>
        {userInfo ? (
          <form onSubmit={handleSubmit}>
            <UserInfoContainer>
              <ProfilePicture>
                <img src={userInfo.image} alt="프로필 이미지" />
              </ProfilePicture>
              <UserInfoItem>
                <label htmlFor="profileImage">프로필 이미지:</label>
                <input type="file" id="profileImage" name="profileImage" onChange={handleImageChange} accept="image/*" />
              </UserInfoItem>
              <UserInfoItem>
                <label htmlFor="nickname">닉네임:</label>
                <input type="text" id="nickname" name="nickname" value={formValues.nickname} onChange={handleChange} />
              </UserInfoItem>
              <UserInfoItem>
                <label htmlFor="bio">소개:</label>
                <textarea id="bio" name="bio" value={formValues.bio} onChange={handleChange} />
              </UserInfoItem>
              <UserInfoItem>
                <label htmlFor="email">이메일:</label>
                <input type="text" id="email" name="email" value={userInfo.email} disabled />
              </UserInfoItem>
              <UserInfoItem>
                <label htmlFor="name">이름:</label>
                <input type="text" id="name" name="name" value={formValues.name} onChange={handleChange} />
              </UserInfoItem>
              <UserInfoItem>
                <label htmlFor="phone">전화번호:</label>
                <input type="text" id="phone" name="phone" value={formValues.phone} onChange={handleChange} />
              </UserInfoItem>
              <UserInfoItem>
                <label htmlFor="birthDate">생년월일:</label>
                <input type="date" id="birthDate" name="birthDate" value={formValues.birthDate} onChange={handleChange} />
              </UserInfoItem>
            </UserInfoContainer>
            <button type="submit">수정하기</button>
          </form>
        ) : (
          <LoadingMessage>사용자 정보를 불러오는 중...</LoadingMessage>
        )}
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
  max-width: 940px;
  border-radius: 20px;
  border: 1px solid #ccc;
  padding: 50px;
  position: relative;
  margin: 0 auto;
  display: flex;
  align-items: flex-start;
`;

const UserInfoContainer = styled.div`
  flex: 1;
`;

const UserInfoItem = styled.div`
  margin-bottom: 20px;

  label {
    font-weight: bold;
  }

  input,
  textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
`;

const LoadingMessage = styled.div`
  font-size: 16px;
  text-align: center;
  margin-top: 50px;
`;

const ProfilePicture = styled.div`
  position: relative;
  margin-bottom: 20px;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default MyPage;
