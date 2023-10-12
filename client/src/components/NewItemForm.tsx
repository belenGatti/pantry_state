import React, { useEffect, useState, useRef } from 'react'
import { ErrorMessage, useFormik, FormikProvider } from 'formik';
import {object, string, number, date} from 'yup';
import { Autocomplete, Button, TextField, } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { createFoodItem, updateFoodItem } from '../services/FoodItems.service';
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {getItemsList} from '../services/ItemsList.service';

const newItemValidationSchema = object({
    name: string().required('Name is required'),
    quantity: number().min(0).required('Quantity is required'),
    expirationDate: date().required('Expiration date is required').nullable()
})

interface Option {
    label: string,
    id?: string
}

function NewItemForm() {
    const indexRef = useRef<number>();
    const [isLoading, setIsLoading] = useState(true);
    const [isEditMode, setIsEditMode] = useState(false);
    const [foodItemOptions, setFoodItemOptions] = useState<Option[]>([]);
    const {isAuthenticated, getAccessTokenSilently, user} = useAuth0();
    const location = useLocation();
    const navigate = useNavigate();
    /** Fetches available items from the BE, transforms them to use in the autocomplete and sets them in the state*/
    const getFoodItemsOptions = async (): Promise<void> => {
        try {
            const items = await getItemsList();
            const itemsAsOptions = items.map(item => {
                return {label: item.label, id: item.intern_id}
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
         validationSchema: newItemValidationSchema,
         onSubmit: async (values) => {
            console.log(isEditMode, isAuthenticated, user)
             const expirationDate = new Date(values.expirationDate).toISOString()
             if (isEditMode) {
                if (values.id !== null) {
                try {
                    const accessToken = await getAccessTokenSilently();
                    await updateFoodItem({...values, expirationDate}, accessToken)
                    return navigate('/food-items-list')
                } catch (error) {
                    console.error("Error updating food item:", error);
                }
             }
             } else if (!isEditMode && isAuthenticated) {
                 try {
                     const accessToken = await getAccessTokenSilently();
                     await createFoodItem({...values, expirationDate}, accessToken)
                     return navigate('/food-items-list')
                 } catch (error) {
                     console.error("Error creating NEW food item:", error);
                 }
             }
         }
     })
    
     const getOptionsAndSetValues = async () => {
       await getFoodItemsOptions();
       if (location.state?.foodItem) {
         setIsEditMode(true);
         console.log(location.state.foodItem);
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
        getOptionsAndSetValues();
        if (foodItemOptions.length) {
            indexRef.current = foodItemOptions.findIndex(
              (option: Option) => option.label == formik.values.name
            );
            setIsLoading(false);
        }
      }, [foodItemOptions.length]);
      

    if (isLoading) {
        return <div>Loading...</div>
    }

    const handleCancel = () => {
        return navigate('/food-items-list')
    }

    return (
    <div style={{width: '300px'}}>
        <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
                {/* @TODO add option to type new item and add to existing list (and backend) */}
                <Autocomplete id='name'
                    options={foodItemOptions} 
                    onChange={(e, value) => formik.setFieldValue('name', value?.label)} 
                    renderInput={(params) => <TextField {...params} label='FoodItem' name="name"/>}
                    defaultValue={isEditMode ? foodItemOptions[indexRef.current!] : null}
                    /** Key used to re-render */
                    key={isEditMode ? foodItemOptions[indexRef.current!].id : 'new'}
                    isOptionEqualToValue={(option, value) => {
                        return option.label === value.label;}
                    }
                    />
                <ErrorMessage name='name' />
                <TextField name='quantity' type='number' 
                InputProps={{
                    inputProps: { 
                        max: 100, min: 0 
                    }
                }}
                value={formik.values.quantity} onChange={formik.handleChange} />
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
