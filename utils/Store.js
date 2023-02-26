import {
    DARK_MODE_ON,
    DARK_MODE_OFF,
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    USER_LOGIN,
    USER_LOGOUT,
    SAVE_SHIPPING_ADDRESS,
} from '@/constants/types';
import Cookies from 'js-cookie';
import { createContext, useReducer } from 'react';

export const Store = createContext();
const initialState = {
    darkMode: Cookies.get('darkMode') === 'ON' ? true : false,
    cart: {
        cartItems: Cookies.get('cartItems')
            ? JSON.parse(Cookies.get('cartItems'))
            : [],
        shippingAddress: Cookies.get('shippingAddress')
            ? JSON.parse(Cookies.get('shippingAddress'))
            : {},
    },
    userInfo: Cookies.get('userInfo')
        ? JSON.parse(Cookies.get('userInfo'))
        : null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case DARK_MODE_ON:
            return { ...state, darkMode: true };
        case DARK_MODE_OFF:
            return { ...state, darkMode: false };
        case CART_ADD_ITEM: {
            const newItem = action.payload;
            const existItem = state.cart.cartItems.find(
                (item) => item._id === newItem._id
            );
            const cartItems = existItem
                ? state.cart.cartItems.map((item) =>
                      item.name === existItem.name ? newItem : item
                  )
                : [...state.cart.cartItems, newItem];
            Cookies.set('cartItems', JSON.stringify(cartItems));
            return { ...state, cart: { ...state.cart, cartItems } };
        }
        case CART_REMOVE_ITEM: {
            const cartItems = state.cart.cartItems.filter(
                (item) => item._id !== action.payload._id
            );
            Cookies.set('cartItems', JSON.stringify(cartItems));
            return { ...state, cart: { ...state.cart, cartItems } };
        }
        case USER_LOGIN: {
            const user = action.payload;
            return { ...state, userInfo: user };
        }
        case USER_LOGOUT:
            return { ...state, userInfo: null, cart: { cartItems: [] } };
        case SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                cart: { ...state.cart, shippingAddress: action.payload },
            };
        default:
            return state;
    }
};

export const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };

    return <Store.Provider value={value}>{children}</Store.Provider>;
};
