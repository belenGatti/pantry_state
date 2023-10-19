import React, { useContext } from "react";
import {Typography, Button} from '@mui/material';
import {useState, useEffect} from 'react'
import {getFoodItems} from '../services/FoodItems.service';
import {FoodItem as FoodItemType} from '../FoodItems.types';
import FoodItem from "./FoodItem";
import {Link} from 'react-router-dom'
import {deleteFoodItem} from '../services/FoodItems.service';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const FoodItemsList = () => {
    const {user} = useContext(UserContext);
    const [foodItems, setFoodItems] = useState<FoodItemType[]>([]);
    const navigate = useNavigate();

    async function handleDelete(id: number) {
      // @TODO add confirmation dialog
      // await deleteFoodItem(id).then(() => getFoodItems(accessToken).then((response) => {
      //   setFoodItems(response);
      // }
      // ));
      try {
        await deleteFoodItem(id, user.accessToken);
        const foodItems = await getFoodItems(user.accessToken, user.pantryId.toString());
        setFoodItems(foodItems);
      } catch (error) {
        console.error("Error deleting food item:", error);
      }
    }
    async function handleEdit(foodItem: FoodItemType) {
      return navigate('/update-food-item', {state: {foodItem: foodItem}})
    }
   
    useEffect(() => {
      const fetchFoodItemsForUser = async () => {
        if (!user.isAuthenticated) return;
        try {
          const response = await getFoodItems(user.accessToken, user.pantryId.toString());
          setFoodItems(response);
        } catch (error) {
          console.error("Error fetching food items:", error);
        }
      };
      fetchFoodItemsForUser()
    }, [user.isAuthenticated, user.accessToken])

  //@TODO list view = pantry view that will involve a lot of stlying 
  //@TODO filter by expiration date and show items that will expire in the next 3 days in red and at the beginning
    return (
        <div style={{width: '50%', height: '100%',  marginLeft: '20%', marginRight: '20%'}}>
          <Typography variant='h1'>Food Items</Typography>
          <Typography variant='h2'>{user.name}'s Pantry</Typography>
          {/* //@TODO add a search bar */}
          {/* //@TODO make all panels close? or close prev panel when opening another one */}
           {/* //@TODO make display grid with boxes for each category of pantry item*/}
           {/* @TODO make a red box where items are expiring soon */}
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