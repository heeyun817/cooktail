import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import { createCook } from '../../api/Cook';
import { getToken } from '../../api/Auth';

const CookCreatePage = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const [cookData, setCookData] = useState({
    title: '',
    recipe: '',
    difficulty: 0,
    images: ['', '', '', ''], // 이미지 파일을 저장할 배열 추가
  });

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getToken();
        // 토큰을 얻어와서 필요한 경우 상태에 저장하거나 사용할 수 있습니다.
      } catch (error) {
        console.error('토큰 가져오기 오류:', error.message);
      }
    };

    fetchToken();
  }, []); // 페이지 로드 시 한 번만 실행되도록 빈 배열을 전달

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCookData((prevData) => ({
      ...prevData,
      [name]: name === 'difficulty' ? parseFloat(value) : value,
    }));
  };

  const handleImageChange = (index, e) => {
    const file = e.target.files[0]; // 파일 리스트에서 첫 번째 파일만 선택
    console.log(file);
    if (file) {
      setCookData((prevData) => {
        const newImages = [...prevData.images];
        newImages[index] = file;
        return {
          ...prevData,
          images: newImages,
        };
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await getToken(); // 토큰 가져오기
      const response = await createCook(cookData, token); // 토큰을 매개변수로 전달
      console.log('Cook creation successful:', response);
      
      // cook의 ID를 응답 객체에서 추출합니다.
      const cookId = response;
  
      // 리다이렉션을 수행합니다.
      navigate(`/cooks/${cookId}`);
    } catch (error) {
      console.error('에러 발생:', error.message);
    }
  };
  

  return (
    <>
      <Header />
      <BoardTitle>나만의 레시피 올리기</BoardTitle>
      <Container>
        <CocktailForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label>안주 이름</Label>
            <Input
              type="text"
              name="title"
              value={cookData.title}
              onChange={handleChange}
              placeholder="안주 이름을 입력하세요"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>레시피</Label>
            <Textarea
              type="text"
              name="recipe"
              value={cookData.recipe}
              onChange={handleChange}
              placeholder="레시피를 입력하세요"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>난이도</Label>
            <Input
              type="number"
              name="difficulty"
              value={cookData.abv}
              onChange={handleChange}
              step="1"
              placeholder="난이도를 입력하세요"
              required
            />
          </FormGroup>
          {/* 4개의 이미지 업로드 폼 생성 */}
          {[...Array(4)].map((_, index) => (
            <FormGroup key={index}>
              <Label>이미지 업로드</Label>
              <Input
                type="file"
                onChange={(e) => handleImageChange(index, e)}
                accept="image/*"
                required={index === 0} // 첫 번째 이미지만 필수
              />
            </FormGroup>
          ))}
          <Button type="submit">올리기</Button>
        </CocktailForm>
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

const CocktailForm = styled.form`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 16px;
  margin-bottom: 8px;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-sizing: border-box;
`;

const Button = styled.button`
  background-color: #C8256A;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 10px;
  width: 100%;
  margin-top: 10px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-sizing: border-box;
  resize: vertical;
  min-height: 80px; 
`;

export default CookCreatePage;