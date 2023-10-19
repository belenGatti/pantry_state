import React, { useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";
import './App.css'
import NewItemForm from './components/NewItemForm';
import FoodItemsList from './components/FoodItemsList';
import LoginPage from './components/LoginPage';
import { User, UserContext } from './contexts/UserContext';
import { getPantryNumber } from './services/Pantries.service';
import {useAuth0} from '@auth0/auth0-react';
import {Button} from '@mui/material';

export const App = () => {
  const {user, isAuthenticated, getAccessTokenSilently, logout} = useAuth0();
    const [userState, setUserState] = useState<User>({
        auth0Id: '',
        name: '',
        email: '',
        pantryId: '',
        accessToken: '',
        isAuthenticated: false
    });
    useEffect(() => {
      const getAccessTokenAndPantryId = async () => {
        if (!user) return;
        try {
          const accessToken = await getAccessTokenSilently();
          const pantryId = await getPantryNumber(accessToken, user.sub!);
          setUserState({
              auth0Id: user.sub!,
              name: user.name!,
              email: user.email!,
              pantryId: pantryId,
              accessToken: accessToken,
              isAuthenticated: isAuthenticated
          })
        } catch (error) {
          console.error("Error getting access token and pantry id:", error);
        }
    }
    getAccessTokenAndPantryId();
    }, [user, isAuthenticated, getAccessTokenSilently])

    const handleLogout = () => {
      setUserState({
        auth0Id: '',
        name: '',
        email: '',
        pantryId: '',
        accessToken: '',
        isAuthenticated: false
      })
      logout({
        logoutParams: {
          returnTo: window.location.origin,
        }
      })
    }

    const userValue = {user: userState, setUser: setUserState}
    
  return (
    <UserContext.Provider value={userValue}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="food-items-list" element={<FoodItemsList />} />
        <Route path="new-food-item" element={<NewItemForm />} />
        <Route path="update-food-item" element={<NewItemForm />} />
      </Routes>
      {/* @TODO move this to navbar */}
      {isAuthenticated && (
        <Button onClick={() => handleLogout()}>Logout</Button>)}
    </UserContext.Provider>
  );
}

export default App;
