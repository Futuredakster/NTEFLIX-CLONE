import React, { useState,useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {AuthContext} from '../helpers/AuthContext';
import axios from 'axios';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {setAuthState, authState} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = () => {
    const userData = {
      user: {
        password: password,
        username: username,
      },
    };


    axios.post("http://localhost:3001/users/Login", userData)
    .then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
        navigate('/Home');
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      // Handle other errors, if needed
    });
  }

  return (
    <div className='w-full h-screen'>
      <img
        className='hidden sm:block absolute w-full h-full object-cover'
        src='https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg'
        alt='/'
      />
      <div className='bg-black/60 fixed top-0 left-0 w-full h-screen'></div>
      <div className='fixed w-full px-4 py-24 z-50'>
        <div className='max-w-[450px] h-[600px] mx-auto bg-black/75 text-white'>
          <div className='max-w-[320px] mx-auto py-16'>
            <h1 className='text-3xl font-bold'>Sign In</h1>
            <form  className='w-full flex flex-col py-4'>
              <input
                onChange={(e) => setUsername(e.target.value)}
                className='p-3 my-2 bg-gray-700 rouded'
                type='email'
                placeholder='username'
                autoComplete='useranme'
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                className='p-3 my-2 bg-gray-700 rouded'
                type='password'
                placeholder='Password'
                autoComplete='current-password'
              />
              <button type="button" className='bg-red-600 py-3 my-6 rounded font-bold'onClick={handleSubmit}>
                Sign In
              </button>
              <div className='flex justify-between items-center text-sm text-gray-600'>
                <p>
                  <input className='mr-2' type='checkbox' />
                  Remember me
                </p>
                <p>Need Help?</p>
              </div>
              <p className='py-8'>
                <span className='text-gray-600'>New to Netflix?</span>{' '}
                <Link to='/'>Sign Up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;