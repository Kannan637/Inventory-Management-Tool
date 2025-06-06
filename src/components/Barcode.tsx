
import React, { useState } from 'react';
import { Scan, Download, Package, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Barcode = () => {
  const [barcodeInput, setBarcodeInput] = useState('');
  const [generatedBarcode, setGeneratedBarcode] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const products = [
    {
      id: 1,
      name: 'Samsung Galaxy A54',
      sku: 'SAM-A54-128',
      barcode: '1234567890123',
      price: 32999,
      stock: 15
    },
    {
      id: 2,
      name: 'iPhone 13 Pro',
      sku: 'APL-13P-256',
      barcode: '2345678901234',
      price: 89999,
      stock: 8
    }
  ];

  const generateBarcode = (productSku) => {
    // Simple barcode generation (in real app, use a barcode library)
    const timestamp = Date.now().toString().slice(-6);
    const barcode = `${productSku.replace(/-/g, '')}${timestamp}`;
    setGeneratedBarcode(barcode);
    return barcode;
  };

  const searchByBarcode = (barcode) => {
    const results = products.filter(product => 
      product.barcode.includes(barcode) || 
      product.name.toLowerCase().includes(barcode.toLowerCase()) ||
      product.sku.toLowerCase().includes(barcode.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleBarcodeSearch = () => {
    if (barcodeInput.trim()) {
      searchByBarcode(barcodeInput);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Barcode Management</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Download className="h-4 w-4 mr-2" />
          Print Barcodes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Barcode Scanner */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Scan className="h-5 w-5" />
              <span>Barcode Scanner</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Scan or enter barcode..."
                  value={barcodeInput}
                  onChange={(e) => setBarcodeInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleBarcodeSearch()}
                />
                <Button onClick={handleBarcodeSearch}>
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="bg-gray-100 p-8 rounded-lg text-center">
                <Scan className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">Position barcode in scanner area</p>
                <p className="text-sm text-gray-500 mt-2">Or manually enter barcode above</p>
              </div>

              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-medium">Search Results:</h3>
                  {searchResults.map((product) => (
                    <div key={product.id} className="p-3 border rounded-lg bg-green-50">
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-600">SKU: {product.sku}</p>
                      <p className="text-sm text-gray-600">Price: ₹{product.price.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">Stock: {product.stock} units</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Barcode Generator */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="h-5 w-5" />
              <span>Barcode Generator</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Select Product</label>
                <select className="w-full p-2 border rounded-lg">
                  <option value="">Choose a product...</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.sku}>
                      {product.name} ({product.sku})
                    </option>
                  ))}
                </select>
              </div>

              <Button 
                onClick={() => generateBarcode('SAM-A54-128')} 
                className="w-full"
              >
                Generate Barcode
              </Button>

              {generatedBarcode && (
                <div className="bg-white p-4 border rounded-lg text-center">
                  <div className="bg-black text-white p-2 font-mono text-lg mb-2">
                    ||||| |||| ||||| ||||
                  </div>
                  <p className="font-mono text-sm">{generatedBarcode}</p>
                  <div className="flex space-x-2 mt-3">
                    <Button variant="outline" size="sm">
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm">
                      Print
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Barcode Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Barcode Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { action: 'Generated', product: 'Samsung Galaxy A54', time: '2 mins ago', barcode: '1234567890123' },
              { action: 'Scanned', product: 'iPhone 13 Pro', time: '15 mins ago', barcode: '2345678901234' },
              { action: 'Printed', product: 'OnePlus 11', time: '1 hour ago', barcode: '3456789012345' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{activity.action} - {activity.product}</p>
                  <p className="text-sm text-gray-600">Barcode: {activity.barcode}</p>
                </div>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Barcode;
