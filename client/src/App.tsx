import React, { useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";
import './App.css'
import NewItemForm from './components/NewItemForm';
import FoodItemsList from './components/FoodItemsList';
import LoginPage from './components/LoginPage';
import { User, UserContext } from './contexts/UserContext';
import { getPantryNumber } from './services/Pantries.service';
import { useAuth0 } from '@auth0/auth0-react';
import NavBar from './components/NavBar';
import { getItemsList } from './services/ItemsList.service';
import { ItemsContext, NewItem } from './contexts/ItemsContext';
import { APIItem, FoodCategory } from './FoodItems.types';
import { createItem } from './services/ItemsList.service';
import { getCategoriesNames } from './services/Categories.service';

// @TODO add translations
export const App = () => {
  const {user, isAuthenticated, getAccessTokenSilently, logout, loginWithRedirect} = useAuth0();
    const [userState, setUserState] = useState<User>({
        auth0Id: '',
        name: '',
        email: '',
        pantryId: '',
        accessToken: '',
        isAuthenticated: false
    });
    const [foodItems, setFoodItems] = useState<APIItem[]>([]);

    const [foodCategories, setFoodCategories] = useState<FoodCategory[]>([]);

    const getFoodItemsOptions = async (): Promise<void> => {
      try {
          const items = await getItemsList();
          setFoodItems(items);
      } catch (error) {
          console.error('Error getting items list', error)
      }
    };

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
          await getFoodItemsOptions();
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

    const handleLogin = async () => {
      await loginWithRedirect({
        appState: {
          returnTo: "food-items-list",
        },
      });
    };

    const handleSignUp = async () => {
      await loginWithRedirect({
        appState: {
          returnTo: "food-items-list",
        },
        authorizationParams: {
          screen_hint: "signup",
        },
      });
    };

    const handleCreateNewItem = async (item: NewItem) => {
      try {
        await createItem(userState.accessToken, item);
        await getFoodItemsOptions();
      } catch (error) {
        console.error("Error creating NEW food item:", error);
      }
    }

    const getFoodCategories = async () => {
      try {
        const categories = await getCategoriesNames();
        setFoodCategories(categories);
      } catch (error) {
        console.error("Error getting food categories:", error);
      }
    }

    useEffect(() => {
      getFoodCategories();
    }, [])

    const userValue = {user: userState, setUser: setUserState}

    const itemsValue = {items: foodItems, foodCategories: foodCategories, setItems: setFoodItems, addItem: handleCreateNewItem}
    
  return (
    <UserContext.Provider value={userValue}>
      <NavBar handleLogout={handleLogout} isAuthenticated={isAuthenticated} handleLogin={handleLogin} handleSignUp={handleSignUp}/>
        <ItemsContext.Provider value={itemsValue}>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="food-items-list" element={<FoodItemsList />} />
            <Route path="new-food-item" element={<NewItemForm />} />
            <Route path="update-food-item" element={<NewItemForm />} />
          </Routes>
        </ItemsContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
