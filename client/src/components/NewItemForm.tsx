import React, { useEffect, useState, useRef, useContext } from 'react'
import { ErrorMessage, useFormik, FormikProvider } from 'formik';
import {object, string, number, date} from 'yup';
import { Button, TextField, InputAdornment } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { createFoodItem, updateFoodItem } from '../services/FoodItems.service';
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from '../contexts/UserContext';
import { ItemsContext } from '../contexts/ItemsContext';
import Creatable from 'react-select/creatable';


const newItemValidationSchema = object({
    name: string().required('Name is required'),
    quantity: number().min(0).required('Quantity is required'),
    expirationDate: date().required('Expiration date is required').nullable()
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
         validationSchema: newItemValidationSchema,
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
     // CAN I DELETE THIS?
    const [name, setName] = useState<string>(formik.values.name);
    
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

    const handleCreate = (inputValue: string) => {
        console.log(inputValue)
        if (!foodItemOptions.some((option: Option) => option.label === inputValue)) {
            const newOption = {
                label: inputValue,
                // @TODO i shouldnt send the value in the future since the flow will be
                // user creates new item
                // isloading state until process is finished is set
                // request to openai to determine category
                // be creates new item
                // items context refetches items
                // new item appears here and isloading is false
                // value: 'XXX'
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const newFoodItemOptions: any[] = foodItemOptions.push(newOption)
            addItem(newOption);
            setFoodItemOptions(newFoodItemOptions)
            formik.setFieldValue('name', newOption.label)
        }
        // maybe i can connect it to chat gpt api to give me back the measurement unit, the category and other stuff, that'd be cool
        // add to the options array
        // make a call at the same time to the items controller and create a new one
        // in the controller i need to add the other attributes, with chat gtp api maybe?

    }

    const handleChange = (newValue: string | null): void => {
        formik.setFieldValue('name', newValue)
    } 

    return (
    <div style={{width: '300px'}}>
        <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
                {/* @TODO add option to type new item and add to existing list (and backend) */}
                {/* <Autocomplete id='name'
                    options={foodItemOptions} 
                    onChange={(_e, value) => formik.setFieldValue('name', value?.label)} 
                    renderInput={(params) => <TextField {...params} label='FoodItem' name="name"/>}
                    defaultValue={isEditMode ? foodItemOptions[indexRef.current!] : null}
                    key={isEditMode ? foodItemOptions[indexRef.current!].id : 'new'}
                    isOptionEqualToValue={(option, value) => {
                        return option.label === value.label;}
                    }
                /> */}
                <Creatable id="name" options={foodItemOptions} value={name} onCreateOption={handleCreate} onChange={(newValue) => handleChange(newValue)} />
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
