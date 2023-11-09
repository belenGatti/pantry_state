import { FoodItem, APIFoodItem, NewFoodItem } from "../FoodItems.types"

export const transformFromAPI = (APIFoodItem: APIFoodItem): FoodItem => {
    return {
        id: APIFoodItem.id,
        name: APIFoodItem.name,
        quantity: APIFoodItem.quantity,
        expirationDate: APIFoodItem.expiration_date,
        measurementUnit: APIFoodItem.measurement_unit,
        categoryId: APIFoodItem.category.id,
        pantryId: APIFoodItem.pantry_id,
        itemId: APIFoodItem.item_id,
    }
}

export const transformToAPI = (foodItem: FoodItem | NewFoodItem) => {
    if ('id' in foodItem) {
        return {
            name: foodItem.name,
            quantity: foodItem.quantity,
            expiration_date: foodItem.expirationDate,
            category_id: foodItem.categoryId,
        }
    } else {
        return {
            name: foodItem.name,
            quantity: foodItem.quantity,
            expiration_date: foodItem.expirationDate,
        }
    }
}