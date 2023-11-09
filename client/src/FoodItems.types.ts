export interface FoodItem { // PantryItem
    id: number,
    name: string,
    quantity: number,
    expirationDate: string | Date,
    categoryId: string,
    measurementUnit: string,
    pantryId: string,
    itemId: number,
}

export interface NewFoodItem {
    name: string,
    quantity: number,
    expirationDate: string | Date,
}

export interface APIFoodItem {
    id: number;
    item_id: number;
    name: string;
    pantry_id: string;
    quantity: number;
    expiration_date: string;
    category: {
        id: string;
        name: string;
    }
    measurement_unit: string;
}

export interface FoodItemRequest {
    name: string;
    quantity: number;
    expirationDate: string;
}

export interface APIItem {
    category: string;
    created_at: string;
    id: number;
    image: string;
    internal_id: string;
    label: string;
    measurement_unit: string;
    updated_at: string;
}

export interface FoodCategory {
    id: string;
    name: string;
}
