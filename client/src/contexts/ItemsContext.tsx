import { createContext } from "react";
import { APIItem, FoodCategory, NewItem } from "../FoodItems.types";

interface ItemsContext {
    items: APIItem[];
    foodCategories: FoodCategory[];
    setItems: (items: APIItem[]) => void;
    addItem: (newItem: NewItem) => void;
}

export const ItemsContext = createContext<ItemsContext>({
    items: [],
    foodCategories: [],
    setItems: () => {},
    addItem: () => {}
});