// here is what it will be rendered as a list. first the name of the product like big and then smaller the quantity
// on click you can see a card where it will be more detailed and the expiration date on red
// accordion component
import React from 'react'
import {Card, Accordion} from '@mui/material'
import {FoodItem} from '../types'

function FoodItem(foodItem: FoodItem) {
    const {name, quantity, expiration_date} = foodItem
    return (
        <Accordion>
            {/* <Card>
                {name}
                Quantity: {quantity}
                Expiration date: {expiration_date.toDateString()}
            </Card> */}
        </Accordion>
    )
}

export default FoodItem;