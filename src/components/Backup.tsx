
import React, { useState } from 'react';
import { Download, Upload, Database, Shield, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Backup = () => {
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);

  const backupHistory = [
    {
      id: 1,
      date: '2024-01-15',
      time: '09:30 AM',
      type: 'Auto Backup',
      size: '2.4 MB',
      status: 'Success'
    },
    {
      id: 2,
      date: '2024-01-14',
      time: '09:30 AM',
      type: 'Auto Backup',
      size: '2.3 MB',
      status: 'Success'
    },
    {
      id: 3,
      date: '2024-01-13',
      time: '03:15 PM',
      type: 'Manual Backup',
      size: '2.2 MB',
      status: 'Success'
    },
    {
      id: 4,
      date: '2024-01-12',
      time: '09:30 AM',
      type: 'Auto Backup',
      size: '2.1 MB',
      status: 'Failed'
    }
  ];

  const handleBackup = async () => {
    setIsBackingUp(true);
    // Simulate backup process
    setTimeout(() => {
      setIsBackingUp(false);
      console.log('Backup completed');
    }, 3000);
  };

  const handleRestore = async () => {
    setIsRestoring(true);
    // Simulate restore process
    setTimeout(() => {
      setIsRestoring(false);
      console.log('Restore completed');
    }, 3000);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Failed':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Success':
        return 'bg-green-100 text-green-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Backup & Restore</h1>
        <div className="flex space-x-2">
          <Button 
            onClick={handleBackup}
            disabled={isBackingUp}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Download className="h-4 w-4 mr-2" />
            {isBackingUp ? 'Creating Backup...' : 'Create Backup'}
          </Button>
        </div>
      </div>

      {/* Backup Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Download className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Create Backup</h3>
                <p className="text-sm text-gray-600 mt-1">Export all your data to a secure backup file</p>
              </div>
              <Button 
                onClick={handleBackup}
                disabled={isBackingUp}
                className="w-full"
                variant="outline"
              >
                {isBackingUp ? 'Creating...' : 'Backup Now'}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Upload className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Restore Data</h3>
                <p className="text-sm text-gray-600 mt-1">Import data from a previous backup file</p>
              </div>
              <Button 
                onClick={handleRestore}
                disabled={isRestoring}
                className="w-full"
                variant="outline"
              >
                {isRestoring ? 'Restoring...' : 'Restore'}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Auto Backup</h3>
                <p className="text-sm text-gray-600 mt-1">Automatically backup data daily at 9:30 AM</p>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-sm text-gray-600">Enabled</span>
                <div className="w-8 h-4 bg-green-500 rounded-full relative">
                  <div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Backup Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Database className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">45</p>
                <p className="text-sm text-gray-600">Total Backups</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">43</p>
                <p className="text-sm text-gray-600">Successful</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">2.4 MB</p>
                <p className="text-sm text-gray-600">Latest Size</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">30 days</p>
                <p className="text-sm text-gray-600">Retention</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Backup History */}
      <Card>
        <CardHeader>
          <CardTitle>Backup History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Time</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Type</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">Size</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {backupHistory.map((backup) => (
                  <tr key={backup.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-900">{backup.date}</td>
                    <td className="py-3 px-4 text-gray-600">{backup.time}</td>
                    <td className="py-3 px-4 text-gray-600">{backup.type}</td>
                    <td className="py-3 px-4 text-right text-gray-600">{backup.size}</td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center space-x-1">
                        {getStatusIcon(backup.status)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(backup.status)}`}>
                          {backup.status}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <Button variant="ghost" size="sm">
                          <Download className="h-3 w-3" />
                        </Button>
                        {backup.status === 'Success' && (
                          <Button variant="ghost" size="sm">
                            <Upload className="h-3 w-3" />
                          </Button>
                        )}
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

export default Backup;
