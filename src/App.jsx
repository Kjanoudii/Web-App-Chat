import LoginPage from './components/Pages/LoginPage';
import ChatPage from './components/Pages/ChatPage';
// import FrontPage from './components/Pages/FrontPage';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [Login, setLogin] = useState(true);

  console.log(Login);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<ChatPage />} />
        <Route
          path="/components/Pages/LoginPage"
          element={<LoginPage Login={Login} setLogin={setLogin} />}
        />
        <Route path="/components/Pages/ChatPage" element={<ChatPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
