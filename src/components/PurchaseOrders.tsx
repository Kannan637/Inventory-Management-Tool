
import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Truck, Package, Calendar, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const PurchaseOrders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const suppliers = [
    {
      id: 1,
      name: 'Pirelli Tires India',
      contact: '+91 9876543210',
      email: 'orders@pirelli.com',
      address: 'Ambattur Industrial Estate, Chennai',
      totalOrders: 25,
      totalAmount: 2500000,
      products: 'Diablo Supercorsa, Rosso Corsa'
    },
    {
      id: 2,
      name: 'Michelin Tires Pvt Ltd',
      contact: '+91 9876543211',
      email: 'supply@michelin.com',
      address: 'Guindy, Chennai',
      totalOrders: 18,
      totalAmount: 1800000,
      products: 'Power GP, Power 5'
    },
    {
      id: 3,
      name: 'Bridgestone India',
      contact: '+91 9876543212',
      email: 'orders@bridgestone.co.in',
      address: 'Oragadam, Chennai',
      totalOrders: 22,
      totalAmount: 2100000,
      products: 'Battlax S22, Battlax RS11'
    },
    {
      id: 4,
      name: 'Metzeler India',
      contact: '+91 9876543213',
      email: 'supply@metzeler.in',
      address: 'Sriperumbudur, Tamil Nadu',
      totalOrders: 15,
      totalAmount: 1500000,
      products: 'M9RR Sportec, Racetec RR'
    }
  ];

  const purchaseOrders = [
    {
      id: 'PO-001',
      supplier: 'Pirelli Tires India',
      date: '2024-01-15',
      status: 'Pending',
      items: 45,
      amount: 950000,
      expectedDelivery: '2024-01-20',
      products: 'Diablo Supercorsa SP V3 (200/60 ZR17)'
    },
    {
      id: 'PO-002',
      supplier: 'Michelin Tires Pvt Ltd',
      date: '2024-01-14',
      status: 'Delivered',
      items: 30,
      amount: 650000,
      expectedDelivery: '2024-01-18',
      products: 'Power GP (190/55 ZR17)'
    },
    {
      id: 'PO-003',
      supplier: 'Bridgestone India',
      date: '2024-01-12',
      status: 'In Transit',
      items: 25,
      amount: 550000,
      expectedDelivery: '2024-01-19',
      products: 'Battlax Hypersport S22 (180/55 ZR17)'
    },
    {
      id: 'PO-004',
      supplier: 'Metzeler India',
      date: '2024-01-10',
      status: 'Delivered',
      items: 20,
      amount: 480000,
      expectedDelivery: '2024-01-16',
      products: 'M9RR Sportec (200/55 ZR17)'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Purchase Orders & Suppliers</h1>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Supplier
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Create PO
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Truck className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-gray-600">Active Suppliers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Package className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">43</p>
                <p className="text-sm text-gray-600">Pending Orders</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">₹8.5L</p>
                <p className="text-sm text-gray-600">This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">₹45.2L</p>
                <p className="text-sm text-gray-600">Total Orders</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Suppliers List */}
        <Card>
          <CardHeader>
            <CardTitle>Suppliers Directory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {suppliers.map((supplier) => (
                <div key={supplier.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div>
                    <p className="font-medium text-gray-900">{supplier.name}</p>
                    <p className="text-sm text-gray-600">{supplier.contact}</p>
                    <p className="text-xs text-gray-500">{supplier.products}</p>
                    <p className="text-xs text-gray-500">{supplier.totalOrders} orders</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{supplier.totalAmount.toLocaleString()}</p>
                    <div className="flex space-x-1 mt-1">
                      <Button variant="ghost" size="sm">
                        <Edit2 className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Purchase Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Purchase Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {purchaseOrders.map((po) => (
                <div key={po.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div>
                    <p className="font-medium text-gray-900">{po.id}</p>
                    <p className="text-sm text-gray-600">{po.supplier}</p>
                    <p className="text-xs text-gray-600">{po.products}</p>
                    <p className="text-xs text-gray-500">{po.items} items • {po.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{po.amount.toLocaleString()}</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(po.status)}`}>
                      {po.status}
                    </span>
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

export default PurchaseOrders;
