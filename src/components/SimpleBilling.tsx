import React, { useState } from 'react';
import { Bike, FileText, Calendar, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Invoice from './Invoice';
import '../styles/print.css';

const SimpleBilling = () => {
  const [showInvoice, setShowInvoice] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState(null);
  
  // Sample invoice data
  const sampleInvoice = {
    invoiceNumber: 'INV-2025-001',
    date: new Date().toLocaleDateString('en-IN'),
    customerName: 'Rahul Sharma',
    customerPhone: '9876543210',
    customerAddress: 'Coimbatore, Tamil Nadu',
    items: [
      {
        id: '1',
        name: 'Pirelli Diablo Supercorsa',
        size: '200/60 ZR17',
        price: 18500,
        quantity: 1,
        fitting: true
      },
      {
        id: '2',
        name: 'Michelin Power GP',
        size: '120/70 ZR17',
        price: 12500,
        quantity: 1,
        fitting: true
      }
    ],
    paymentMethod: 'cash',
    receiverName: 'Twin Spark Staff'
  };

  const completeSale = () => {
    setCurrentInvoice(sampleInvoice);
    setShowInvoice(true);
  };

  const closeInvoice = () => {
    setShowInvoice(false);
    setCurrentInvoice(null);
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b p-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <Bike className="h-6 w-6 mr-2" />
              Twin Spark Billing
            </h1>
            <div className="text-sm text-gray-600 flex items-center">
              <FileText className="h-4 w-4 mr-1" />
              Invoice: {sampleInvoice.invoiceNumber}
            </div>
            <div className="text-sm text-gray-600 flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {new Date().toLocaleDateString('en-IN')}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex justify-center items-center p-8">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-6 text-center">Demo Invoice Generator</h2>
          <p className="mb-6 text-gray-600">
            Click the button below to generate a sample invoice that matches the Twin Spark invoice style.
          </p>
          <Button 
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold text-lg flex items-center justify-center shadow-md hover:shadow-lg transition-all rounded-md"
            onClick={completeSale}
          >
            <CheckCircle className="h-5 w-5 mr-2" />
            Generate Sample Invoice
          </Button>
        </div>
      </div>

      {/* Invoice Modal */}
      {showInvoice && currentInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-auto">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-auto">
            <div className="p-4 bg-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold">Invoice #{currentInvoice.invoiceNumber}</h2>
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
    </div>
  );
};

export default SimpleBilling;
