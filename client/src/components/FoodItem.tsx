import React from 'react'
import {Accordion, AccordionSummary, AccordionDetails, Typography, IconButton, Box} from '@mui/material'
import {FoodItem as FoodItemType} from '../FoodItems.types'
import { formatRelative } from 'date-fns'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface FoodItemProps {
    foodItem: FoodItemType
    handleDelete: (id: number) => void
    handleEdit: (foodItem: FoodItemType) => void
}

function FoodItem(props: FoodItemProps) {
    const {handleDelete, handleEdit, foodItem} = props; 
    const {name, quantity, expirationDate} = foodItem;

    return (
        <Accordion style={{width: '300px'}}>
            {/* @TODO style icons better */}
            <Box sx={{ display: "flex", justifyContent: 'space-between' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h5">{name}</Typography>
            </AccordionSummary>
            <Box>
            <IconButton onClick={() => handleEdit(foodItem)}>
              <EditIcon />
            </IconButton>

            <IconButton onClick={() => handleDelete(foodItem.id)}>
              <DeleteIcon />
            </IconButton>
            </Box>
            </Box>
            <AccordionDetails>
                Quantity: {quantity} 
                <br/>
                Expiration date: {formatRelative(new Date(expirationDate), new Date())}
            </AccordionDetails>
        </Accordion>
    )
}

export default FoodItem;