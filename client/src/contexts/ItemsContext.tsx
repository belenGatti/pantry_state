import { createContext } from "react";
import { APIItem, FoodCategory } from "../FoodItems.types";

export interface NewItem {
    label: string;
    value: string; // internal_id
}

interface ItemsContext {
    items: APIItem[];
    foodCategories: FoodCategory[];
    setItems: (items: APIItem[]) => void;
    addItem: (item: NewItem) => void;
}

export const ItemsContext = createContext<ItemsContext>({
    items: [],
    foodCategories: [],
    setItems: () => {},
    addItem: () => {}
});