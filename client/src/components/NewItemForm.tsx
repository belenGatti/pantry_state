import React, { useEffect, useState, useRef, useContext } from 'react'
import { ErrorMessage, useFormik, FormikProvider } from 'formik';
import {object, string, number, date} from 'yup';
import { Button, TextField, InputAdornment, Dialog, DialogActions, DialogContent } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { createFoodItem, updateFoodItem } from '../services/FoodItems.service';
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from '../contexts/UserContext';
import { ItemsContext } from '../contexts/ItemsContext';
import Creatable from 'react-select/creatable';


const newPantryItemValidationSchema = object({
    name: string().required('Name is required'),
    quantity: number().min(0).required('Quantity is required'),
    expirationDate: date().required('Expiration date is required').nullable()
})

const newItemValidationSchema = object({
    category: string(),
    measurementUnit: string()
})

interface Option {
    readonly label: string,
    readonly value: string
}

function NewItemForm() {
    const {items, addItem} = useContext(ItemsContext);
    const indexRef = useRef<number>();
    const [isLoading, setIsLoading] = useState(true);
    const [isEditMode, setIsEditMode] = useState(false);
    const [newItemModalOpen, setNewItemModalOpen] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [foodItemOptions, setFoodItemOptions] = useState<any>([]);
    const [measurementUnit, setMeasurementUnit] = useState<string>('');
    const {user} = useContext(UserContext);
    const location = useLocation();
    const navigate = useNavigate();
    
    /** Fetches available items from the BE, transforms them to use in the autocomplete and sets them in the state*/
    const getFoodItemsOptions = async (): Promise<void> => {
        try {
            // this happens because it takes items.. there is a re render and the items are taken from items so i do need to create it from the backend first
            const itemsAsOptions = items.map(item => {
                return {label: item.label, value: item.internal_id}
            })
            setFoodItemOptions(itemsAsOptions)
        } catch (error) {
            console.error('Error getting items list', error)
        }
    };

     /** To retrieve information sent by route params */
    const formik = useFormik({
         enableReinitialize: true,
         initialValues: {
             name: '',
             quantity: 0,
             expirationDate: new Date().toDateString(),
             modifiedAt: null,
             createdAt: null,
             id: null
         },
         validationSchema: newPantryItemValidationSchema,
         onSubmit: async (values) => {
             const expirationDate = new Date(values.expirationDate).toISOString()
             if (isEditMode) {
                if (values.id !== null) {
                try {
                    await updateFoodItem({...values, expirationDate}, user.accessToken, user.pantryId.toString())
                    return navigate('/food-items-list')
                } catch (error) {
                    console.error("Error updating food item:", error);
                }
             }
             } else if (!isEditMode && user.isAuthenticated) {
                 try {
                     await createFoodItem({...values, expirationDate}, user.accessToken, user.pantryId.toString())
                     return navigate('/food-items-list')
                 } catch (error) {
                     console.error("Error creating NEW food item:", error);
                 }
             }
         }
     })

     const newItem = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: '',
            category: '',
            measurementUnit: '',
        },
        validationSchema: newItemValidationSchema,
        onSubmit: async (values) => {
            // @TODO adjust addItem service and BE to accept this new parameters if applicable
            console.log('values', values)
        }
    })

     const getOptionsAndSetValues = async () => {
       if (location.state?.foodItem) {
         setIsEditMode(true);
         formik.setValues({
           id: location.state.foodItem.id,
           name: location.state.foodItem.name,
           quantity: location.state.foodItem.quantity,
           expirationDate: location.state.foodItem.expirationDate,
           modifiedAt: location.state.foodItem.modifiedAt,
           createdAt: location.state.foodItem.createdAt,
         });
       } else {
         setIsLoading(false);
       }
     };

    useEffect(() => {
        getFoodItemsOptions();
        getOptionsAndSetValues();
        if (foodItemOptions.length) {
            indexRef.current = foodItemOptions.findIndex(
              (option: Option) => option.label == formik.values.name
            );
            setIsLoading(false);
        }
      }, [foodItemOptions.length]);
    

    useEffect(() => {
        const getMeasurementUnit = (name: string) => {
            const item = items.find(item => item.label === name)
            if (!item) return null;
            return item.measurement_unit
        } 
        const measurementUnit = getMeasurementUnit(formik.values.name)
        setMeasurementUnit(measurementUnit || '')
    }, [formik.values.name, items])

    if (isLoading) {
        return <div>Loading...</div>
    }

    const handleCancel = () => {
        return navigate('/food-items-list')
    }

    const handleChange = (newValue: string | null): void => {
        formik.setFieldValue('name', newValue)
    } 

    const handleClose = () => {
        setNewItemModalOpen(false);
    }

    const handleModalOpen = (inputValue: string) => {
        setNewItemModalOpen(true);
        newItem.setFieldValue('name', inputValue)
    }

    return (
    <div style={{width: '300px'}}>
        <Dialog open={newItemModalOpen} onClose={handleClose}>
            <FormikProvider value={newItem}>
                <form onSubmit={newItem.handleSubmit}>
                    <DialogContent>
                            {newItem.values.name} <br/>
                            Category:
                            {/* @TODO add select for existing categories */}
                            <TextField name="category" value={newItem.values.category} onChange={newItem.handleChange}/> <br/>
                            Measurement unit: 
                            {/* @TODO add select for existing measurement units */}
                            {/* @TODO fix this measurement_unit and measurementUnit thing */}
                            <TextField name="measurementUnit" value={newItem.values.measurementUnit} onChange={newItem.handleChange}/>
                    </DialogContent>
                        <DialogActions>
                            <Button type="submit">Create new item</Button>
                            <Button onClick={handleClose}>Cancel</Button>
                        </DialogActions>
                </form>
            </FormikProvider>
        </Dialog>
        <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
                <Creatable id="name" options={foodItemOptions} value={name} onCreateOption={handleModalOpen} onChange={(newValue) => handleChange(newValue)} />
                <ErrorMessage name='name' />
                <TextField name='quantity' type='number'
                InputProps={{
                    endAdornment: <InputAdornment position="end">{measurementUnit}</InputAdornment>,
                    inputProps: { 
                        max: 100, min: 0 
                    }
                }}
                value={formik.values.quantity}
                onChange={formik.handleChange} />
                <ErrorMessage name='quantity' />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker value={new Date(formik.values.expirationDate)} onChange={(value)=> formik.setFieldValue('expirationDate', value)} />
                    <ErrorMessage name='expiration_date' />
                </LocalizationProvider>
                {/* @TODO add check if item exists already and if so update the quantity */}
                <Button type='submit'>Submit</Button>
                <Button onClick={handleCancel}>Cancel</Button>
            </form>
        </FormikProvider>
        </div>
    )
  }

export default NewItemForm
