import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CocktailListPage from './pages/CocktailListPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
            <>
                <Routes>
                    <Route exact path="/cocktails" element={<CocktailListPage />} />
                </Routes>
            </>
        </BrowserRouter>
    </div>
  );
}

export default App;
