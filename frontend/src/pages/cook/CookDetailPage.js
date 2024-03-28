import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import { getCookById, addLike, deleteLike, checkLikeStatus, checkIsOwnCook, deleteCook } from '../../api/Cook';
import { getToken } from '../../api/Auth';
import { useParams, useNavigate } from 'react-router-dom';

// 좋아요 아이콘 import
import likeIcon from '../../assets/images/like.png';
import likedIcon from '../../assets/images/liked.png';

const CookDetailPage = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [cook, setCook] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [thumbnails, setThumbnails] = useState([]);
  const [likeStatus, setLikeStatus] = useState(false); // 좋아요 상태 추가
  const [isOwnCook, setIsOwnCook] = useState(false);

  useEffect(() => {
    const fetchCook = async () => {
      try {
        const cookData = await getCookById(id);
        setCook(cookData);
        setMainImage(cookData.images[0]);
        setThumbnails(cookData.images.slice(1));

        // Check the initial like status
        const token = getToken();

        const initialLikeStatus = await checkLikeStatus(id, token);
        setLikeStatus(initialLikeStatus);

        const ownCookStatus = await checkIsOwnCook(id, token);
        setIsOwnCook(ownCookStatus);
      } catch (error) {
        console.error('Error fetching cook:', error);
      }
    };

    fetchCook();
  }, [id]);

  if (!cook) {
    return <div>Loading...</div>;
  }

  const handleThumbnailClick = (clickedImage) => {
    setThumbnails((prevThumbnails) => {
      const updatedThumbnails = [...prevThumbnails, mainImage];
      setMainImage(clickedImage);
      return updatedThumbnails.filter((thumbnail) => thumbnail !== clickedImage);
    });
  };
  
  const handleLikeClick = async () => {
    try {
      const token = getToken();

      if (!token) {
        alert('로그인이 필요합니다.');
        return;
      }
      
      const likeStatus = await checkLikeStatus(id, token);

      if (likeStatus) {
        await deleteLike(id, token);
      } else {
        await addLike(id, token);
      }

      const updatedCook = await getCookById(id);
      setCook(updatedCook);

      // Toggle the like status
      setLikeStatus(!likeStatus);
    } catch (error) {
      console.error('Error handling like click:', error);
    }
  };

  const handleEditClick = () => {
    // Redirect to the edit page with the cook id
    navigate(`/cooks/${id}/update`);
  };

  const handleDeleteClick = async () => {
    try {
      const token = getToken();

      if (!token) {
        alert('로그인이 필요합니다.');
        return;
      }

      // Confirm deletion
      const confirmDelete = window.confirm('정말로 삭제하시겠습니까?');

      if (confirmDelete) {
        // Call the deleteCook API
        await deleteCook(id, token);
        // Redirect to the home page or any other page after deletion
        navigate('/cooks');
      }
    } catch (error) {
      console.error('Error handling delete click:', error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleString('ko-KR', options);
  };

  return (
    <>
      <Header />
      <BoardTitle>{cook?.title || 'Untitled Cook'}</BoardTitle>
      <Container>
        <ImagesContainer>
          <MainImage src={mainImage} alt="Main Cook Image" />
          <ThumbnailContainer>
            {thumbnails.map((thumbnail, index) => (
              <Thumbnail
                key={index}
                src={thumbnail}
                alt={`Cook Thumbnail ${index + 1}`}
                onClick={() => handleThumbnailClick(thumbnail)}
              />
            ))}
          </ThumbnailContainer>
        </ImagesContainer>
        <ExplainContainer>
          <InfoContainer>
            <Info>
              <User>{cook?.member?.nickname}님의 레시피</User>
              <Abv>난이도: {cook?.difficulty}</Abv>
              <LikeIcon src={likeStatus ? likedIcon : likeIcon} alt="Like Icon" onClick={handleLikeClick} style={{ cursor: 'pointer' }} />
              <Like>좋아요 {cook?.likes}</Like>
              <View>조회수 {cook?.views}</View>
            </Info>
            <Details>
              <Section>
                <Title>레시피 설명</Title>
                <Content>{cook?.recipe}</Content>
              </Section>
            </Details>
          </InfoContainer>
          <DateContainer>
          {isOwnCook && (
              <>
                <EditButton onClick={handleEditClick}>
                  수정하기
                </EditButton>
                <DeleteButton onClick={handleDeleteClick}>
                  삭제하기
                </DeleteButton>
              </>
            )}
            <DateSpan>작성일: {formatDate(cook?.createdAt)}</DateSpan>
            {cook?.createdAt !== cook?.updatedAt && (
              <DateSpan>수정일: {formatDate(cook?.updatedAt)}</DateSpan>
            )}
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
  padding: 8px;
  color: #C8256A;
`;

const View = styled.span`
  font-size: 20px;
  margin-left: 5px;
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
  white-space: pre-wrap;
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

const LikeIcon = styled.img`
  width: 33px;
  height: 33px;
  margin-left: 20px;
`;

const EditButton = styled.button`
background: none;
  color: #777;
  border: none;
  margin-right: 5px;
  cursor: pointer;
`;

const DeleteButton = styled.button`
background: none;
  color: #812;
  border: none;
  cursor: pointer;
  margin-right: 15px;
`;

export default CookDetailPage;
