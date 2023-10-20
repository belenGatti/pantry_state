import React, { useContext } from "react";
import {Typography, Button, Grid, List, ListItem, Paper} from '@mui/material';
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
          console.log("Food items:", response)
          setFoodItems(response);
        } catch (error) {
          console.error("Error fetching food items:", error);
        }
      };
      fetchFoodItemsForUser()
    }, [user.isAuthenticated, user.accessToken])

    const expiredItems: FoodItemType[] = [];
    const itemsExpiringThisWeek: FoodItemType[] = [];

    const getExpiredAndSoonToExpireItems = () => {
      const today = new Date();
      const nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
      foodItems.forEach(foodItem => {
        const expirationDate = new Date(foodItem.expirationDate);
        if (expirationDate <= today) {
          expiredItems.push(foodItem);
        } else if (expirationDate <= nextWeek) {
          itemsExpiringThisWeek.push(foodItem);
        }
      })
    }

    getExpiredAndSoonToExpireItems();
  
  //@TODO list view = pantry view that will involve a lot of stlying 
  //@TODO filter by expiration date and show items that will expire in the next 3 days in red and at the beginning
    return (
        <div style={{width: '50%', height: '100%',  marginLeft: '20%', marginRight: '20%'}}>
          <Typography variant='h1'>Food Items</Typography>
          {/* //@TODO add a search bar */}
          {/* //@TODO make all panels close? or close prev panel when opening another one */}
           {/* //@TODO make display grid with boxes for each category of pantry item*/}
           <Paper style={{backgroundColor: '#DD6031', margin: '10px', padding: '10px', width: '200px', height: '200px'}} elevation={3}>
              <Typography>Expiring this week:</Typography>
              <List>
                {itemsExpiringThisWeek.map((foodItem: FoodItemType, index) => (
                  <ListItem>
                    <Typography key={index}>{foodItem.name}</Typography>
                  </ListItem>
                ))}
              </List>
           </Paper>
           <Paper style={{backgroundColor: '#ED474A', margin: '10px', padding: '10px', width: '200px', height: '200px'}} elevation={3}>
              <Typography>Expired:</Typography>
              <List>
                {expiredItems.map((foodItem: FoodItemType, index) => (
                  <ListItem>
                    {/* @TODO add icon to item https://mui.com/joy-ui/react-list/#decorators add to database aswell */}
                    <Typography key={index}>{foodItem.name}</Typography>
                  </ListItem>
                ))}
              </List>
           </Paper>
          <Grid container spacing={1}>
            {foodItems.map((foodItem: FoodItemType, index) => (
              <FoodItem key={index} foodItem={foodItem} handleDelete={handleDelete} handleEdit={handleEdit}/>
            )
            )}
          </Grid>
          <Link to='/new-food-item'>
          <Button variant='outlined'>Add new item</Button>
          </Link>
        </div>
    )
}

export default FoodItemsList;