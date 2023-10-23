import React from "react";
import {FoodItem as FoodItemType} from '../FoodItems.types';
import {Paper, Typography, List, ListItem, Grid, Tooltip} from '@mui/material'
import { formatRelative } from 'date-fns'

interface ItemsPostItProps {
    items: FoodItemType[];
    title: string;
}

/** ItemsPostIt is a component thought to render expired and soon to be expiring soon items in columns.
 *  If there are less than 5 items they all are rendered in one column, if there are 10 or less, in two columns,
 *  and if the number of items is greater than 10 an ellipsis appears and on hover shows the rest of items. 
 *  Items number 1 is always the one closest to expire */

const ItemsPostIt = (itemsPostItProps:ItemsPostItProps ) => {
    const {items, title} = itemsPostItProps;
    let restOfItems: string = '';
    if (items.length > 10) {
        restOfItems = items.slice(10).map((foodItem: FoodItemType) => foodItem.name).join(', ');
    }
    const getBackgroundColor = (title: string) => {
        return title == 'Expired items' ? '#ED474A' : '#DD6031'
    }

    return (
        <>
        <Paper style={{backgroundColor: getBackgroundColor(title), margin: '10px', padding: '10px', paddingBottom: '0px', width: '245px', height: '245px'}} elevation={3}>
        <Typography>{title}:</Typography>
        {items.length < 5 && (
            <Grid container>
            <List>
                {items.map((foodItem: FoodItemType) => (
                <ListItem key={foodItem.id}>
                    {/* @TODO add icon to item https://mui.com/joy-ui/react-list/#decorators add to database aswell */}
                    <Tooltip title={`Expiration date: ${formatRelative(new Date(foodItem.expirationDate), new Date())}`}>
                        <Typography variant='body1'>{foodItem.name}</Typography>
                    </Tooltip>
                </ListItem>
                ))}
            </List>
            </Grid>
        )}
        {items.length >= 5 && (
            <Grid container>
                <Grid item xs={6}>
                <List>
                    {items.slice(0, 5).map((foodItem: FoodItemType) => (
                    <ListItem key={foodItem.id}>
                        <Tooltip title={`Expiration date: ${formatRelative(new Date(foodItem.expirationDate), new Date())}`}>
                            {/* @TODO add icon to item https://mui.com/joy-ui/react-list/#decorators add to database aswell */}
                            <Typography variant='caption'>{foodItem.name}</Typography>
                        </Tooltip>
                    </ListItem>
                    ))}
                 </List>
                </Grid>
                <Grid item xs={6}>
                    <List>
                        {items.slice(5, 9).map((foodItem: FoodItemType) => (
                        <ListItem key={foodItem.id}>
                            {/* @TODO add icon to item https://mui.com/joy-ui/react-list/#decorators add to database aswell */}
                            <Tooltip title={`Expiration date: ${formatRelative(new Date(foodItem.expirationDate), new Date())}`}>
                                <Typography variant='caption'>{foodItem.name}</Typography>
                            </Tooltip>
                        </ListItem>
                        )
                        )}
                         {items.length > 10 && (
                            <Tooltip title={restOfItems}>
                                <Typography variant='caption'>...</Typography>
                            </Tooltip>
                        )}
                        {items.length === 10 && (
                            <Tooltip title={`Expiration date: ${formatRelative(new Date(items[9].expirationDate), new Date())}`}>
                                <Typography variant='caption'>{items[9].name}</Typography>
                            </Tooltip>
                        )}
                     </List>
                </Grid>
              </Grid>
        )}
     </Paper>
     </>
    )
}

export default ItemsPostIt;