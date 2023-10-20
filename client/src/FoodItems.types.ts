export interface FoodItem { // PantryItem
    id: number,
    name: string,
    quantity: number,
    expirationDate: string | Date,
    createdAt: Date,
    modifiedAt: Date,
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
}

export interface FoodItemRequest {
    name: string;
    quantity: number;
    expirationDate: string;
}