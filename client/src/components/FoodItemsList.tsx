import React from "react";
import {Typography, Button} from '@mui/material';
import {useState, useEffect} from 'react'
import {getFoodItems} from '../services/FoodItems.service';
import {FoodItem as FoodItemType} from '../FoodItems.types';
import FoodItem from "./FoodItem";
import {Link} from 'react-router-dom'
import {deleteFoodItem} from '../services/FoodItems.service';
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const FoodItemsList = () => {
    const [foodItems, setFoodItems] = useState<FoodItemType[]>([]);
    const navigate = useNavigate();
    const {isAuthenticated, logout, getAccessTokenSilently, user} = useAuth0();
    console.log(user)

    async function handleDelete(id: number) {
      // @TODO add confirmation dialog
      // await deleteFoodItem(id).then(() => getFoodItems(accessToken).then((response) => {
      //   setFoodItems(response);
      // }
      // ));
      try {
        const accessToken = await getAccessTokenSilently();
        await deleteFoodItem(id, accessToken);
        const foodItems = await getFoodItems(accessToken);
        setFoodItems(foodItems);
      } catch (error) {
        console.error("Error deleting food item:", error);
      }
    }
    async function handleEdit(foodItem: FoodItemType) {
      return navigate('/update-food-item', {state: {foodItem: foodItem}})
    }

    const handleLogout = () => {
      logout({
        logoutParams: {
          returnTo: window.location.origin,
        }
      })
    }
   
    useEffect(() => {
      const fetchFoodItems = async () => {
        if (!isAuthenticated) return;
        try {
          const accessToken = await getAccessTokenSilently();
          const response = await getFoodItems(accessToken);
          setFoodItems(response);
        } catch (error) {
          console.error("Error fetching food items:", error);
        }
      };
      fetchFoodItems()
    }, [isAuthenticated, getAccessTokenSilently])

  //@TODO list view = pantry view that will involve a lot of stlying 
  //@TODO filter by expiration date and show items that will expire in the next 3 days in red and at the beginning
    return (
        <div style={{width: '50%', height: '100%',  marginLeft: '20%', marginRight: '20%'}}>
          <Button onClick={() => handleLogout()}>Logout</Button>
          <Typography variant='h1'>Food Items</Typography>
          {/* //@TODO add a search bar */}
          {/* //@TODO make all panels close? or close prev panel when opening another one */}
           {/* //@TODO make display grid */}
          {foodItems.map((foodItem: FoodItemType, index) => (
          <FoodItem key={index} foodItem={foodItem} handleDelete={handleDelete} handleEdit={handleEdit}/>
          )
          )}
          <Link to='/new-food-item'>
          <Button variant='outlined'>Add new item</Button>
          </Link>
        </div>
    )
}

export default FoodItemsList;