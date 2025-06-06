
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
// Import the Twin Spark logo
import TwinSparkLogo from '../assect/IMG_3051.PNG';
import { 
  Home, 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Settings,
  Menu,
  X,
  Truck,
  Scan,
  History,
  Database
} from 'lucide-react';

const Sidebar = () => {
  // Removed collapsible functionality
  const isCollapsed = false;
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Package, label: 'Inventory', path: '/inventory' },
    { icon: ShoppingCart, label: 'Billing', path: '/billing' },
    { icon: Users, label: 'Customers', path: '/customers' },
    { icon: Truck, label: 'Purchase Orders', path: '/purchase-orders' },
    { icon: Scan, label: 'Barcode', path: '/barcode' },
    { icon: History, label: 'Sales History', path: '/sales-history' },
    { icon: BarChart3, label: 'Reports', path: '/reports' },
    { icon: Database, label: 'Backup', path: '/backup' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-64'} h-screen bg-white shadow-lg transition-all duration-300 flex flex-col border-r border-gray-200`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center justify-center">
          <div className="flex items-center">
            <img 
              src={TwinSparkLogo} 
              alt="Twin Spark Logo" 
              className="h-16 w-16 mr-3" 
            />
            <div>
              <h1 className="text-xl font-bold text-gray-800">Twin Spark</h1>
              <p className="text-sm text-gray-300">Tire Dealer & Repair Shop</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation - Scrollable */}
      <nav className="flex-1 py-6 overflow-y-auto">
        <ul className="space-y-2 px-3">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`flex items-center px-3 py-3 rounded-lg transition-colors group ${
                    isActive(item.path)
                      ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon 
                    size={20} 
                    className={`${isCollapsed ? 'mx-auto' : 'mr-3'} ${
                      isActive(item.path) ? 'text-blue-600' : 'text-gray-500'
                    }`} 
                  />
                  {!isCollapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 flex-shrink-0">
        {!isCollapsed && (
          <div className="text-center">
            <p className="text-xs text-gray-500">© 2025 Twin Spark</p>
            <p className="text-xs text-gray-400">Version 1.0.0</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
