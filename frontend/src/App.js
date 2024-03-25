import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CocktailListPage from './pages/cocktail/CocktailListPage';
import CocktailDetailPage from './pages/cocktail/CocktailDetailPage';
import CocktailCreatePage from './pages/cocktail/CocktailCreatePage';
import CocktailUpdatePage from './pages/cocktail/CocktailUpdatePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import SignUpSuccess from './pages/SingUpSuccessPage';
import MyPage from './pages/MyPage';
import MyRecipePage from './pages/MyRecipePage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
            <>
                <Routes>
                    <Route exact path="/cocktails" element={<CocktailListPage />} />
                    <Route exact path="/cocktails/:id" element={<CocktailDetailPage />} />
                    <Route exact path="/cocktails/create" element={<CocktailCreatePage />} />
                    <Route exact path="/cocktails/:id/update" element={<CocktailUpdatePage />} />
                    <Route exact path="/login" element={<LoginPage />} />
                    <Route exact path="/signup" element={<SignUpPage />} />
                    <Route exact path="/signup/success" element={<SignUpSuccess />} />
                    <Route exact path="/mypage" element={<MyPage />} />
                    <Route exact path="/myrecipe" element={<MyRecipePage />} />
                </Routes>
            </>
        </BrowserRouter>
    </div>
  );
}

export default App;
