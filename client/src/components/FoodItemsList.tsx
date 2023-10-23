import React, { useContext } from "react";
import {Typography, Button, Grid} from '@mui/material';
import {useState, useEffect} from 'react'
import {getFoodItems} from '../services/FoodItems.service';
import {FoodItem as FoodItemType} from '../FoodItems.types';
import FoodItem from "./FoodItem";
import {Link} from 'react-router-dom'
import {deleteFoodItem} from '../services/FoodItems.service';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import ItemsPostIt from "./ItemsPostIt";

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
    let foodCategories: string[] = [];

    /** Makes two arrays, one for expired items and another one for soon to be expired items,
     *  ordering them by expiration date (first to expire, first in the list) */
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

      expiredItems.sort((a, b) => new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime());
      itemsExpiringThisWeek.sort((a, b) => new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime());
    }

    const getFoodItemsByCategory = () => {
      foodCategories = [...new Set(foodItems.map(foodItem => foodItem.category))];
      return foodCategories;
    }

    getExpiredAndSoonToExpireItems();
    getFoodItemsByCategory();
  
  //@TODO list view = pantry view that will involve a lot of stlying
    return (
        <div style={{height: '100%',  marginLeft: '5%', marginRight: '5%'}}>
          <Typography variant='h3'>Food Items</Typography>
          {/* //@TODO add a search bar */}
          {/* //@TODO make all panels close? or close prev panel when opening another one */}
           {/* //@TODO make display grid with boxes for each category of pantry item*/}
           {itemsExpiringThisWeek.length && (
            <ItemsPostIt items={itemsExpiringThisWeek} title='Items expiring this week'/>
           )}
           {expiredItems.length && (
            <ItemsPostIt items={expiredItems} title='Expired items'/>
           )}
          <Grid container spacing={{xs: 3, xl: 1}} style={{width: '100%', display: 'flex', justifyContent: 'space-around'}} columns={{xs: 12, s: 4, md: 3, xl: 2}}>
            {foodCategories.map((category: string) => (
              <Grid item style={{ marginRight: '2rem'}} key={category}>
                <Typography variant='h5'>{category}</Typography>
                {foodItems.filter(foodItem => foodItem.category === category).map((foodItem: FoodItemType, index) => (
                  <FoodItem key={index} foodItem={foodItem} handleDelete={handleDelete} handleEdit={handleEdit}/>
                ))
            }
              </Grid>
            ))}
          </Grid>
          <Link to='/new-food-item'>
          <Button variant='outlined'>Add new item</Button>
          </Link>
        </div>
    )
}

export default FoodItemsList;