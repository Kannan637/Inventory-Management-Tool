import React, { useState } from 'react';
import { Plus, Search, Trash2, Calculator, Printer, Save, ShoppingCart, User, Phone, MapPin, DollarSign, Percent, Clock, FileText, Bike, Calendar, CreditCard, CheckCircle, AlertCircle, Truck, Smartphone, Wrench, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import Invoice from './Invoice';
import '../styles/print.css';

const Billing = () => {
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showInvoice, setShowInvoice] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState(null);
  const [productCode, setProductCode] = useState('');
  const [activeTab, setActiveTab] = useState('products');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    email: '',
    motorcycle: '',
    registrationNumber: ''
  });
  const [invoiceSettings, setInvoiceSettings] = useState({
    invoiceNumber: 'INV-2278',
    discountPercent: 0,
    discountAmount: 0,
    paymentMethod: 'cash',
    installationDate: new Date().toISOString().split('T')[0],
    installationTime: '10:00',
    mechanicNotes: '',
    warrantyPeriod: '12',
    includeInstallation: true,
    includeBalancing: true,
    includeAlignment: false
  });

  // Sample products for demo
  const products = [
    { id: 'P001', name: 'Pirelli Diablo Supercorsa', size: '200/60 ZR17', price: 18500, stock: 5, category: 'Tires' },
    { id: 'P002', name: 'Michelin Power GP', size: '120/70 ZR17', price: 12500, stock: 8, category: 'Tires' },
    { id: 'P003', name: 'Continental ContiSportAttack', size: '180/55 ZR17', price: 14200, stock: 3, category: 'Tires' },
    { id: 'P004', name: 'Bridgestone Battlax', size: '160/60 ZR17', price: 13800, stock: 6, category: 'Tires' },
    { id: 'P005', name: 'Metzeler Sportec M9 RR', size: '190/55 ZR17', price: 16500, stock: 4, category: 'Tires' }
  ];

  // Sample services for demo
  const services = [
    { id: 'S001', name: 'Tire Fitting', price: 300, duration: '30 min', category: 'Installation' },
    { id: 'S002', name: 'Wheel Balancing', price: 500, duration: '45 min', category: 'Maintenance' },
    { id: 'S003', name: 'Wheel Alignment', price: 800, duration: '60 min', category: 'Maintenance' },
    { id: 'S004', name: 'Puncture Repair', price: 200, duration: '20 min', category: 'Repair' }
  ];

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.size?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredServices = services.filter(service => 
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (item, type) => {
    const existingItemIndex = cartItems.findIndex(cartItem => 
      cartItem.id === item.id && cartItem.type === type
    );

    if (existingItemIndex !== -1) {
      // Item already exists, update quantity
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += 1;
      setCartItems(updatedCartItems);
    } else {
      // Add new item
      setCartItems([...cartItems, { ...item, quantity: 1, type, fitting: type === 'product' ? true : false }]);
    }
  };

  const removeFromCart = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
  };

  const updateCartItemQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity = newQuantity;
    setCartItems(updatedCartItems);
  };

  // Calculate subtotals and totals
  const productSubtotal = cartItems
    .filter(item => item.type === 'product')
    .reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const serviceCost = cartItems
    .filter(item => item.type === 'service')
    .reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const subtotal = productSubtotal + serviceCost;
  const discountAmount = invoiceSettings.discountAmount || 0;
  const taxRate = 0.18; // 18% GST
  const taxableAmount = subtotal - discountAmount;
  const tax = taxableAmount * taxRate;
  const total = taxableAmount + tax;

  const completeSale = () => {
    // Generate invoice number (normally would come from a database)
    const invoiceNumber = `INV-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
    
    // Format date for invoice
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    
    // Create invoice data
    const invoice = {
      invoiceNumber,
      date: formattedDate,
      customerName: customerInfo.name,
      customerPhone: customerInfo.phone,
      customerAddress: customerInfo.address || 'N/A',
      items: cartItems.map(item => ({ ...item })),
      paymentMethod: invoiceSettings.paymentMethod,
      receiverName: 'Twin Spark Staff' // Default receiver name
    };
    
    // In a real app, we would save this to a database
    console.log('Sale completed:', invoice);
    
    // Set current invoice and show invoice view
    setCurrentInvoice(invoice);
    setShowInvoice(true);
    
    // We don't reset the form immediately so the user can see the invoice
    // The form will be reset when they close the invoice
  };

  const closeInvoice = () => {
    setShowInvoice(false);
    setCurrentInvoice(null);
    resetForm();
  };

  const resetForm = () => {
    setCartItems([]);
    setCustomerInfo({
      name: '',
      phone: '',
      email: '',
      address: '',
      motorcycle: '',
      registrationNumber: ''
    });
    setInvoiceSettings({
      invoiceNumber: `INV-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      discountPercent: 0,
      discountAmount: 0,
      paymentMethod: 'cash',
      installationDate: new Date().toISOString().split('T')[0],
      installationTime: '10:00',
      mechanicNotes: '',
      warrantyPeriod: '12',
      includeInstallation: true,
      includeBalancing: true,
      includeAlignment: false
    });
  };

  return (
    <>
      <div className="h-full flex flex-col bg-gray-50 overflow-hidden">
        {/* Header - Fixed */}
        <div className="bg-white border-b p-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <Bike className="h-6 w-6 mr-2" />
                Twin Spark Billing
              </h1>
              <div className="text-sm text-gray-600 flex items-center">
                <FileText className="h-4 w-4 mr-1" />
                Invoice: {invoiceSettings.invoiceNumber}
              </div>
              <div className="text-sm text-gray-600 flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {new Date().toLocaleDateString('en-IN')}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Scrollable */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Product and Service Selection (smaller) */}
          <div className="w-1/3 bg-gray-50 flex flex-col overflow-hidden">
            <div className="p-2 border-b flex-shrink-0">
              <Tabs defaultValue="products" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 mb-2">
                  <TabsTrigger value="products" className="flex items-center">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Products
                  </TabsTrigger>
                  <TabsTrigger value="services" className="flex items-center">
                    <Wrench className="h-4 w-4 mr-2" />
                    Services
                  </TabsTrigger>
                </TabsList>

                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder={`Search ${activeTab}...`}
                    className="pl-9 mb-2"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <TabsContent value="products" className="m-0">
                  <ScrollArea className="h-[calc(100vh-280px)]">
                    <div className="grid grid-cols-1 gap-2 p-2">
                      {filteredProducts.map(product => (
                        <Card key={product.id} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => addToCart(product, 'product')}>
                          <CardContent className="p-3 flex justify-between items-center">
                            <div>
                              <div className="font-medium">{product.name}</div>
                              <div className="text-sm text-gray-500">{product.size}</div>
                              <div className="flex items-center mt-1">
                                <div className="text-amber-600 font-medium">₹{product.price.toLocaleString()}</div>
                                <div className="text-xs text-gray-500 ml-2">Stock: {product.stock}</div>
                              </div>
                            </div>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-full">
                              <Plus className="h-4 w-4" />
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="services" className="m-0">
                  <ScrollArea className="h-[calc(100vh-280px)]">
                    <div className="grid grid-cols-1 gap-2 p-2">
                      {filteredServices.map(service => (
                        <Card key={service.id} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => addToCart(service, 'service')}>
                          <CardContent className="p-3 flex justify-between items-center">
                            <div>
                              <div className="font-medium">{service.name}</div>
                              <div className="text-xs text-gray-500">{service.category} • {service.duration}</div>
                              <div className="text-amber-600 font-medium mt-1">₹{service.price.toLocaleString()}</div>
                            </div>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-full">
                              <Plus className="h-4 w-4" />
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Right Panel - Cart and Customer Info (larger) */}
          <div className="w-2/3 flex flex-col overflow-hidden border-l">
            {/* Cart Items - Scrollable */}
            <div className="flex-1 overflow-auto">
              <div className="p-4">
                <h2 className="text-lg font-bold mb-4 flex items-center">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Cart Items
                </h2>
                
                {cartItems.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <ShoppingCart className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p>Your cart is empty</p>
                    <p className="text-sm mt-1">Add products or services to get started</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cartItems.map((item, index) => (
                      <div key={`${item.id}-${index}`} className="flex items-center justify-between bg-white p-3 rounded-lg border">
                        <div className="flex-1">
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-gray-500">
                            {item.type === 'product' ? item.size : `${item.category} • ${item.duration}`}
                          </div>
                          {item.type === 'product' && (
                            <div className="flex items-center mt-1">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const updatedItems = [...cartItems];
                                  updatedItems[index] = {
                                    ...updatedItems[index],
                                    fitting: !updatedItems[index].fitting
                                  };
                                  setCartItems(updatedItems);
                                }}
                                className={`flex items-center text-xs px-2 py-1 rounded ${item.fitting ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}
                              >
                                <Settings className="h-3 w-3 mr-1" />
                                Fitting: {item.fitting ? 'Yes' : 'No'}
                              </button>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-7 w-7 p-0 rounded-full"
                              onClick={() => updateCartItemQuantity(index, item.quantity - 1)}
                            >
                              <span>-</span>
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-7 w-7 p-0 rounded-full"
                              onClick={() => updateCartItemQuantity(index, item.quantity + 1)}
                            >
                              <span>+</span>
                            </Button>
                          </div>
                          <div className="w-20 text-right font-medium">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 w-7 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => removeFromCart(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Customer Information */}
              <div className="p-4 border-t">
                <h2 className="text-lg font-bold mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Customer Information
                </h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="customer-name">Customer Name</Label>
                    <div className="flex mt-1">
                      <Input 
                        id="customer-name" 
                        placeholder="Enter customer name" 
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="customer-phone">Phone Number</Label>
                    <div className="flex mt-1">
                      <Input 
                        id="customer-phone" 
                        placeholder="Enter phone number" 
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="customer-email">Email (Optional)</Label>
                    <Input 
                      id="customer-email" 
                      placeholder="Enter email address" 
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="customer-address">Address</Label>
                    <Input 
                      id="customer-address" 
                      placeholder="Enter address" 
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="customer-motorcycle">Motorcycle Model (Optional)</Label>
                    <Input 
                      id="customer-motorcycle" 
                      placeholder="E.g., Yamaha R15" 
                      value={customerInfo.motorcycle}
                      onChange={(e) => setCustomerInfo({...customerInfo, motorcycle: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="customer-reg">Registration Number (Optional)</Label>
                    <Input 
                      id="customer-reg" 
                      placeholder="E.g., TN 01 AB 1234" 
                      value={customerInfo.registrationNumber}
                      onChange={(e) => setCustomerInfo({...customerInfo, registrationNumber: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bill Summary - Fixed at bottom */}
            <div className="border-t bg-white p-4">
              <h2 className="text-lg font-bold mb-3 flex items-center">
                <Calculator className="h-5 w-5 mr-2" />
                Bill Summary
              </h2>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Products Subtotal:</span>
                  <span>₹{productSubtotal.toLocaleString()}</span>
                </div>
                
                {serviceCost > 0 && (
                  <div className="flex justify-between font-medium">
                    <span>Services Subtotal:</span>
                    <span>₹{serviceCost.toLocaleString()}</span>
                  </div>
                )}
                
                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount:</span>
                    <span>-₹{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="font-medium">GST (18%):</span>
                  <span className="font-semibold text-gray-700">₹{tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-xl border-t border-amber-300 pt-3 mt-2 text-amber-800">
                  <span>TOTAL:</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>
              
              {/* Payment Methods */}
              <div className="mt-4">
                <Label className="text-sm font-medium mb-2 block">Payment Method</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button 
                    variant={invoiceSettings.paymentMethod === 'cash' ? 'default' : 'outline'} 
                    className="text-xs flex items-center justify-center"
                    onClick={() => setInvoiceSettings({...invoiceSettings, paymentMethod: 'cash'})}
                  >
                    <DollarSign className="h-3 w-3 mr-1" />
                    Cash
                  </Button>
                  <Button 
                    variant={invoiceSettings.paymentMethod === 'card' ? 'default' : 'outline'} 
                    className="text-xs flex items-center justify-center"
                    onClick={() => setInvoiceSettings({...invoiceSettings, paymentMethod: 'card'})}
                  >
                    <CreditCard className="h-3 w-3 mr-1" />
                    Card
                  </Button>
                  <Button 
                    variant={invoiceSettings.paymentMethod === 'upi' ? 'default' : 'outline'} 
                    className="text-xs flex items-center justify-center"
                    onClick={() => setInvoiceSettings({...invoiceSettings, paymentMethod: 'upi'})}
                  >
                    <Smartphone className="h-3 w-3 mr-1" />
                    UPI
                  </Button>
                </div>
              </div>

              {/* Warranty Information */}
              <div className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-200">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-700">Warranty Information</h4>
                    <p className="text-xs text-blue-600 mt-1">
                      All tires come with a {invoiceSettings.warrantyPeriod}-month warranty against manufacturing defects.
                      {invoiceSettings.includeInstallation && " Installation service includes a 1-month workmanship guarantee."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Complete Sale Button */}
              <Button 
                className="w-full mt-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold text-lg flex items-center justify-center shadow-md hover:shadow-lg transition-all rounded-md"
                onClick={completeSale}
                disabled={cartItems.length === 0 || !customerInfo.name || !customerInfo.phone}
              >
                <CheckCircle className="h-5 w-5 mr-2" />
                Complete Sale - ₹{total.toLocaleString()}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Modal */}
      {showInvoice && currentInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-auto">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-auto">
            <div className="p-4 bg-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold">Bill NO: {currentInvoice.invoiceNumber}</h2>
              <Button 
                variant="ghost" 
                onClick={closeInvoice}
                className="text-gray-500 hover:text-gray-700"
              >
                Close
              </Button>
            </div>
            <Invoice 
              invoiceNumber={currentInvoice.invoiceNumber}
              date={currentInvoice.date}
              customerName={currentInvoice.customerName}
              customerPhone={currentInvoice.customerPhone}
              customerAddress={currentInvoice.customerAddress}
              items={currentInvoice.items}
              paymentMethod={currentInvoice.paymentMethod}
              receiverName={currentInvoice.receiverName}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Billing;
