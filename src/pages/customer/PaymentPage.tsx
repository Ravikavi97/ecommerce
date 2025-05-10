import React, { useState } from "react";
import { ArrowLeft, CreditCard, CheckCircle } from "lucide-react";
import { useApp } from "../../contexts/AppContext";

export const PaymentPage: React.FC = () => {
  const { state, dispatch } = useApp();
  const [paymentMethod, setPaymentMethod] = useState<string>("credit-card");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Calculate order summary
  const subtotal = state.cart?.items?.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  ) || 0;
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.085;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails({
      ...cardDetails,
      [name]: value,
    });
  };

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
  };

  const handleBackToCheckout = () => {
    window.history.pushState({}, '', '/checkout');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate payment success/failure (80% success rate for demo)
      const isSuccess = Math.random() < 0.8;
      
      if (isSuccess) {
        setIsComplete(true);
        // Clear cart only after successful payment
        dispatch({ type: 'CLEAR_CART' });
        
        // Redirect to home page after showing success message
        setTimeout(() => {
          window.history.pushState({}, '', '/');
          window.dispatchEvent(new PopStateEvent('popstate'));
        }, 2000);
      } else {
        throw new Error('Payment failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      // Show error message to user
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Check if cart is empty
  if (!state.cart?.items?.length) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Payment</h1>
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <p className="text-lg mb-4">Your cart is empty. Please add items to your cart before proceeding to payment.</p>
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
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-success-600" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
          <p className="text-gray-600 mb-6">Thank you for your order. Your payment has been processed successfully.</p>
          <p className="text-gray-600 mb-8">You will be redirected to the home page shortly.</p>
          <div className="animate-pulse bg-gray-200 h-2 w-full rounded-full overflow-hidden">
            <div className="bg-primary-600 h-full w-full transform origin-left"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Payment</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payment Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-medium mb-6">Payment Method</h2>
            
            {/* Payment Method Selection */}
            <div className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${paymentMethod === 'credit-card' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'}`}
                  onClick={() => handlePaymentMethodChange('credit-card')}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${paymentMethod === 'credit-card' ? 'border-primary-500' : 'border-gray-300'}`}>
                      {paymentMethod === 'credit-card' && <div className="w-3 h-3 rounded-full bg-primary-500"></div>}
                    </div>
                    <span className="font-medium">Credit Card</span>
                  </div>
                </div>
                <div
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${paymentMethod === 'paypal' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'}`}
                  onClick={() => handlePaymentMethodChange('paypal')}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${paymentMethod === 'paypal' ? 'border-primary-500' : 'border-gray-300'}`}>
                      {paymentMethod === 'paypal' && <div className="w-3 h-3 rounded-full bg-primary-500"></div>}
                    </div>
                    <span className="font-medium">PayPal</span>
                  </div>
                </div>
                <div
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${paymentMethod === 'apple-pay' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'}`}
                  onClick={() => handlePaymentMethodChange('apple-pay')}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${paymentMethod === 'apple-pay' ? 'border-primary-500' : 'border-gray-300'}`}>
                      {paymentMethod === 'apple-pay' && <div className="w-3 h-3 rounded-full bg-primary-500"></div>}
                    </div>
                    <span className="font-medium">Apple Pay</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Credit Card Form */}
            {paymentMethod === 'credit-card' && (
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                  <div className="relative">
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardDetails.cardNumber}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-md pl-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                  <input
                    type="text"
                    id="cardName"
                    name="cardName"
                    placeholder="John Doe"
                    value={cardDetails.cardName}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={cardDetails.expiryDate}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      placeholder="123"
                      value={cardDetails.cvv}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handleBackToCheckout}
                    className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Checkout
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className={`px-6 py-3 rounded-md text-white flex items-center ${isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700 transition-colors'}`}
                  >
                    {isProcessing ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      'Complete Payment'
                    )}
                  </button>
                </div>
              </form>
            )}
            
            {/* PayPal */}
            {paymentMethod === 'paypal' && (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-6">You will be redirected to PayPal to complete your payment.</p>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handleBackToCheckout}
                    className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Checkout
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isProcessing}
                    className={`px-6 py-3 rounded-md text-white ${isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#0070ba] hover:bg-[#003087] transition-colors'}`}
                  >
                    {isProcessing ? 'Processing...' : 'Continue to PayPal'}
                  </button>
                </div>
              </div>
            )}
            
            {/* Apple Pay */}
            {paymentMethod === 'apple-pay' && (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-6">You will be prompted to complete your payment with Apple Pay.</p>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handleBackToCheckout}
                    className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Checkout
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isProcessing}
                    className={`px-6 py-3 rounded-md text-white ${isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800 transition-colors'}`}
                  >
                    {isProcessing ? 'Processing...' : 'Pay with Apple Pay'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
            <h2 className="text-lg font-medium mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {state.cart?.items?.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-12 h-12 flex-shrink-0 mr-3">
                      <img
                        src={item.product.images?.[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};