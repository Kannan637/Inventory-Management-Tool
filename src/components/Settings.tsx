
import React, { useState } from 'react';
import { Save, User, Store, Printer, Database, Shield, Bell, Upload, Users, Lock, Globe, Palette, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';

const Settings = () => {
  const [settings, setSettings] = useState({
    // Business Information
    businessName: 'BillMaster Pro Store',
    ownerName: 'John Doe',
    address: '123 Business Street, City, State, PIN',
    phone: '+91 9876543210',
    email: 'business@example.com',
    gstNumber: '22AAAAA0000A1Z5',
    website: 'www.billmasterpro.com',
    
    // Financial Settings
    taxRate: 18,
    currency: 'INR',
    discountLimit: 20,
    creditLimit: 50000,
    
    // Invoice Settings
    invoicePrefix: 'INV',
    invoiceStartNumber: 1001,
    showCompanyLogo: true,
    showTermsConditions: true,
    termsConditions: 'Payment due within 30 days. Late payments subject to 2% monthly service charge.',
    footerText: 'Thank you for your business!',
    
    // System Preferences
    autoBackup: true,
    emailNotifications: true,
    lowStockAlerts: true,
    thermalPrinter: false,
    soundAlerts: true,
    darkMode: false,
    language: 'English',
    timezone: 'Asia/Kolkata',
    
    // Security Settings
    enableTwoFactor: false,
    passwordExpiry: 90,
    sessionTimeout: 30,
    enableAuditLog: true,
    
    // Receipt Settings
    receiptWidth: '80mm',
    showItemCode: true,
    showItemImage: false,
    printCustomerDetails: true
  });

  const [users] = useState([
    { id: 1, name: 'Admin User', email: 'admin@store.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Cashier 1', email: 'cashier1@store.com', role: 'Cashier', status: 'Active' },
    { id: 3, name: 'Manager', email: 'manager@store.com', role: 'Manager', status: 'Inactive' }
  ]);

  const handleSave = () => {
    console.log('Settings saved:', settings);
    // Here you would save to your database/local storage
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('Logo uploaded:', file.name);
      // Handle logo upload logic here
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          <Save className="h-4 w-4 mr-2" />
          Save All Changes
        </Button>
      </div>

      <Tabs defaultValue="business" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="invoice">Invoice</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
        </TabsList>

        {/* Business Settings */}
        <TabsContent value="business">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Store className="h-5 w-5" />
                  <span>Business Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>Business Name</Label>
                    <Input
                      value={settings.businessName}
                      onChange={(e) => setSettings({...settings, businessName: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Owner Name</Label>
                    <Input
                      value={settings.ownerName}
                      onChange={(e) => setSettings({...settings, ownerName: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Business Address</Label>
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows={3}
                      value={settings.address}
                      onChange={(e) => setSettings({...settings, address: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Phone Number</Label>
                    <Input
                      value={settings.phone}
                      onChange={(e) => setSettings({...settings, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Email Address</Label>
                    <Input
                      type="email"
                      value={settings.email}
                      onChange={(e) => setSettings({...settings, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Website</Label>
                    <Input
                      value={settings.website}
                      onChange={(e) => setSettings({...settings, website: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>GST Number</Label>
                    <Input
                      value={settings.gstNumber}
                      onChange={(e) => setSettings({...settings, gstNumber: e.target.value})}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="h-5 w-5" />
                  <span>Company Logo</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-2">
                      <Label htmlFor="logo-upload" className="cursor-pointer">
                        <span className="text-blue-600 hover:text-blue-500">Upload company logo</span>
                        <input
                          id="logo-upload"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleLogoUpload}
                        />
                      </Label>
                    </div>
                    <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Show logo on invoices</p>
                      <p className="text-sm text-gray-600">Display company logo on all invoices</p>
                    </div>
                    <Switch
                      checked={settings.showCompanyLogo}
                      onCheckedChange={(checked) => setSettings({...settings, showCompanyLogo: checked})}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Invoice Settings */}
        <TabsContent value="invoice">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Invoice Configuration</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>Invoice Prefix</Label>
                    <Input
                      value={settings.invoicePrefix}
                      onChange={(e) => setSettings({...settings, invoicePrefix: e.target.value})}
                      placeholder="INV"
                    />
                  </div>
                  <div>
                    <Label>Starting Invoice Number</Label>
                    <Input
                      type="number"
                      value={settings.invoiceStartNumber}
                      onChange={(e) => setSettings({...settings, invoiceStartNumber: parseInt(e.target.value)})}
                    />
                  </div>
                  <div>
                    <Label>Default Tax Rate (%)</Label>
                    <Input
                      type="number"
                      value={settings.taxRate}
                      onChange={(e) => setSettings({...settings, taxRate: parseFloat(e.target.value)})}
                    />
                  </div>
                  <div>
                    <Label>Currency</Label>
                    <Input
                      value={settings.currency}
                      onChange={(e) => setSettings({...settings, currency: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Maximum Discount Limit (%)</Label>
                    <Input
                      type="number"
                      value={settings.discountLimit}
                      onChange={(e) => setSettings({...settings, discountLimit: parseFloat(e.target.value)})}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Palette className="h-5 w-5" />
                  <span>Invoice Customization</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>Terms & Conditions</Label>
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows={3}
                      value={settings.termsConditions}
                      onChange={(e) => setSettings({...settings, termsConditions: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Footer Text</Label>
                    <Input
                      value={settings.footerText}
                      onChange={(e) => setSettings({...settings, footerText: e.target.value})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Show Terms & Conditions</p>
                      <p className="text-sm text-gray-600">Include T&C on invoices</p>
                    </div>
                    <Switch
                      checked={settings.showTermsConditions}
                      onCheckedChange={(checked) => setSettings({...settings, showTermsConditions: checked})}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* User Management */}
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>User Management</span>
                </div>
                <Button className="bg-green-600 hover:bg-green-700">
                  <User className="h-4 w-4 mr-2" />
                  Add New User
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Role</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                        <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                        <td className="border border-gray-300 px-4 py-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            user.role === 'Admin' ? 'bg-red-100 text-red-800' :
                            user.role === 'Manager' ? 'bg-blue-100 text-blue-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="outline" size="sm">Delete</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Preferences */}
        <TabsContent value="system">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5" />
                  <span>Notifications & Alerts</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-gray-600">Receive email alerts for important events</p>
                    </div>
                    <Switch
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Low Stock Alerts</p>
                      <p className="text-sm text-gray-600">Get notified when products are running low</p>
                    </div>
                    <Switch
                      checked={settings.lowStockAlerts}
                      onCheckedChange={(checked) => setSettings({...settings, lowStockAlerts: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Sound Alerts</p>
                      <p className="text-sm text-gray-600">Play sound notifications</p>
                    </div>
                    <Switch
                      checked={settings.soundAlerts}
                      onCheckedChange={(checked) => setSettings({...settings, soundAlerts: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Dark Mode</p>
                      <p className="text-sm text-gray-600">Use dark theme</p>
                    </div>
                    <Switch
                      checked={settings.darkMode}
                      onCheckedChange={(checked) => setSettings({...settings, darkMode: checked})}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Printer className="h-5 w-5" />
                  <span>Hardware & Printing</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Thermal Printer</p>
                      <p className="text-sm text-gray-600">Enable thermal printer for receipts</p>
                    </div>
                    <Switch
                      checked={settings.thermalPrinter}
                      onCheckedChange={(checked) => setSettings({...settings, thermalPrinter: checked})}
                    />
                  </div>

                  <div>
                    <Label>Receipt Width</Label>
                    <select 
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={settings.receiptWidth}
                      onChange={(e) => setSettings({...settings, receiptWidth: e.target.value})}
                    >
                      <option value="58mm">58mm</option>
                      <option value="80mm">80mm</option>
                      <option value="A4">A4</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Show Item Code</p>
                      <p className="text-sm text-gray-600">Display item codes on receipts</p>
                    </div>
                    <Switch
                      checked={settings.showItemCode}
                      onCheckedChange={(checked) => setSettings({...settings, showItemCode: checked})}
                    />
                  </div>

                  <div>
                    <Button variant="outline" className="w-full">
                      <Printer className="h-4 w-4 mr-2" />
                      Test Print
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Security Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-600">Add extra security to your account</p>
                    </div>
                    <Switch
                      checked={settings.enableTwoFactor}
                      onCheckedChange={(checked) => setSettings({...settings, enableTwoFactor: checked})}
                    />
                  </div>

                  <div>
                    <Label>Password Expiry (days)</Label>
                    <Input
                      type="number"
                      value={settings.passwordExpiry}
                      onChange={(e) => setSettings({...settings, passwordExpiry: parseInt(e.target.value)})}
                    />
                  </div>

                  <div>
                    <Label>Session Timeout (minutes)</Label>
                    <Input
                      type="number"
                      value={settings.sessionTimeout}
                      onChange={(e) => setSettings({...settings, sessionTimeout: parseInt(e.target.value)})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Enable Audit Log</p>
                      <p className="text-sm text-gray-600">Track all user activities</p>
                    </div>
                    <Switch
                      checked={settings.enableAuditLog}
                      onCheckedChange={(checked) => setSettings({...settings, enableAuditLog: checked})}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lock className="h-5 w-5" />
                  <span>Access Control</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>Credit Limit (₹)</Label>
                    <Input
                      type="number"
                      value={settings.creditLimit}
                      onChange={(e) => setSettings({...settings, creditLimit: parseFloat(e.target.value)})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Button variant="outline" className="w-full">
                      Change Admin Password
                    </Button>
                    <Button variant="outline" className="w-full">
                      Reset All User Passwords
                    </Button>
                    <Button variant="outline" className="w-full text-red-600 hover:text-red-700">
                      View Security Logs
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Backup Settings */}
        <TabsContent value="backup">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5" />
                <span>Data Management & Backup</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Auto Backup</p>
                    <p className="text-sm text-gray-600">Automatically backup data daily</p>
                  </div>
                  <Switch
                    checked={settings.autoBackup}
                    onCheckedChange={(checked) => setSettings({...settings, autoBackup: checked})}
                  />
                </div>

                <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                  <Database className="h-6 w-6 mb-2" />
                  <span>Manual Backup</span>
                </Button>
                
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                  <Shield className="h-6 w-6 mb-2" />
                  <span>Restore Data</span>
                </Button>
                
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                  <Upload className="h-6 w-6 mb-2" />
                  <span>Import Data</span>
                </Button>

                <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                  <Globe className="h-6 w-6 mb-2" />
                  <span>Cloud Sync</span>
                </Button>
                
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center text-red-600 hover:text-red-700">
                  <Database className="h-6 w-6 mb-2" />
                  <span>Clear All Data</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
