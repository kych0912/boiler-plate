
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import Register from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth';
import React,{Suspense} from 'react';
import NavBar from './components/views/NavBar/NavBar';
import Footer from "./components/views/Footer/Footer";

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
    <NavBar/>
    <Router>
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Routes>
          <Route exact path="/" element = {<LandingPage />} />
          <Route path="/Login" element = {<LoginPage />} />
          <Route path="/Register" element = {<Register />} />
        </Routes>
      </div>
    </Router>
    </Suspense>
  );
}

export default App;
