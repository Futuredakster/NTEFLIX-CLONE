import { Link } from 'react-router-dom';
import React, { useState,useContext } from "react";
import {AuthContext} from '../helpers/AuthContext';



const Navbar = () => {
    
const {authState, setAuthState} = useContext(AuthContext);

const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userMovies");
    setAuthState({ username: "", id: 0, status: false });
  };

    return(
        <div className='flex items-center justify-between p-4 z-[100] w-full absolute'>
            <Link to="/Home" className='text-red-600 text-4xl font-bold cursor-pointer'> NETFLIX</Link>
               <div>
               {!authState.status ?(
                <Link to="/Login" className="text-white pr-4">Sign In</Link>
                ):(
                 <Link to='/MyMovies' className="text-white pr-4">{authState.username}</Link>
                )}
                <Link to="/Login" className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white" onClick={logout}>Sign Out</Link>
               </div>
        </div>
    )
}
export default Navbar;