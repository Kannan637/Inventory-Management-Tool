
import React, { useState } from 'react';
import { Search, Download, Eye, Printer, Calendar, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const SalesHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('today');

  const salesTransactions = [
    {
      id: 'INV-2024-001',
      date: '2024-01-15',
      time: '14:30',
      customer: 'John Doe',
      items: 3,
      subtotal: 125000,
      tax: 22500,
      total: 147500,
      paymentMethod: 'Card',
      status: 'Completed'
    },
    {
      id: 'INV-2024-002',
      date: '2024-01-15',
      time: '13:15',
      customer: 'Jane Smith',
      items: 1,
      subtotal: 89999,
      tax: 16199,
      total: 106198,
      paymentMethod: 'Cash',
      status: 'Completed'
    },
    {
      id: 'INV-2024-003',
      date: '2024-01-15',
      time: '12:45',
      customer: 'Mike Johnson',
      items: 2,
      subtotal: 87998,
      tax: 15839,
      total: 103837,
      paymentMethod: 'UPI',
      status: 'Completed'
    },
    {
      id: 'INV-2024-004',
      date: '2024-01-14',
      time: '16:20',
      customer: 'Sarah Wilson',
      items: 1,
      subtotal: 42999,
      tax: 7739,
      total: 50738,
      paymentMethod: 'Card',
      status: 'Refunded'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Refunded':
        return 'bg-red-100 text-red-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentMethodColor = (method) => {
    switch (method) {
      case 'Cash':
        return 'bg-blue-100 text-blue-800';
      case 'Card':
        return 'bg-purple-100 text-purple-800';
      case 'UPI':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const todayTotal = salesTransactions
    .filter(sale => sale.date === '2024-01-15')
    .reduce((sum, sale) => sum + sale.total, 0);

  const filteredTransactions = salesTransactions.filter(transaction =>
    transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Sales History</h1>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Sales Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today's Sales</p>
                <p className="text-2xl font-bold text-green-600">₹{todayTotal.toLocaleString()}</p>
                <p className="text-sm text-green-600">+12.5% from yesterday</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today's Orders</p>
                <p className="text-2xl font-bold text-blue-600">3</p>
                <p className="text-sm text-blue-600">Active transactions</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Order Value</p>
                <p className="text-2xl font-bold text-purple-600">₹1,19,124</p>
                <p className="text-sm text-purple-600">Per transaction</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tax Collected</p>
                <p className="text-2xl font-bold text-orange-600">₹64,377</p>
                <p className="text-sm text-orange-600">18% GST today</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Transactions Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Sales Transactions</CardTitle>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by invoice or customer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Invoice ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Date & Time</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Customer</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Items</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">Subtotal</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">Tax</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">Total</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Payment</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900">{transaction.id}</div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      <div>{transaction.date}</div>
                      <div className="text-sm text-gray-500">{transaction.time}</div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{transaction.customer}</td>
                    <td className="py-3 px-4 text-center">{transaction.items}</td>
                    <td className="py-3 px-4 text-right">₹{transaction.subtotal.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right">₹{transaction.tax.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right font-medium">₹{transaction.total.toLocaleString()}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentMethodColor(transaction.paymentMethod)}`}>
                        {transaction.paymentMethod}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Printer className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesHistory;
