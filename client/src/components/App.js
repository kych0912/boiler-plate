
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import LandingPage from './views/LandingPage/LandingPage';
import LoginPage from './views/LoginPage/LoginPage';
import Register from './views/RegisterPage/RegisterPage';
import Auth from '../hoc/auth';
import React,{Suspense} from 'react';
import NavBar from './views/NavBar/NavBar';
import Footer from "./views/Footer/Footer";

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
    <Footer/>
    </Suspense>
  );
}

export default App;
