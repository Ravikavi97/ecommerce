import React from 'react';
import { MinimalLayout } from '../../layouts/MinimalLayout';

export const ShippingReturnsPage = () => (
  <MinimalLayout>
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Shipping & Returns</h1>
        
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Shipping Information</h2>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-medium mb-3 text-gray-800">Shipping Methods & Timeframes</h3>
                <p className="text-gray-600 mb-4">
                  We offer several shipping options to meet your needs:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li><strong>Standard Shipping:</strong> 5-7 business days (Free on orders over Rs 5000)</li>
                  <li><strong>Express Shipping:</strong> 2-3 business days ($12.99)</li>
                  <li><strong>Next Day Delivery:</strong> Next business day if ordered before 2 PM EST ($24.99)</li>
                  <li><strong>International Shipping:</strong> 7-14 business days (Rates vary by location)</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-medium mb-3 text-gray-800">Order Processing</h3>
                <p className="text-gray-600">
                  Orders are typically processed within 1-2 business days after payment confirmation. During peak seasons or promotional periods, 
                  processing may take an additional 1-2 days. You will receive a shipping confirmation email with tracking information once your order has shipped.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-medium mb-3 text-gray-800">International Orders</h3>
                <p className="text-gray-600">
                  For international shipments, please note that customs duties, taxes, and import fees are not included in the product price or shipping cost. 
                  These charges are the buyer's responsibility and will be collected by the delivery carrier or local customs office. Delivery times for 
                  international orders may vary depending on customs processing in your country.
                </p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Returns & Exchanges</h2>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-medium mb-3 text-gray-800">Return Policy</h3>
                <p className="text-gray-600 mb-4">
                  We want you to be completely satisfied with your purchase. If you're not happy with your order for any reason, you can return it within 30 days 
                  of delivery for a full refund or exchange. Please note the following conditions:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Items must be unused, unworn, and in their original packaging with all tags attached</li>
                  <li>Sale items can only be returned for store credit</li>
                  <li>Personalized or custom-made items cannot be returned unless defective</li>
                  <li>Intimate apparel, swimwear, and beauty products cannot be returned for hygiene reasons</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-medium mb-3 text-gray-800">How to Return an Item</h3>
                <p className="text-gray-600 mb-4">
                  To initiate a return, please follow these steps:
                </p>
                <ol className="list-decimal pl-5 space-y-2 text-gray-600">
                  <li>Log in to your account and go to your order history</li>
                  <li>Select the order containing the item(s) you wish to return</li>
                  <li>Click on "Return Items" and follow the instructions</li>
                  <li>Print the prepaid return shipping label (for domestic orders only)</li>
                  <li>Pack the item(s) securely in the original packaging if possible</li>
                  <li>Attach the return label to the package and drop it off at the designated carrier location</li>
                </ol>
                <p className="text-gray-600 mt-4">
                  If you received a damaged or defective item, please contact our customer service team immediately at support@luxemarket.com or (555) 123-4567.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-medium mb-3 text-gray-800">Refund Process</h3>
                <p className="text-gray-600">
                  Once we receive your return, our team will inspect the item(s) to ensure they meet our return policy requirements. Approved returns will be 
                  processed within 3-5 business days. Refunds will be issued to the original payment method used for the purchase. Please allow an additional 
                  5-10 business days for the refund to appear on your account, depending on your financial institution's processing times.
                </p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Shipping FAQs</h2>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-medium mb-2 text-gray-800">Can I change my shipping address after placing an order?</h3>
                <p className="text-gray-600">
                  We can only change the shipping address if the order hasn't been processed yet. Please contact our customer service team immediately 
                  if you need to update your shipping information.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-medium mb-2 text-gray-800">Do you ship to P.O. boxes?</h3>
                <p className="text-gray-600">
                  Yes, we can ship to P.O. boxes for standard shipping only. Express and Next Day Delivery options require a physical address.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-medium mb-2 text-gray-800">What should I do if my package is lost or damaged?</h3>
                <p className="text-gray-600">
                  If your package is lost, damaged, or hasn't arrived within the expected timeframe, please contact our customer service team with your 
                  order number and any relevant details. We'll work with the shipping carrier to resolve the issue as quickly as possible.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </MinimalLayout>
);