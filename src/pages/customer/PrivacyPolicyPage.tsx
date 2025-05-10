import React from 'react';
import { MinimalLayout } from '../../layouts/MinimalLayout';

export const PrivacyPolicyPage = () => (
  <MinimalLayout>
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Privacy Policy</h1>
        
        <div className="space-y-8">
          <section>
            <p className="text-gray-600 mb-6">
              Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
            
            <p className="text-gray-600 mb-6">
              At LuxeMarket, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Information We Collect</h2>
            
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-medium mb-3 text-gray-800">Personal Data</h3>
                <p className="text-gray-600 mb-3">
                  We may collect personally identifiable information, such as:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>Name</li>
                  <li>Email address</li>
                  <li>Mailing address</li>
                  <li>Phone number</li>
                  <li>Payment information</li>
                  <li>Demographics</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-medium mb-3 text-gray-800">Usage Data</h3>
                <p className="text-gray-600">
                  We may also collect information about how the site is accessed and used. This usage data may include information such as your computer's IP address, browser type, browser version, the pages of our site that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers, and other diagnostic data.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-medium mb-3 text-gray-800">Cookies and Tracking Technologies</h3>
                <p className="text-gray-600">
                  We use cookies and similar tracking technologies to track activity on our site and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our site.
                </p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">How We Use Your Information</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <p className="text-gray-600 mb-4">
                We may use the information we collect from you for the following purposes:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>To process and fulfill your orders</li>
                <li>To provide customer support and respond to inquiries</li>
                <li>To send you transactional emails and order updates</li>
                <li>To send marketing communications (with your consent)</li>
                <li>To improve our website, products, and services</li>
                <li>To personalize your experience and deliver content relevant to your interests</li>
                <li>To protect against fraud and unauthorized transactions</li>
                <li>To comply with legal obligations</li>
              </ul>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Information Sharing and Disclosure</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <p className="text-gray-600 mb-4">
                We may share your personal information in the following situations:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li><strong>With Service Providers:</strong> We may share your information with third-party vendors, service providers, contractors, or agents who perform services for us or on our behalf.</li>
                <li><strong>Business Transfers:</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
                <li><strong>With Your Consent:</strong> We may disclose your personal information for any other purpose with your consent.</li>
                <li><strong>Legal Requirements:</strong> We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process.</li>
              </ul>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Data Security</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <p className="text-gray-600">
                We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure. Although we will do our best to protect your personal information, transmission of personal information to and from our site is at your own risk. You should only access the services within a secure environment.
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Your Data Protection Rights</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <p className="text-gray-600 mb-4">
                Depending on your location, you may have the following data protection rights:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>The right to access, update, or delete the information we have on you</li>
                <li>The right of rectification - the right to have your information corrected if it is inaccurate or incomplete</li>
                <li>The right to object to our processing of your personal data</li>
                <li>The right of restriction - the right to request that we restrict the processing of your personal information</li>
                <li>The right to data portability - the right to be provided with a copy of your personal data in a structured, machine-readable format</li>
                <li>The right to withdraw consent at any time where we relied on your consent to process your personal information</li>
              </ul>
              <p className="text-gray-600 mt-4">
                To exercise any of these rights, please contact us at privacy@luxemarket.com.
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Children's Privacy</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <p className="text-gray-600">
                Our site is not intended for children under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with personal data, please contact us. If we become aware that we have collected personal data from children without verification of parental consent, we take steps to remove that information from our servers.
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Changes to This Privacy Policy</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <p className="text-gray-600">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Contact Us</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <p className="text-gray-600">
                If you have any questions about this Privacy Policy, please contact us at privacy@luxemarket.com or through our <a href="/contact" className="text-primary-600 hover:underline">Contact Page</a>.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  </MinimalLayout>
);