import Home from "./components/pages/landingpage";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css'
import Movie from "./components/pages/moviepage";
import React, {StrictMode} from "react";
import TV from "./components/pages/tvpage";
import CastCrew from "./components/pages/castcrewpage";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import SignUp from "./components/pages/signup";
import Login from "./components/pages/login";
import FavouritesPage from "./components/pages/favourites";
import CreditsPage from "./components/pages/creditspage";
function App() {
  return (
    <StrictMode>
    <Router>
    <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='login' element={<Login />} />
    <Route path='/signup' element={<SignUp />} />
    <Route path='/movie/:movieID' element={<Movie/>} />
    <Route path='/tv/:tvID' element={<TV />} />
    <Route path='/person/:personID' element={<CastCrew/>} />
    <Route path='/favourites' element={<FavouritesPage />} />
    <Route path='/credits' element={<CreditsPage />} />
    </Routes>
    </Router>
    <ToastContainer />
    </StrictMode> 
  );
}

export default App;
