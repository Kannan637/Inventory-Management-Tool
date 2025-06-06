
import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, User, Phone, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const customers = [
    {
      id: 1,
      name: 'Karthik Subramanian',
      phone: '+91 9876543210',
      email: 'karthik@gmail.com',
      address: '123 Race Track Road, Chennai',
      totalPurchases: 125000,
      lastPurchase: '2024-01-15',
      bike: 'Ducati Panigale V4'
    },
    {
      id: 2,
      name: 'Lakshmi Narayanan',
      phone: '+91 9876543211',
      email: 'lakshmi@gmail.com',
      address: '456 Superbike Avenue, Coimbatore',
      totalPurchases: 89000,
      lastPurchase: '2024-01-10',
      bike: 'BMW S1000RR'
    },
    {
      id: 3,
      name: 'Senthil Kumar',
      phone: '+91 9876543212',
      email: 'senthil@gmail.com',
      address: '789 Moto GP Lane, Madurai',
      totalPurchases: 156000,
      lastPurchase: '2024-01-12',
      bike: 'Kawasaki Ninja ZX-10R'
    },
    {
      id: 4,
      name: 'Meenakshi Sundaram',
      phone: '+91 9876543213',
      email: 'meenakshi@gmail.com',
      address: '101 Speed Street, Trichy',
      totalPurchases: 112000,
      lastPurchase: '2024-01-18',
      bike: 'Yamaha YZF-R1'
    },
    {
      id: 5,
      name: 'Anbarasan Thirumalai',
      phone: '+91 9876543214',
      email: 'anbarasan@gmail.com',
      address: '202 Track Road, Salem',
      totalPurchases: 178000,
      lastPurchase: '2024-01-05',
      bike: 'Aprilia RSV4'
    }
  ];

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Customer Management</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Customer
        </Button>
      </div>

      {/* Customer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <User className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">342</p>
                <p className="text-sm text-gray-600">Total Customers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Phone className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">189</p>
                <p className="text-sm text-gray-600">Active This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Mail className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">₹8.2L</p>
                <p className="text-sm text-gray-600">Avg. Customer Value</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer List */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search customers by name, phone, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">Filter</Button>
            <Button variant="outline">Export</Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Customer</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Contact</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Address</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Motorcycle</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">Total Purchases</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Last Purchase</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium text-gray-900">{customer.name}</div>
                        <div className="text-sm text-gray-600">{customer.email}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{customer.phone}</td>
                    <td className="py-3 px-4 text-gray-600">{customer.address}</td>
                    <td className="py-3 px-4 text-gray-600 font-medium">{customer.bike}</td>
                    <td className="py-3 px-4 text-right font-medium">₹{customer.totalPurchases.toLocaleString()}</td>
                    <td className="py-3 px-4 text-center text-gray-600">{customer.lastPurchase}</td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
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

export default Customers;
