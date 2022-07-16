import './App.css';
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage/Homepage';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import HomePage from './pages/Home Page/HomePage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage></Homepage>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/users" element={<HomePage></HomePage>}></Route>
      </Routes>
    </div>
  );
}

export default App;
