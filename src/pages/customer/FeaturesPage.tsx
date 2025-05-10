import React from "react";

export const FeaturesPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Store Features</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
          <span className="text-primary-600 text-5xl mb-4">🚚</span>
          <h2 className="text-xl font-semibold mb-2">Fast & Free Shipping</h2>
          <p className="text-gray-600 text-center">Enjoy free shipping on all orders over RS 5000, delivered quickly to your doorstep.</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
          <span className="text-primary-600 text-5xl mb-4">🔒</span>
          <h2 className="text-xl font-semibold mb-2">Secure Payments</h2>
          <p className="text-gray-600 text-center">Your transactions are protected with industry-leading security and encryption.</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
          <span className="text-primary-600 text-5xl mb-4">💬</span>
          <h2 className="text-xl font-semibold mb-2">24/7 Customer Support</h2>
          <p className="text-gray-600 text-center">Our support team is available around the clock to assist you with any questions.</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
          <span className="text-primary-600 text-5xl mb-4">🏆</span>
          <h2 className="text-xl font-semibold mb-2">Quality Guarantee</h2>
          <p className="text-gray-600 text-center">We stand behind our products with a 1-year warranty and hassle-free returns.</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
          <span className="text-primary-600 text-5xl mb-4">🌱</span>
          <h2 className="text-xl font-semibold mb-2">Eco-Friendly Packaging</h2>
          <p className="text-gray-600 text-center">We use sustainable materials to minimize our environmental impact.</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
          <span className="text-primary-600 text-5xl mb-4">⭐</span>
          <h2 className="text-xl font-semibold mb-2">Top-Rated Products</h2>
          <p className="text-gray-600 text-center">Our products are highly rated by customers for quality and value.</p>
        </div>
      </div>
    </div>
  );
}

export default FeaturesPage;