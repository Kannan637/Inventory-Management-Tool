import React from 'react';
import TwinSparkLogo from '../assect/IMG_3051.PNG';

interface InvoiceProps {
  invoiceNumber: string;
  date: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: Array<{
    id: string;
    name: string;
    size?: string;
    price: number;
    quantity: number;
    fitting?: boolean;
  }>;
  paymentMethod: 'cash' | 'card' | 'upi';
  receiverName: string;
}

const Invoice: React.FC<InvoiceProps> = ({
  invoiceNumber,
  date,
  customerName,
  customerPhone,
  customerAddress,
  items,
  paymentMethod,
  receiverName
}) => {
  // Calculate totals
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="bg-white p-6 max-w-[210mm] mx-auto" id="printable-invoice">
      {/* Header */}
      <div className="border border-gray-800 p-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <img src={TwinSparkLogo} alt="Twin Spark Logo" className="h-20 w-20 mr-4" />
            <div>
              <h1 className="text-3xl font-bold tracking-wider">TWINSPARK</h1>
              <p className="text-sm">Two & Four Wheelers Tyres (Whole Sale & Retail)</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm">9361017105</p>
            <p className="text-sm">7418847085</p>
          </div>
        </div>
        
        <p className="text-sm">Shop Address: No.1A, FCI Road, BPC Colony, Peelamedu, Coimbatore 641 006.</p>
      </div>

      {/* Invoice Details */}
      <div className="border-l border-r border-b border-gray-800 p-4 flex justify-between">
        <div>
          <p><span className="font-medium">Bill NO:</span> {invoiceNumber}</p>
        </div>
        <div className="text-center">
          <p className="font-bold underline">INVOICE</p>
        </div>
        <div className="text-right">
          <p><span className="font-medium">Date:</span> {date}</p>
          <p><span className="font-medium">Place:</span> Coimbatore</p>
        </div>
      </div>

      {/* Customer Information */}
      <div className="border-l border-r border-b border-gray-800 p-4">
        <p className="font-medium">To</p>
        <p>
          <span className="font-medium">Customer Name:</span> 
          <span className="ml-2 border-b border-dotted border-gray-400 inline-block w-4/5">{customerName}</span>
        </p>
        <p>
          <span className="font-medium">Phone Number:</span> 
          <span className="ml-2 border-b border-dotted border-gray-400 inline-block w-4/5">{customerPhone}</span>
        </p>
        <p>
          <span className="font-medium">Address:</span> 
          <span className="ml-2 border-b border-dotted border-gray-400 inline-block w-4/5">{customerAddress}</span>
        </p>
      </div>

      {/* Product Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border border-gray-800 p-2 text-left w-16">S.NO</th>
            <th className="border border-gray-800 p-2 text-left">TYRE SIZE</th>
            <th className="border border-gray-800 p-2 text-left w-24">QUANTITY</th>
            <th className="border border-gray-800 p-2 text-left w-24">FITTING</th>
            <th className="border border-gray-800 p-2 text-left w-24">PRICE</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item.id}>
              <td className="border border-gray-800 p-2">{index + 1}</td>
              <td className="border border-gray-800 p-2">{item.name} {item.size ? `(${item.size})` : ''}</td>
              <td className="border border-gray-800 p-2">{item.quantity}</td>
              <td className="border border-gray-800 p-2">{item.fitting ? 'Yes' : 'No'}</td>
              <td className="border border-gray-800 p-2">₹{(item.price * item.quantity).toLocaleString()}</td>
            </tr>
          ))}
          {/* Empty rows to fill space */}
          {Array.from({ length: Math.max(5 - items.length, 0) }).map((_, index) => (
            <tr key={`empty-${index}`}>
              <td className="border border-gray-800 p-2">&nbsp;</td>
              <td className="border border-gray-800 p-2">&nbsp;</td>
              <td className="border border-gray-800 p-2">&nbsp;</td>
              <td className="border border-gray-800 p-2">&nbsp;</td>
              <td className="border border-gray-800 p-2">&nbsp;</td>
            </tr>
          ))}
          <tr>
            <td colSpan={4} className="border border-gray-800 p-2 text-right font-bold">TOTAL</td>
            <td className="border border-gray-800 p-2 font-bold">₹{total.toLocaleString()}</td>
          </tr>
        </tbody>
      </table>

      {/* Payment Information */}
      <div className="flex border-l border-r border-b border-gray-800">
        <div className="w-2/3 p-4 border-r border-gray-800">
          <p className="font-medium mb-4">Payment Received By</p>
          
          <div className="mb-3">
            <span className="inline-block w-32">Online Mode</span>
            <span className="inline-block mx-4">
              <span className="inline-block border border-gray-800 w-5 h-5 mr-1">
                {(paymentMethod === 'card' || paymentMethod === 'upi') && '✓'}
              </span> Yes
            </span>
            <span className="inline-block">
              <span className="inline-block border border-gray-800 w-5 h-5 mr-1">
                {(paymentMethod !== 'card' && paymentMethod !== 'upi') && '✓'}
              </span> No
            </span>
          </div>
          
          <div className="mb-3">
            <span className="inline-block w-32">Cash Mode</span>
            <span className="inline-block mx-4">
              <span className="inline-block border border-gray-800 w-5 h-5 mr-1">
                {paymentMethod === 'cash' && '✓'}
              </span> Yes
            </span>
            <span className="inline-block">
              <span className="inline-block border border-gray-800 w-5 h-5 mr-1">
                {paymentMethod !== 'cash' && '✓'}
              </span> No
            </span>
          </div>
          
          <p className="mt-6">
            <span className="font-medium">Receiver Name:</span> {receiverName}
          </p>
        </div>
        
        <div className="w-1/3 p-4 flex flex-col justify-between">
          <p className="text-center font-medium">For TWINSPARK</p>
          <p className="text-center mt-16">Signature</p>
        </div>
      </div>

      {/* Print button - only visible on screen, not when printing */}
      <div className="mt-6 text-center print:hidden">
        <p className="text-sm text-gray-600 mb-2">This invoice is formatted for A4 paper size</p>
        <button 
          onClick={() => window.print()} 
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-bold shadow-md flex items-center justify-center mx-auto"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Print A4 Invoice
        </button>
      </div>
    </div>
  );
};

export default Invoice;
