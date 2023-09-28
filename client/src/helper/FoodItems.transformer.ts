import { FoodItem, APIFoodItem, NewFoodItem } from "../FoodItems.types"

export const transformFromAPI = (APIFoodItem: APIFoodItem): FoodItem => {
    return {
        id: APIFoodItem.id,
        name: APIFoodItem.name,
        quantity: APIFoodItem.quantity,
        expirationDate: APIFoodItem.expiration_date,
        createdAt: APIFoodItem.created_at,
        modifiedAt: APIFoodItem.modified_at,
    }
}

export const transformToAPI = (foodItem: FoodItem | NewFoodItem) => {
    if ('id' in foodItem && 'createdAt' in foodItem && 'modifiedAt' in foodItem) {
        return {
            name: foodItem.name,
            quantity: foodItem.quantity,
            expiration_date: foodItem.expirationDate,
            created_at: foodItem.createdAt,
            modified_at: foodItem.modifiedAt,
        }
    } else {
        return {
            name: foodItem.name,
            quantity: foodItem.quantity,
            expiration_date: foodItem.expirationDate,
        }
    }
}