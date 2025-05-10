import React, { useState } from 'react';
import { Package, Truck, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';

interface OrderStatus {
  status: 'processing' | 'shipped' | 'delivered' | 'not-found';
  orderNumber?: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
  currentLocation?: string;
  statusHistory?: {
    status: string;
    date: string;
    location: string;
  }[];
}

export const TrackOrderPage: React.FC = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [orderStatus, setOrderStatus] = useState<OrderStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTrackOrder = () => {
    setIsLoading(true);
    // Simulated API call
    setTimeout(() => {
      if (orderNumber.trim() === '') {
        setOrderStatus(null);
      } else if (orderNumber === '12345') { // Demo order number
        setOrderStatus({
          status: 'shipped',
          orderNumber: '12345',
          trackingNumber: 'TRK789012',
          estimatedDelivery: '2024-02-20',
          currentLocation: 'San Francisco, CA',
          statusHistory: [
            {
              status: 'Order Placed',
              date: '2024-02-15',
              location: 'Online'
            },
            {
              status: 'Processing',
              date: '2024-02-16',
              location: 'Warehouse'
            },
            {
              status: 'Shipped',
              date: '2024-02-17',
              location: 'San Francisco, CA'
            }
          ]
        });
      } else {
        setOrderStatus({
          status: 'not-found'
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const getStatusColor = (status: OrderStatus['status']) => {
    switch (status) {
      case 'processing':
        return 'text-yellow-500';
      case 'shipped':
        return 'text-blue-500';
      case 'delivered':
        return 'text-green-500';
      case 'not-found':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: OrderStatus['status']) => {
    switch (status) {
      case 'processing':
        return <Package className="h-6 w-6 text-yellow-500" />;
      case 'shipped':
        return <Truck className="h-6 w-6 text-blue-500" />;
      case 'delivered':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'not-found':
        return <AlertCircle className="h-6 w-6 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Track Your Order</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Enter your order number"
              className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
            />
            <Button
              variant="primary"
              onClick={handleTrackOrder}
              disabled={isLoading}
              className="md:w-auto w-full"
            >
              {isLoading ? 'Tracking...' : 'Track Order'}
            </Button>
          </div>
          
          {orderStatus && (
            <div className="mt-8">
              {orderStatus.status === 'not-found' ? (
                <div className="text-center py-8">
                  <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Order Not Found</h2>
                  <p className="text-gray-600">Please check your order number and try again.</p>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">Order #{orderStatus.orderNumber}</h2>
                      <p className="text-gray-600">Tracking Number: {orderStatus.trackingNumber}</p>
                    </div>
                    <div className={`flex items-center ${getStatusColor(orderStatus.status)}`}>
                      {getStatusIcon(orderStatus.status)}
                      <span className="ml-2 font-medium">
                        {orderStatus.status.charAt(0).toUpperCase() + orderStatus.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Current Location</p>
                        <p className="font-medium text-gray-900">{orderStatus.currentLocation}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Estimated Delivery</p>
                        <p className="font-medium text-gray-900">{orderStatus.estimatedDelivery}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Tracking History</h3>
                    {orderStatus.statusHistory?.map((history, index) => (
                      <div key={index} className="flex items-start">
                        <div className="relative">
                          <div className="h-4 w-4 rounded-full bg-primary-500 mt-1"></div>
                          {index !== (orderStatus.statusHistory?.length || 0) - 1 && (
                            <div className="absolute top-5 bottom-0 left-2 w-0.5 bg-gray-200"></div>
                          )}
                        </div>
                        <div className="ml-4 pb-6">
                          <p className="font-medium text-gray-900">{history.status}</p>
                          <p className="text-sm text-gray-600">{history.date} - {history.location}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Need Help?</h2>
          <p className="text-gray-600 mb-4">
            If you need assistance tracking your order or have any questions, our customer service team is here to help.
          </p>
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-medium">Email:</span> support@luxemarket.com
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Phone:</span> 1-800-123-4567
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Hours:</span> Monday - Friday, 9:00 AM - 6:00 PM EST
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};