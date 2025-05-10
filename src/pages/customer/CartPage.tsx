import React from "react";
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus } from "lucide-react";
import { useApp } from "../../contexts/AppContext";

export const CartPage: React.FC = () => {
  const { state, dispatch } = useApp();

  const handleQuantityChange = (id: string, quantity: number) => {
    dispatch({
      type: 'UPDATE_CART_ITEM_QUANTITY',
      payload: { id, quantity }
    });
  };

  const handleRemoveItem = (id: string) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: id
    });
  };

  const handleCheckout = () => {
    window.history.pushState({}, '', '/checkout');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      {state.cart.items.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <ShoppingBag className="h-12 w-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-medium mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
          <button 
            onClick={() => {
              window.history.pushState({}, '', '/products');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
            className="bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition-colors"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="divide-y divide-gray-200">
                {state.cart.items.map((item) => (
                    <div key={item.id} className="p-6 flex flex-col sm:flex-row">
                      <div className="flex-shrink-0 w-full sm:w-24 h-24 mb-4 sm:mb-0">
                        <img 
                          src={item.product.images[0]} 
                          alt={item.product.name} 
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-1 sm:ml-6">
                        <div className="flex justify-between">
                          <h3 className="text-lg font-medium">{item.product.name}</h3>
                          <p className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{item.product.category}</p>
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center border rounded-md">
                            <button 
                              className="px-3 py-1 border-r"
                              onClick={() => handleQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-4 py-1">{item.quantity}</span>
                            <button 
                              className="px-3 py-1 border-l"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <button 
                            className="text-gray-500 hover:text-error-600 transition-colors"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium mb-6">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${state.cart.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>{state.cart.shipping === 0 ? 'Free' : `$${state.cart.shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>${state.cart.tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${state.cart.total.toFixed(2)}</span>
                  </div>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full mt-6 bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition-colors flex items-center justify-center"
                >
                  Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};