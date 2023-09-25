import React from 'react'
import { ErrorMessage, Field, useFormik, FormikProvider } from 'formik';
import {object, string, number, date} from 'yup';
import { Autocomplete, Button, TextField, } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { createFoodItem } from '../services/FoodItems.service';

const newItemValidationSchema = object({
    name: string().required('Name is required'),
    quantity: number().required('Quantity is required'),
    expiration_date: date().required('Expiration date is required').nullable()
})

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
const FoodItemsOptions = [
    {label: 'Apple', id: '100'},
    {label: 'Banana', id: '101'},
    {label: 'Orange', id: '102'},
    {label: 'Pear', id: '103'},
    {label: 'Peach', id: '104'},
]

function NewItemForm() {
    const formik = useFormik({
        initialValues: {
            name: '',
            quantity: 0,
            expiration_date: new Date()
        },
        validationSchema: newItemValidationSchema,
        onSubmit: async (values) => {
            console.log(values)
            await createFoodItem(values)
        }
    })
    return (
        <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
                <Autocomplete id='name' options={FoodItemsOptions} onChange={(e, value) => formik.setFieldValue('name', value?.label)} renderInput={(params) => <TextField {...params} label='FoodItem' name="name"/>}/>
                <ErrorMessage name='name' />
                <Field name='quantity' type='number' value={formik.values.quantity} onChange={formik.handleChange} />
                <ErrorMessage name='quantity' />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker value={formik.values.expiration_date} onChange={(value)=> formik.setFieldValue('expiration_date', value)} />
                    <ErrorMessage name='expiration_date' />
                </LocalizationProvider>
                <Button type='submit'>Submit</Button>
            </form>
        </FormikProvider>
    )
  }

export default NewItemForm
