import React from 'react';
import {Routes, BrowserRouter, Route} from "react-router-dom";
import {TodoMainPage} from "./pages/TodoMainPage/TodoMainPage.tsx";
import {LoginPage} from "./pages/LoginPage/LoginPage.tsx";
import {RegisterPage} from "./pages/RegisterPage/RegisterPage.tsx";
import {NotFound} from "./pages/NotFound/NotFound.tsx";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodoMainPage />} />
        <Route path="/login" element={<LoginPage /> } />
        <Route path="register" element={<RegisterPage /> } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
