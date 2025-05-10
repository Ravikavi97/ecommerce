import React from 'react';
import { 
  TrendingUp, TrendingDown, ShoppingBag, Users, 
  DollarSign, ShoppingCart, AlertTriangle,
  ChevronDown, ChevronUp
} from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { dashboardStats, orders, products } from '../../data/mockData';

export const DashboardPage: React.FC = () => {
  // Mock data for charts
  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [3200, 4500, 5100, 4800, 6200, 7500]
  };
  
  const revenueChange = 12.5; // Percentage
  const ordersChange = 8.3; // Percentage

  return (
    <div className="px-4 sm:px-6 lg:px-8 pb-8">
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Dashboard
          </h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <select className="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-sm">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
            <option>Last 12 months</option>
          </select>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Revenue */}
        <Card>
          <CardBody>
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
                <DollarSign className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
                  <dd>
                    <div className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        ${dashboardStats.totalSales.toLocaleString()}
                      </div>
                      <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                        revenueChange >= 0 ? 'text-success-600' : 'text-error-600'
                      }`}>
                        {revenueChange >= 0 ? (
                          <TrendingUp className="self-center flex-shrink-0 h-4 w-4 mr-1" />
                        ) : (
                          <TrendingDown className="self-center flex-shrink-0 h-4 w-4 mr-1" />
                        )}
                        <span>{Math.abs(revenueChange)}%</span>
                      </div>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Total Orders */}
        <Card>
          <CardBody>
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-secondary-100 rounded-md p-3">
                <ShoppingBag className="h-6 w-6 text-secondary-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Orders</dt>
                  <dd>
                    <div className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {dashboardStats.totalOrders}
                      </div>
                      <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                        ordersChange >= 0 ? 'text-success-600' : 'text-error-600'
                      }`}>
                        {ordersChange >= 0 ? (
                          <TrendingUp className="self-center flex-shrink-0 h-4 w-4 mr-1" />
                        ) : (
                          <TrendingDown className="self-center flex-shrink-0 h-4 w-4 mr-1" />
                        )}
                        <span>{Math.abs(ordersChange)}%</span>
                      </div>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Total Customers */}
        <Card>
          <CardBody>
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-accent-100 rounded-md p-3">
                <Users className="h-6 w-6 text-accent-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Customers</dt>
                  <dd>
                    <div className="text-2xl font-semibold text-gray-900">
                      {dashboardStats.totalCustomers}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Avg Order Value */}
        <Card>
          <CardBody>
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-success-100 rounded-md p-3">
                <ShoppingCart className="h-6 w-6 text-success-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Avg Order Value</dt>
                  <dd>
                    <div className="text-2xl font-semibold text-gray-900">
                      ${dashboardStats.averageOrderValue.toFixed(2)}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Charts */}
      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Sales Overview */}
        <Card className="col-span-2">
          <CardHeader 
            title="Sales Overview"
            subtitle="Last 6 months"
            action={
              <select className="text-sm border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500">
                <option>Revenue</option>
                <option>Orders</option>
              </select>
            }
          />
          <CardBody>
            <div className="h-80">
              {/* In a real app, we would use a real chart library like Chart.js or Recharts */}
              <div className="h-full flex items-end px-4">
                {salesData.datasets.map((value, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-primary-500 rounded-t-sm"
                      style={{ height: `${(value / 8000) * 100}%` }}
                    ></div>
                    <div className="text-xs text-gray-500 mt-2">{salesData.labels[index]}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader
            title="Recent Orders"
            action={
              <a href="#" className="text-sm text-primary-600 hover:text-primary-900">
                View all
              </a>
            }
          />
          <CardBody className="p-0">
            <div className="flow-root">
              <ul className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <li key={order.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <span className={`inline-flex p-1 rounded-md ${
                          order.status === 'delivered' ? 'bg-success-100 text-success-700' :
                          order.status === 'shipped' ? 'bg-primary-100 text-primary-700' :
                          order.status === 'processing' ? 'bg-warning-100 text-warning-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          <ShoppingBag className="h-5 w-5" />
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          Order #{order.id}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {order.items.reduce((acc, item) => acc + item.quantity, 0)} items • ${order.total.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex flex-col items-end">
                        <p className="text-sm text-gray-900">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                        <p className={`text-xs ${
                          order.status === 'delivered' ? 'text-success-600' :
                          order.status === 'shipped' ? 'text-primary-600' :
                          order.status === 'processing' ? 'text-warning-600' :
                          'text-gray-600'
                        }`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Low Stock and Pending Orders */}
      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Low Stock Products */}
        <Card>
          <CardHeader
            title="Low Stock Products"
            subtitle={`${dashboardStats.lowStockProducts} products need attention`}
            action={
              <a href="#" className="text-sm text-primary-600 hover:text-primary-900">
                View all
              </a>
            }
          />
          <CardBody className="p-0">
            <div className="flow-root">
              <ul className="divide-y divide-gray-200">
                {products.slice(0, 3).map((product) => (
                  <li key={product.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-md object-cover"
                          src={product.images[0]}
                          alt={product.name}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {product.name}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          SKU: {product.sku}
                        </p>
                      </div>
                      <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning-100 text-warning-800">
                        <AlertTriangle className="mr-1 h-3 w-3" />
                        Low Stock
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </CardBody>
        </Card>

        {/* Top Selling Products */}
        <Card>
          <CardHeader
            title="Top Selling Products"
            subtitle="This month"
            action={
              <a href="#" className="text-sm text-primary-600 hover:text-primary-900">
                View all
              </a>
            }
          />
          <CardBody className="p-0">
            <div className="flow-root">
              <ul className="divide-y divide-gray-200">
                {products.slice(0, 5).map((product, index) => (
                  <li key={product.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-md object-cover"
                          src={product.images[0]}
                          alt={product.name}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {product.name}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          ${product.price.toFixed(2)} • {product.reviewCount} reviews
                        </p>
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {100 - (index * 12)} units
                        <div className={`flex items-center text-xs ${
                          index === 0 ? 'text-success-600' : 'text-gray-500'
                        }`}>
                          {index === 0 ? (
                            <ChevronUp className="h-3 w-3 mr-1" />
                          ) : (
                            <ChevronDown className="h-3 w-3 mr-1" />
                          )}
                          {index === 0 ? '+12%' : `-${index * 4}%`}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};