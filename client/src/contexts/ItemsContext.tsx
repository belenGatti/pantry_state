import { createContext } from "react";
import { APIItem, FoodCategory } from "../FoodItems.types";

interface ItemsContext {
    items: APIItem[];
    foodCategories: FoodCategory[];
    setItems: (items: APIItem[]) => void;
    addItem: (label: string) => void;
}

export const ItemsContext = createContext<ItemsContext>({
    items: [],
    foodCategories: [],
    setItems: () => {},
    addItem: () => {}
});