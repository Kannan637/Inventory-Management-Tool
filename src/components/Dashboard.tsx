
import React from 'react';
import { 
  DollarSign, 
  Package, 
  Users, 
  TrendingUp,
  AlertTriangle,
  ShoppingCart
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard = () => {
  const stats = [
    {
      title: 'Today\'s Sales',
      value: '₹15,240',
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      title: 'Total Products',
      value: '1,248',
      change: '+3.2%',
      icon: Package,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      title: 'Active Customers',
      value: '342',
      change: '+8.1%',
      icon: Users,
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    {
      title: 'Monthly Revenue',
      value: '₹4,85,200',
      change: '+15.3%',
      icon: TrendingUp,
      color: 'text-orange-600',
      bg: 'bg-orange-50'
    }
  ];

  const lowStockItems = [
    { name: 'Pirelli Diablo Supercorsa SP V3', stock: 3, min: 10, size: '200/60 ZR17' },
    { name: 'Michelin Power GP', stock: 1, min: 5, size: '190/55 ZR17' },
    { name: 'Dunlop SportSmart TT', stock: 2, min: 8, size: '120/70 ZR17' },
    { name: 'Bridgestone Battlax Hypersport S22', stock: 0, min: 6, size: '180/55 ZR17' },
  ];

  const recentSales = [
    { id: 'INV-001', customer: 'Karthik Subramanian', amount: '₹25,400', time: '2 mins ago', product: 'Pirelli Diablo Supercorsa SP V3' },
    { id: 'INV-002', customer: 'Lakshmi Narayanan', amount: '₹18,200', time: '15 mins ago', product: 'Michelin Power GP' },
    { id: 'INV-003', customer: 'Senthil Kumar', amount: '₹32,100', time: '1 hour ago', product: 'Dunlop SportSmart TT' },
    { id: 'INV-004', customer: 'Meenakshi Sundaram', amount: '₹14,800', time: '2 hours ago', product: 'Metzeler M9RR Sportec' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="text-sm text-gray-500">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className={`text-sm ${stat.color} font-medium`}>{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bg}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Low Stock Alert */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <span>Low Stock Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-600">{item.size} • Min: {item.min} units</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.stock === 0 ? 'bg-red-200 text-red-800' : 'bg-yellow-200 text-yellow-800'
                    }`}>
                      {item.stock} left
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Sales */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ShoppingCart className="h-5 w-5 text-blue-500" />
              <span>Recent Sales</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSales.map((sale, index) => (
                <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{sale.id}</p>
                    <p className="text-sm text-gray-600">{sale.customer}</p>
                    <p className="text-xs text-gray-500">{sale.product}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{sale.amount}</p>
                    <p className="text-sm text-gray-500">{sale.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
