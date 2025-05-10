import React, { createContext, useContext, useReducer, ReactNode, useEffect, useState } from 'react';
import { User, Cart, Product } from '../types';
import { products, users } from '../data/mockData';

const emptyCart: Cart = {
  items: [],
  subtotal: 0,
  tax: 0,
  shipping: 0,
  total: 0,
  updatedAt: new Date().toISOString()
};
import { CartTimeoutModal } from '../components/CartTimeoutModal';

type AppState = {
  user: User | null;
  cart: Cart;
  isAuthModalOpen: boolean;
  isCartDrawerOpen: boolean;
  searchQuery: string;
  searchResults: Product[];
  products: Product[];
  users: User[];
  cartLastUpdated: number;
};

type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'ADD_TO_CART'; payload: { productId: string; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_ITEM_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_AUTH_MODAL'; payload?: boolean }
  | { type: 'TOGGLE_CART_DRAWER'; payload?: boolean }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_SEARCH_RESULTS'; payload: Product[] }
  | { type: 'EXTEND_CART_TIME' };

const CART_TIMEOUT = 15 * 60 * 1000; // 15 minutes
const CART_WARNING_TIME = 60 * 1000; // 1 minute before expiry

const loadCartFromStorage = (): Cart => {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    const { cart, timestamp } = JSON.parse(savedCart);
    const timeElapsed = Date.now() - timestamp;
    if (timeElapsed < CART_TIMEOUT) {
      return cart;
    }
  }
  return emptyCart;
};

const initialState: AppState = {
  user: null,
  cart: loadCartFromStorage(),
  isAuthModalOpen: false,
  isCartDrawerOpen: false,
  searchQuery: '',
  searchResults: [],
  products: products,
  users: users,
  cartLastUpdated: Date.now(),
};

const calculateCartTotals = (items: Cart['items']): Pick<Cart, 'subtotal' | 'tax' | 'shipping' | 'total'> => {
  const subtotal = items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const tax = subtotal * 0.08; // 8% tax rate
  const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
  const total = subtotal + tax + shipping;

  return { subtotal, tax, shipping, total };
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  let updatedState = { ...state };
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };

    case 'EXTEND_CART_TIME':
      return {
        ...state,
        cartLastUpdated: Date.now(),
      };

    case 'ADD_TO_CART': {
      const { productId, quantity } = action.payload;
      const product = products.find((p) => p.id === productId);
      
      if (!product) return state;

      const existingItemIndex = state.cart.items.findIndex((item) => item.productId === productId);
      let updatedItems;

      if (existingItemIndex >= 0) {
        // Update existing item quantity
        updatedItems = [...state.cart.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        };
      } else {
        // Add new item
        const newItem = {
          id: Date.now().toString(),
          productId,
          product,
          quantity,
        };
        updatedItems = [...state.cart.items, newItem];
      }

      const cartTotals = calculateCartTotals(updatedItems);

      return {
        ...state,
        cart: {
          ...state.cart,
          items: updatedItems,
          ...cartTotals,
          updatedAt: new Date().toISOString(),
        },
        isCartDrawerOpen: true,
        cartLastUpdated: Date.now(),
      };
    }

    case 'REMOVE_FROM_CART': {
      const updatedItems = state.cart.items.filter((item) => item.id !== action.payload);
      const cartTotals = calculateCartTotals(updatedItems);

      return {
        ...state,
        cart: {
          ...state.cart,
          items: updatedItems,
          ...cartTotals,
          updatedAt: new Date().toISOString(),
        },
      };
    }

    case 'UPDATE_CART_ITEM_QUANTITY': {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        return appReducer(state, { type: 'REMOVE_FROM_CART', payload: id });
      }

      const updatedItems = state.cart.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
      const cartTotals = calculateCartTotals(updatedItems);

      return {
        ...state,
        cart: {
          ...state.cart,
          items: updatedItems,
          ...cartTotals,
          updatedAt: new Date().toISOString(),
        },
      };
    }

    case 'CLEAR_CART':
      return {
        ...state,
        cart: {
          ...state.cart,
          items: [],
          subtotal: 0,
          tax: 0,
          shipping: 0,
          total: 0,
          updatedAt: new Date().toISOString(),
        },
      };

    case 'TOGGLE_AUTH_MODAL':
      return {
        ...state,
        isAuthModalOpen: action.payload !== undefined ? action.payload : !state.isAuthModalOpen,
      };

    case 'TOGGLE_CART_DRAWER':
      return {
        ...state,
        isCartDrawerOpen: action.payload !== undefined ? action.payload : !state.isCartDrawerOpen,
      };

    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };

    case 'SET_SEARCH_RESULTS':
      return { ...state, searchResults: action.payload };

    default:
      return state;
  }
};

type AppContextType = {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [showTimeoutModal, setShowTimeoutModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState(CART_TIMEOUT);

  useEffect(() => {
    if (state.cart.items.length > 0) {
      localStorage.setItem('cart', JSON.stringify({
        cart: state.cart,
        timestamp: state.cartLastUpdated
      }));

      const timeoutId = setTimeout(() => {
        dispatch({ type: 'CLEAR_CART' });
        localStorage.removeItem('cart');
      }, CART_TIMEOUT);

      const warningId = setTimeout(() => {
        if (state.cart.items.length > 0) {
          setShowTimeoutModal(true);
          setTimeLeft(CART_TIMEOUT - (Date.now() - state.cartLastUpdated));
        }
      }, CART_TIMEOUT - CART_WARNING_TIME);

      return () => {
        clearTimeout(timeoutId);
        clearTimeout(warningId);
      };
    }
  }, [state.cart.items, state.cartLastUpdated]);

  const handleExtendTime = () => {
    dispatch({ type: 'EXTEND_CART_TIME' });
    setShowTimeoutModal(false);
  };

  const handleCloseModal = () => {
    setShowTimeoutModal(false);
  };

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
      <CartTimeoutModal
        isOpen={showTimeoutModal}
        onClose={handleCloseModal}
        onExtendTime={handleExtendTime}
        timeLeft={timeLeft}
      />
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};