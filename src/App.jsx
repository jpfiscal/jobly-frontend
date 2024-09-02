import { useState, useEffect } from 'react'
import { BrowserRouter } from "react-router-dom";
import './App.css'
import AppRoutes from "./routes";
import NavBar from './NavBar';
import JoblyApi from './api/api';
import userContext from './userContext';
import { useLocalStorage } from './hooks';

function App() {
  const [currentUser, setCurrentUser] = useLocalStorage(JSON.parse(localStorage.getItem('currUser')));
  const [token, setToken] = useState('');
  useEffect(function setupCurrentUser(){
    async function currUserSetup(){
      if(token){
        const decodeToken = await JoblyApi.decodeToken(token)
        setCurrentUser(decodeToken);
      }
    }
    currUserSetup();
  },[token]);

  async function login (username, password) {
    const loginToken = await JoblyApi.getToken(username, password);
    setToken(loginToken);
  };

  async function signup (username, password, firstName, lastName, email) {
    const loginToken = await JoblyApi.registerUser(username, password, firstName, lastName, email);
    setToken(loginToken);
  };

  function logout () { 
    setToken('');
    setCurrentUser(null);
  };

  function updateUser (username, firstName, lastName, password, email){
    JoblyApi.updateUser(username, firstName, lastName, password, email);
  }

  return (
    <BrowserRouter>
      <userContext.Provider value={currentUser}>
        <div className='App'>
          <NavBar logout={logout}/>
          <AppRoutes login={login} signup={signup} updateUser={updateUser}/>
        </div>
      </userContext.Provider>
    </BrowserRouter>
  )
}

export default App;
