import React , { useContext, useState} from 'react'
import {Accordion, AccordionSummary, AccordionDetails, Button, Typography, IconButton, Grid, Dialog, DialogActions, DialogContentText, DialogContent} from '@mui/material'
import {FoodItem as FoodItemType} from '../FoodItems.types'
import { formatRelative } from 'date-fns'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ItemsContext } from '../contexts/ItemsContext';

interface FoodItemProps {
    foodItem: FoodItemType
    handleDelete: (id: number) => void
    handleEdit: (foodItem: FoodItemType) => void
}

function FoodItem(props: FoodItemProps) {
    const {items} = useContext(ItemsContext);
    const {handleDelete, handleEdit, foodItem} = props; 
    const {name, quantity, expirationDate} = foodItem;
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const handleModalOpen = () => {
        setDeleteModalOpen(true);
    }

    const handleClose = () => {
        setDeleteModalOpen(false);
    }

    const handleDeleteAndCloseModal = (id: number) => {
        setDeleteModalOpen(false);
        handleDelete(id);
    }

    const getStyles = (item: FoodItemType) => {
        const today = new Date()
        const nextWeek = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 7);
        if (new Date(item.expirationDate) <= today) {
            return {color: '#ED474A'}
        } else if (new Date(item.expirationDate) <= nextWeek) {
            return {color: '#DD6031'}
        } else {
            return {color: 'green'}
        }
    }

    const getMeasurementUnit = (name: string): string => {
        const item = items.find(item => item.label === name);
        if (item) {
            return item.measurement_unit;
        } else {
            return '';
        }
    }

    return (
        <>
        <Dialog open={deleteModalOpen} onClose={handleClose}>
            <DialogContent>
                <DialogContentText>Are you sure?</DialogContentText>
            </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleDeleteAndCloseModal(foodItem.id)}>Yes</Button>
                    <Button onClick={handleClose}>No</Button>
                </DialogActions>
        </Dialog>
        <Accordion style={{width: '150px', margin: '5px', padding: '5px'}} TransitionProps={{ unmountOnExit: true }}>
            {/* @TODO style icons better */}
            <Grid container>
                <Grid item xs={9} style={{padding: '2px'}}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon style={{padding: 0}} />}>
                        <Typography variant="subtitle1" style={getStyles(foodItem)}>{name}</Typography>
                    </AccordionSummary>
                </Grid>
                <Grid item xs={3}>
                    <IconButton onClick={() => handleEdit(foodItem)} size="small">
                      <EditIcon fontSize="inherit"/>
                    </IconButton>
                    <IconButton onClick={() => handleModalOpen()} size="small">
                      <DeleteIcon fontSize="inherit"/>
                    </IconButton>
                </Grid>
            </Grid>
            <AccordionDetails>
                <Typography variant='body2'>
                    Quantity: {quantity} {getMeasurementUnit(name)}
                    <br/>
                    Expiration date: {formatRelative(new Date(expirationDate), new Date())}
                </Typography>
            </AccordionDetails>
        </Accordion>
        </>
    )
}

export default FoodItem;