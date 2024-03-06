import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CocktailListPage from './pages/CocktailListPage';
import CocktailDetailPage from './pages/CocktailDetailPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
            <>
                <Routes>
                    <Route exact path="/cocktails" element={<CocktailListPage />} />
                    <Route exact path="/cocktails/:id" element={<CocktailDetailPage />} />
                </Routes>
            </>
        </BrowserRouter>
    </div>
  );
}

export default App;
