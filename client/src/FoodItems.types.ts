export interface FoodItem { // PantryItem
    id: number,
    name: string,
    quantity: number,
    expirationDate: string | Date,
    createdAt: Date,
    modifiedAt: Date,
    category: string,
    measurementUnit: string,
}

export interface NewFoodItem {
    name: string,
    quantity: number,
    expirationDate: string | Date,
}

export interface APIFoodItem {
    id: number;
    name: string;
    quantity: number;
    expiration_date: string;
    created_at: Date;
    modified_at: Date;
    category: string;
    measurement_unit: string;
}

export interface FoodItemRequest {
    name: string;
    quantity: number;
    expirationDate: string;
}