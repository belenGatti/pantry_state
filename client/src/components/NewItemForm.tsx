import React, { useEffect, useState } from 'react'
import { ErrorMessage, useFormik, FormikProvider } from 'formik';
import {object, string, number, date} from 'yup';
import { Autocomplete, Button, TextField, } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { createFoodItem, updateFoodItem } from '../services/FoodItems.service';
import { useNavigate, useLocation } from "react-router-dom";

const newItemValidationSchema = object({
    name: string().required('Name is required'),
    quantity: number().min(0).required('Quantity is required'),
    expirationDate: date().required('Expiration date is required').nullable()
})

interface Option {
    label: string,
    id?: string
}

// const FoodItemsOptions = [
//     {
//         id: 1,
//         name: "Fruits",
//         children: [
//         {label: 'Apple', value: '100'},
//         {label: 'Banana', value: '101'},
//         {label: 'Orange', value: '102'},
//         {label: 'Pear', value: '103'},
//         {label: 'Peach', value: '104'},
//         {label: 'Strawberry', value: '105'},
//         {label: 'Blueberry', value: '106'},
//         {label: 'Raspberry', value: '107'},
//         {label: 'Blackberry', value: '108'},
//         {label: 'Mandarine', value: '109'},
//         {label: 'Grape', value: '110'},
//         {label: 'Kiwi', value: '111'},
//         {label: 'Mango', value: '112'},
//         {label: 'Pineapple', value: '113'},
//         {label: 'Watermelon', value: '114'},
//     ]},
//     {
//         id: 2, 
//         name: "Vegetables",
//         children: [
//         {label: 'Broccoli', value: '201'},
//         {label: 'Cabbage', value: '202'},
//         {label: 'Carrot', value: '203'},
//         {label: 'Cauliflower', value: '204'},
//         {label: 'Celery', value: '205'},
//         {label: 'Cucumber', value: '206'},
//         {label: 'Eggplant', value: '207'},
//         {label: 'Leek', value: '208'},
//         {label: 'Lettuce', value: '209'},
//         {label: 'Mushroom', value: '210'},
//         {label: 'Onion', value: '211'},
//         {label: 'Red Onion', value: '212'},
//         {label: 'Red Pepper', value: '213'},
//         {label: 'Green Pepper', value: '214'},
//         {label: 'Yellow Pepper', value: '215'},
//         {label: 'Potato', value: '216'},
//         {label: 'Pumpkin', value: '217'},
//         {label: 'Spinach', value: '218'},
//         {label: 'Tomato', value: '219'},
//         {label: 'Zucchini', value: '220'},
//     ]},
//         {
//         id: 3,
//         name: 'Dairy',
//         children: [
//         {label: 'Milk', value: '301'},
//         {label: 'Butter', value: '302'},
//         {label: 'Cheese', value: '303'},
//         {label: 'Parmiggiano', value: '304'},
//         {label: 'Cream', value: '305'},
//         {label: 'Cream Cheese', value: '306'},
//         {label: 'Sour Cream', value: '307'},
//         {label: 'Yogurt', value: '308'},

//     ]},
//     {
//         id: 4,
//         name: 'Cans',
//         children: [
//         {label: 'Black Beans', value: '401'},
//         {label: 'Chickpeas', value: '402'},
//         {label: 'Kidney Beans', value: '403'},
//         {label: 'Red Lentils', value: '404'},
//         {label: 'Green Lentils', value: '405'},
//         {label: 'Beluga Lentils', value: '406'},
//         {label: 'Coconut Milk', value: '407'},
//         {label: 'Passata', value: '408'},
//         {label: 'Tomato Paste', value: '409'},
//         {label: 'Cherry Tomatoes', value: '410'},
//         {label: 'Peeled Tomatoes', value: '411'},
//     ]},
// ]
const FoodItemsOptions: Option[] = [
    {label: 'Apple', id: '100'},
    {label: 'Banana', id: '101'},
    {label: 'Orange', id: '102'},
    {label: 'Pear', id: '103'},
    {label: 'Peach', id: '104'},
]

function NewItemForm() {
    const [isLoading, setIsLoading] = useState(true);
    const [isEditMode, setIsEditMode] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

     /** To retrieve information sent by route params */
    useEffect(() => {
        if (location.state?.foodItem) {
            setIsEditMode(true)
            formik.setValues({
                id: location.state.foodItem.id,
                name: location.state.foodItem.name,
                quantity: location.state.foodItem.quantity,
                expirationDate: location.state.foodItem.expirationDate,
                modifiedAt: location.state.foodItem.modifiedAt,
                createdAt: location.state.foodItem.createdAt,
            })
            setIsLoading(false)
        } else {
            setIsLoading(false)
        }
    }, [location.state?.foodItem])

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
                    await updateFoodItem({...values, expirationDate})
                    return navigate('/')
                } else {
                    console.log('Error: id, modifiedAt and createdAt should be null')
                }
            }
            await createFoodItem({...values, expirationDate})
            return navigate('/')
        }
    })

    const index = FoodItemsOptions.findIndex((option) => option.label === formik.values.name)

    if (isLoading) {
        return <div>Loading...</div>
    }

    const handleCancel = () => {
        return navigate('/')
    }

    return (
    <div style={{width: '300px'}}>
        <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
                {/* @TODO add option to type new item and add to existing list (and backend) */}
                <Autocomplete id='name'
                    options={FoodItemsOptions} 
                    onChange={(e, value) => formik.setFieldValue('name', value?.label)} 
                    renderInput={(params) => <TextField {...params} label='FoodItem' name="name"/>}
                    defaultValue={isEditMode ? FoodItemsOptions[index] : null}
                    /** Key used to re-render */
                    key={isEditMode ? FoodItemsOptions[index].id : 'new'}
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
