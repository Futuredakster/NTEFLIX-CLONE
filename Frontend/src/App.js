import Navbar from "./compnents/Navbar";
import Home from './pages/Home';
import Signup from "./pages/Signup";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthContext } from "./helpers/AuthContext";
import Login from "./pages/Login";
import MyMovies from "./pages/MyMovies";
import axios from 'axios';

function App() {
  const [authState, setAuthState] = useState({username:"", id:0, status:false, movie_id:0});

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      // Handle the case where there is no access token (e.g., redirect to login page)
      setAuthState({...authState, status:false});
    } else{
    axios.get("http://localhost:3001/users/auth", {
      headers: {
        accessToken: accessToken,
      },
    })
      .then((response) => {
        console.log("got a response", response);
        if (response.data.error) {
          setAuthState({...authState, status:false});
        } else {
          setAuthState({username:response.data.username, id:response.data.id, status:true,movie_id:response.data.movie_id });
        }
      });
    }
    
  },[]); 
  
  return (
    <div>
      <AuthContext.Provider value={{authState, setAuthState}}>
    <Navbar/>
    <Routes>
      <Route path='/Home'element={<Home/>} />
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<Signup />} />
      <Route path='/MyMovies' element={<MyMovies/>} />
    </Routes>
    </AuthContext.Provider> 
    </div>
  );
}

export default App;
