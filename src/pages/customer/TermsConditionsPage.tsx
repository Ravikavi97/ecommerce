import React from 'react';
import { MinimalLayout } from '../../layouts/MinimalLayout';

export const TermsConditionsPage = () => (
  <MinimalLayout>
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Terms & Conditions</h1>
        
        <div className="space-y-8">
          <section>
            <p className="text-gray-600 mb-6">
              Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
            
            <p className="text-gray-600 mb-6">
              Welcome to LuxeMarket. These Terms and Conditions govern your use of our website and the services we offer. By accessing or using our website, you agree to be bound by these Terms. If you disagree with any part of these terms, please do not use our website.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Use of Website</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <p className="text-gray-600 mb-4">
                By using our website, you agree to the following:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>You will use the website for lawful purposes only and in accordance with these Terms</li>
                <li>You will not use the website in any way that could damage, disable, overburden, or impair our servers or networks</li>
                <li>You will not attempt to gain unauthorized access to any part of the website, other accounts, or computer systems</li>
                <li>You will not use any robot, spider, or other automated device to access the website for any purpose without our express written permission</li>
                <li>You are responsible for maintaining the confidentiality of your account information and password</li>
              </ul>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Intellectual Property</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <p className="text-gray-600 mb-4">
                The content on our website, including text, graphics, logos, images, and software, is the property of LuxeMarket or its content suppliers and is protected by copyright and other intellectual property laws.
              </p>
              <p className="text-gray-600">
                You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our website without our prior written consent, except as follows:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 mt-4">
                <li>Your computer may temporarily store copies of such materials in RAM incidental to your accessing and viewing those materials</li>
                <li>You may store files that are automatically cached by your web browser for display enhancement purposes</li>
                <li>You may print or download one copy of a reasonable number of pages of the website for your own personal, non-commercial use and not for further reproduction, publication, or distribution</li>
              </ul>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Product Information & Pricing</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <p className="text-gray-600 mb-4">
                We strive to provide accurate product descriptions and pricing information. However, we do not warrant that product descriptions, pricing, or other content on the website is accurate, complete, reliable, current, or error-free. If a product offered by LuxeMarket is not as described, your sole remedy is to return it in unused condition.
              </p>
              <p className="text-gray-600">
                All prices are shown in USD and are subject to change without notice. We reserve the right to modify or discontinue any product or service without notice. We shall not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the service.
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">User Accounts</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <p className="text-gray-600 mb-4">
                When you create an account with us, you must provide accurate, complete, and current information at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our website.
              </p>
              <p className="text-gray-600">
                You are responsible for safeguarding the password that you use to access the website and for any activities or actions under your password. We encourage you to use "strong" passwords (passwords that use a combination of upper and lower case letters, numbers, and symbols) with your account. You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Orders & Payments</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <p className="text-gray-600 mb-4">
                By placing an order through our website, you are making an offer to purchase products. We reserve the right to refuse or cancel your order at any time for reasons including but not limited to:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Product availability</li>
                <li>Errors in product or pricing information</li>
                <li>Errors in your order</li>
                <li>Suspected fraudulent activity</li>
              </ul>
              <p className="text-gray-600 mt-4">
                Payment must be received prior to the acceptance of an order. We accept various forms of payment as indicated on our website. By submitting your payment information, you represent and warrant that you have the legal right to use any payment method(s) utilized in connection with any purchase.
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Limitation of Liability</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <p className="text-gray-600">
                In no event shall LuxeMarket, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the website; (ii) any conduct or content of any third party on the website; (iii) any content obtained from the website; and (iv) unauthorized access, use, or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence), or any other legal theory, whether or not we have been informed of the possibility of such damage.
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Indemnification</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <p className="text-gray-600">
                You agree to defend, indemnify, and hold harmless LuxeMarket, its parent, subsidiaries, affiliates, partners, officers, directors, agents, contractors, licensors, service providers, subcontractors, suppliers, interns, and employees, from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of the website, including, but not limited to, your user submissions, any use of the website's content, services, and products other than as expressly authorized in these Terms.
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Governing Law</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <p className="text-gray-600">
                These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Changes to Terms</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <p className="text-gray-600">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our website after those revisions become effective, you agree to be bound by the revised terms.
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Contact Information</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <p className="text-gray-600">
                Questions about the Terms should be sent to us at legal@luxemarket.com or through our <a href="/contact" className="text-primary-600 hover:underline">Contact Page</a>.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  </MinimalLayout>
);