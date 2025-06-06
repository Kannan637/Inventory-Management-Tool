
import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Package, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AddProductModal from './modals/AddProductModal';

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  const products = [
    {
      id: 1,
      name: 'Michelin Power GP',
      sku: 'MICH-PGP-190',
      category: 'Sport Tires',
      price: 12999,
      stock: 15,
      minStock: 10,
      status: 'In Stock',
      size: '190/55 ZR17',
      description: 'High-performance sport tire with exceptional grip for superbikes, ideal for track days and sporty street riding.'
    },
    {
      id: 2,
      name: 'Pirelli Diablo Supercorsa SP V3',
      sku: 'PIR-DSC-200',
      category: 'Racing Tires',
      price: 18999,
      stock: 8,
      minStock: 5,
      status: 'In Stock',
      size: '200/60 ZR17',
      description: 'Premium racing tire with advanced compound for maximum cornering grip and stability at high speeds.'
    },
    {
      id: 3,
      name: 'Bridgestone Battlax Hypersport S22',
      sku: 'BRG-S22-180',
      category: 'Sport Tires',
      price: 14999,
      stock: 2,
      minStock: 8,
      status: 'Low Stock',
      size: '180/55 ZR17',
      description: 'All-weather sport tire with excellent wet grip and durability, perfect for daily riders who enjoy spirited weekend rides.'
    },
    {
      id: 4,
      name: 'Dunlop SportSmart TT',
      sku: 'DUN-SMTT-120',
      category: 'Track Tires',
      price: 16999,
      stock: 0,
      minStock: 6,
      status: 'Out of Stock',
      size: '120/70 ZR17',
      description: 'Track-focused front tire with race-derived technology, offering superior feedback and cornering stability.'
    },
    {
      id: 5,
      name: 'Continental ContiRaceAttack 2 Street',
      sku: 'CONT-RA2-190',
      category: 'Sport Tires',
      price: 13499,
      stock: 12,
      minStock: 8,
      status: 'In Stock',
      size: '190/50 ZR17',
      description: 'Street-legal race tire with quick warm-up times and consistent performance throughout its lifespan.'
    },
    {
      id: 6,
      name: 'Metzeler M9RR Sportec',
      sku: 'MTZ-M9RR-200',
      category: 'Sport Tires',
      price: 15999,
      stock: 5,
      minStock: 6,
      status: 'Low Stock',
      size: '200/55 ZR17',
      description: 'Advanced sport tire with innovative compound distribution for balanced performance in all conditions.'
    }
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Stock':
        return 'bg-green-100 text-green-800';
      case 'Low Stock':
        return 'bg-yellow-100 text-yellow-800';
      case 'Out of Stock':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
        <Button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Inventory Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Package className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">1,248</p>
                <p className="text-sm text-gray-600">Total Products</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">1,180</p>
                <p className="text-sm text-gray-600">In Stock</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">52</p>
                <p className="text-sm text-gray-600">Low Stock</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold">16</p>
                <p className="text-sm text-gray-600">Out of Stock</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Product Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search products by name or SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">Filter</Button>
            <Button variant="outline">Export</Button>
          </div>

          {/* Products Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Product</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">SKU</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Size</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Category</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">Price</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Stock</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900">{product.name}</div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{product.sku}</td>
                    <td className="py-3 px-4 text-gray-600">{product.size}</td>
                    <td className="py-3 px-4 text-gray-600">{product.category}</td>
                    <td className="py-3 px-4 text-right font-medium">₹{product.price.toLocaleString()}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`font-medium ${product.stock <= product.minStock ? 'text-red-600' : 'text-gray-900'}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                        {product.status}
                      </span>
                    </td>
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

      <AddProductModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />
    </div>
  );
};

export default Inventory;
