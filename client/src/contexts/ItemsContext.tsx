import { createContext } from "react";
import { APIItem } from "../FoodItems.types";

interface ItemsContext {
    items: APIItem[];
    setItems: (items: APIItem[]) => void;
}

export const ItemsContext = createContext<ItemsContext>({
    items: [],
    setItems: () => {}
});