import './App.css';

import Button from './components/Button';
import Card from './components/Card';

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="button" element={<><Button /><Outlet /></>}>
          <Route path="card" element={<Card />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
