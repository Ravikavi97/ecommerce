import React from 'react';
import { MinimalLayout } from '../../layouts/MinimalLayout';

export const AboutPage = () => (
  <MinimalLayout>
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">About LuxeMarket</h1>
        
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Story</h2>
            <p className="text-lg text-gray-600 mb-6">
              Founded with a passion for excellence, LuxeMarket has been at the forefront of delivering exceptional products and experiences to our customers. Our journey began with a simple idea: to create a platform that combines quality, convenience, and customer satisfaction.
            </p>
            <p className="text-lg text-gray-600">
              Today, we continue to grow and evolve, always keeping our customers' needs at the heart of everything we do. Our commitment to innovation and service excellence has made us a trusted name in the industry.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Mission</h2>
            <p className="text-lg text-gray-600">
              We strive to provide our customers with the best possible shopping experience, offering carefully curated products that meet our high standards of quality and value. Our mission is to make premium products accessible while maintaining exceptional customer service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-medium mb-3 text-gray-800">Quality First</h3>
                <p className="text-gray-600">
                  We never compromise on quality. Every product in our collection is carefully selected and tested to ensure it meets our high standards.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-medium mb-3 text-gray-800">Customer Focus</h3>
                <p className="text-gray-600">
                  Our customers are at the heart of everything we do. We continuously strive to exceed their expectations and provide exceptional service.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-medium mb-3 text-gray-800">Innovation</h3>
                <p className="text-gray-600">
                  We embrace new technologies and ideas to improve our services and provide better solutions for our customers.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-medium mb-3 text-gray-800">Sustainability</h3>
                <p className="text-gray-600">
                  We are committed to sustainable practices and work to minimize our environmental impact while maximizing social benefit.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Join Our Journey</h2>
            <p className="text-lg text-gray-600">
              We're always looking for ways to improve and grow. Your feedback and support help us continue to evolve and better serve our community. Thank you for being part of our story.
            </p>
          </section>
        </div>
      </div>
    </div>
  </MinimalLayout>
);