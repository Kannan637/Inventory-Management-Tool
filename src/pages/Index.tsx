
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';
import Inventory from '../components/Inventory';
import Billing from '../components/Billing';
import Customers from '../components/Customers';
import Reports from '../components/Reports';
import Settings from '../components/Settings';
import PurchaseOrders from '../components/PurchaseOrders';
import Barcode from '../components/Barcode';
import SalesHistory from '../components/SalesHistory';
import Backup from '../components/Backup';

const Index = () => {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sticky Sidebar */}
      <div className="flex-shrink-0">
        <Sidebar />
      </div>
      
      {/* Scrollable Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/purchase-orders" element={<PurchaseOrders />} />
            <Route path="/barcode" element={<Barcode />} />
            <Route path="/sales-history" element={<SalesHistory />} />
            <Route path="/backup" element={<Backup />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Index;
