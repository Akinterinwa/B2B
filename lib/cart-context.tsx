'use client';

import type React from 'react';
import { createContext, useContext, useReducer, useState, type ReactNode, useEffect } from 'react';

export interface CartItem {
    id: number;
    name: string;
    price: number;
    bulkPrice: number;
    image: string;
    quantity: number;
    supplier: string;
}

interface CartState {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
}

type CartAction =
    | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> & { quantity?: number } }
    | { type: 'TOGGLE_ITEM'; payload: Omit<CartItem, 'quantity'> & { quantity?: number } }
    | { type: 'REMOVE_ITEM'; payload: number }
    | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
    | { type: 'CLEAR_CART' }
    | { type: 'SET_STATE'; payload: CartState }
    | { type: 'UPSERT_ITEM'; payload: Omit<CartItem, 'quantity'> & { quantity?: number } };

const CartContext = createContext<{
    state: CartState;
    dispatch: React.Dispatch<CartAction>;
} | null>(null);

function cartReducer(state: CartState, action: CartAction): CartState {
    let updatedItems: CartItem[] = [...state.items];

    switch (action.type) {
        case 'SET_STATE':
            return action.payload;

        case 'TOGGLE_ITEM': {
            const existingItem = updatedItems.find((item) => item.id === action.payload.id);
            if (existingItem) {
                updatedItems = updatedItems.filter((item) => item.id !== action.payload.id);
            } else {
                updatedItems.push({ ...action.payload, quantity: action.payload.quantity || 1 });
            }
            break;
        }

        case 'ADD_ITEM': {
            const existingItem = updatedItems.find((item) => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += action.payload.quantity || 1;
            } else {
                updatedItems.push({ ...action.payload, quantity: action.payload.quantity || 1 });
            }
            break;
        }

        case 'UPSERT_ITEM': {
            const existingItemIndex = updatedItems.findIndex((item) => item.id === action.payload.id);
            const newQuantity = Math.max(1, action.payload.quantity || 1); // Ensure minimum quantity of 1

            if (existingItemIndex > -1) {
                // Update existing item with new quantity and other properties
                updatedItems[existingItemIndex] = {
                    ...action.payload,
                    quantity: newQuantity,
                };
            } else {
                // Add new item to cart
                updatedItems.push({ ...action.payload, quantity: newQuantity });
            }
            break;
        }

        case 'REMOVE_ITEM': {
            updatedItems = updatedItems.filter((item) => item.id !== action.payload);
            break;
        }

        case 'UPDATE_QUANTITY': {
            const existingItem = updatedItems.find((item) => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity = Math.max(0, action.payload.quantity);
                if (existingItem.quantity === 0) {
                    updatedItems = updatedItems.filter((item) => item.id !== action.payload.id);
                }
            }
            break;
        }

        case 'CLEAR_CART':
            updatedItems = [];
            break;

        default:
            return state;
    }

    const totalPrice = updatedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    // totalItems now represents the count of unique products, not total quantity
    const totalItems = updatedItems.length;

    return {
        ...state,
        items: updatedItems,
        totalItems,
        totalPrice,
    };
}

const initialState: CartState = {
    items: [],
    totalItems: 0,
    totalPrice: 0,
};

export function CartProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(cartReducer, initialState);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load cart from localStorage on mount
    useEffect(() => {
        const storedCart = localStorage.getItem('cart');

        if (storedCart) {
            try {
                const parsedCart = JSON.parse(storedCart);

                // Validate the stored cart structure
                if (parsedCart && typeof parsedCart === 'object' && Array.isArray(parsedCart.items)) {
                    dispatch({ type: 'SET_STATE', payload: parsedCart });
                } else {
                    localStorage.removeItem('cart');
                }
            } catch (e) {
                console.error('Could not parse cart from local storage', e);
                // Clear invalid data
                localStorage.removeItem('cart');
            }
        }
        setIsLoaded(true);
    }, []);

    // Save cart to localStorage whenever state changes (but only after initial load)
    useEffect(() => {
        if (isLoaded) {
            try {
                localStorage.setItem('cart', JSON.stringify(state));

                // Also save to cookie as backup
                document.cookie = `cart=${encodeURIComponent(
                    JSON.stringify(state)
                )}; path=/; max-age=2592000; samesite=lax`; // 30 days
            } catch (e) {
                console.error('Could not save cart to localStorage', e);
            }
        }
    }, [state, isLoaded]);

    return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}


