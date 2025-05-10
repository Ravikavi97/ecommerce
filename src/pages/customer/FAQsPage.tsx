import React from 'react';
import { MinimalLayout } from '../../layouts/MinimalLayout';

export const FAQsPage = () => (
  <MinimalLayout>
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Frequently Asked Questions</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">General Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-medium mb-2 text-gray-800">How do I create an account?</h3>
                <p className="text-gray-600">
                  Creating an account is easy! Click on the user icon in the top right corner of the page and select "Sign Up". 
                  Fill in your details, and you're all set to enjoy a personalized shopping experience.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-medium mb-2 text-gray-800">What are the benefits of having an account?</h3>
                <p className="text-gray-600">
                  With a LuxeMarket account, you can track your orders, save your favorite products, receive personalized recommendations,
                  and enjoy a faster checkout process. You'll also be the first to know about exclusive offers and promotions.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-medium mb-2 text-gray-800">How can I contact customer support?</h3>
                <p className="text-gray-600">
                  You can reach our customer support team through our <a href="/contact" className="text-primary-600 hover:underline">Contact Page</a>, 
                  by email at support@luxemarket.com, or by phone at (555) 123-4567 during our business hours.
                </p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Orders & Payments</h2>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-medium mb-2 text-gray-800">What payment methods do you accept?</h3>
                <p className="text-gray-600">
                  We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, and Apple Pay. 
                  All transactions are secure and encrypted for your protection.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-medium mb-2 text-gray-800">How can I track my order?</h3>
                <p className="text-gray-600">
                  Once your order ships, you'll receive a confirmation email with a tracking number. You can also visit our 
                  <a href="/track-order" className="text-primary-600 hover:underline"> Track Order page</a> and enter your order number and email to check the status.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-medium mb-2 text-gray-800">Can I modify or cancel my order?</h3>
                <p className="text-gray-600">
                  You can modify or cancel your order within 1 hour of placing it. Please contact our customer support team immediately 
                  if you need to make changes. Once an order has been processed, we cannot guarantee that changes can be made.
                </p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Products & Services</h2>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-medium mb-2 text-gray-800">Are your products authentic?</h3>
                <p className="text-gray-600">
                  Yes, we guarantee that all products sold on LuxeMarket are 100% authentic. We work directly with brands and authorized 
                  distributors to ensure the authenticity and quality of every item.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-medium mb-2 text-gray-800">Do you offer gift wrapping?</h3>
                <p className="text-gray-600">
                  Yes, we offer premium gift wrapping services for an additional fee. You can select this option during checkout 
                  and even include a personalized message for the recipient.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-medium mb-2 text-gray-800">Do you offer international shipping?</h3>
                <p className="text-gray-600">
                  Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location. 
                  Please refer to our <a href="/shipping-returns" className="text-primary-600 hover:underline">Shipping & Returns</a> page for more details.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </MinimalLayout>
);