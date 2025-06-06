
import React, { useState } from 'react';
import { Calendar, Download, TrendingUp, DollarSign, Package, Users, Filter, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const Reports = () => {
  const [dateRange, setDateRange] = useState('7days');
  const [selectedPeriod, setSelectedPeriod] = useState('daily');

  const reportTypes = [
    {
      title: 'Sales Report',
      description: 'Detailed sales analytics and trends',
      icon: TrendingUp,
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      title: 'Inventory Report',
      description: 'Stock levels and product movement',
      icon: Package,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      title: 'Customer Report',
      description: 'Customer purchase behavior and analytics',
      icon: Users,
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    {
      title: 'P&L Report',
      description: 'Profit, loss, and financial summary',
      icon: DollarSign,
      color: 'text-orange-600',
      bg: 'bg-orange-50'
    }
  ];

  // Daily P&L Data (Last 7 days)
  const dailyPLData = [
    { date: '2024-01-15', sales: 25400, cost: 18200, profit: 7200, loss: 0 },
    { date: '2024-01-14', sales: 18200, cost: 13500, profit: 4700, loss: 0 },
    { date: '2024-01-13', sales: 32100, cost: 22800, profit: 9300, loss: 0 },
    { date: '2024-01-12', sales: 28900, cost: 20100, profit: 8800, loss: 0 },
    { date: '2024-01-11', sales: 21500, cost: 16200, profit: 5300, loss: 0 },
    { date: '2024-01-10', sales: 15600, cost: 12400, profit: 3200, loss: 0 },
    { date: '2024-01-09', sales: 19800, cost: 14900, profit: 4900, loss: 0 }
  ];

  // Weekly P&L Data (Last 8 weeks)
  const weeklyPLData = [
    { week: 'Week 1', sales: 156000, cost: 112000, profit: 44000, loss: 0 },
    { week: 'Week 2', sales: 142000, cost: 98000, profit: 44000, loss: 0 },
    { week: 'Week 3', sales: 178000, cost: 125000, profit: 53000, loss: 0 },
    { week: 'Week 4', sales: 134000, cost: 96000, profit: 38000, loss: 0 },
    { week: 'Week 5', sales: 167000, cost: 118000, profit: 49000, loss: 0 },
    { week: 'Week 6', sales: 145000, cost: 103000, profit: 42000, loss: 0 },
    { week: 'Week 7', sales: 189000, cost: 132000, profit: 57000, loss: 0 },
    { week: 'Week 8', sales: 172000, cost: 121000, profit: 51000, loss: 0 }
  ];

  // Monthly P&L Data (Last 12 months)
  const monthlyPLData = [
    { month: 'Jan 2024', sales: 485200, cost: 342000, profit: 143200, loss: 0 },
    { month: 'Dec 2023', sales: 456000, cost: 318000, profit: 138000, loss: 0 },
    { month: 'Nov 2023', sales: 423000, cost: 296000, profit: 127000, loss: 0 },
    { month: 'Oct 2023', sales: 467000, cost: 327000, profit: 140000, loss: 0 },
    { month: 'Sep 2023', sales: 398000, cost: 279000, profit: 119000, loss: 0 },
    { month: 'Aug 2023', sales: 512000, cost: 358000, profit: 154000, loss: 0 },
    { month: 'Jul 2023', sales: 445000, cost: 312000, profit: 133000, loss: 0 },
    { month: 'Jun 2023', sales: 389000, cost: 272000, profit: 117000, loss: 0 },
    { month: 'May 2023', sales: 434000, cost: 304000, profit: 130000, loss: 0 },
    { month: 'Apr 2023', sales: 378000, cost: 265000, profit: 113000, loss: 0 },
    { month: 'Mar 2023', sales: 456000, cost: 319000, profit: 137000, loss: 0 },
    { month: 'Feb 2023', sales: 412000, cost: 288000, profit: 124000, loss: 0 }
  ];

  const salesData = [
    { date: '2024-01-15', sales: 25400, orders: 12 },
    { date: '2024-01-14', sales: 18200, orders: 8 },
    { date: '2024-01-13', sales: 32100, orders: 15 },
    { date: '2024-01-12', sales: 28900, orders: 11 },
    { date: '2024-01-11', sales: 21500, orders: 9 },
  ];

  const topProducts = [
    { name: 'Pirelli Diablo Supercorsa SP V3', sold: 42, revenue: 797958, size: '200/60 ZR17' },
    { name: 'Michelin Power GP', sold: 38, revenue: 493962, size: '190/55 ZR17' },
    { name: 'Dunlop SportSmart TT', sold: 31, revenue: 526969, size: '120/70 ZR17' },
    { name: 'Bridgestone Battlax Hypersport S22', sold: 29, revenue: 434971, size: '180/55 ZR17' },
    { name: 'Metzeler M9RR Sportec', sold: 25, revenue: 399975, size: '200/55 ZR17' },
  ];

  const getCurrentData = () => {
    switch (selectedPeriod) {
      case 'weekly': return weeklyPLData;
      case 'monthly': return monthlyPLData;
      default: return dailyPLData;
    }
  };

  const getPeriodLabel = () => {
    switch (selectedPeriod) {
      case 'weekly': return 'week';
      case 'monthly': return 'month';
      default: return 'date';
    }
  };

  const chartConfig = {
    sales: { label: 'Sales', color: '#3b82f6' },
    cost: { label: 'Cost', color: '#ef4444' },
    profit: { label: 'Profit', color: '#22c55e' }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
        </div>
      </div>

      {/* Report Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reportTypes.map((report, index) => {
          const Icon = report.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-full ${report.bg}`}>
                    <Icon className={`h-6 w-6 ${report.color}`} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{report.title}</h3>
                    <p className="text-sm text-gray-600">{report.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Profit & Loss Analysis */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-green-600" />
              <span>Profit & Loss Analysis</span>
            </CardTitle>
            <div className="flex space-x-2">
              <Button
                variant={selectedPeriod === 'daily' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedPeriod('daily')}
              >
                Daily
              </Button>
              <Button
                variant={selectedPeriod === 'weekly' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedPeriod('weekly')}
              >
                Weekly
              </Button>
              <Button
                variant={selectedPeriod === 'monthly' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedPeriod('monthly')}
              >
                Monthly
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={getCurrentData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={getPeriodLabel()} />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="sales" fill="#3b82f6" name="Sales" />
                <Bar dataKey="cost" fill="#ef4444" name="Cost" />
                <Bar dataKey="profit" fill="#22c55e" name="Profit" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* P&L Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Sales</p>
                <p className="text-2xl font-bold text-blue-600">₹4,85,200</p>
                <p className="text-sm text-green-600">+15.3% from last period</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Cost</p>
                <p className="text-2xl font-bold text-red-600">₹3,42,000</p>
                <p className="text-sm text-red-600">+8.1% from last period</p>
              </div>
              <Package className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Gross Profit</p>
                <p className="text-2xl font-bold text-green-600">₹1,43,200</p>
                <p className="text-sm text-green-600">+29.5% from last period</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Profit Margin</p>
                <p className="text-2xl font-bold text-purple-600">29.5%</p>
                <p className="text-sm text-green-600">+2.1% from last period</p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Sales Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Sales Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {salesData.map((day, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{day.date}</p>
                    <p className="text-sm text-gray-600">{day.orders} orders</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">₹{day.sales.toLocaleString()}</p>
                    <p className="text-sm text-green-600">+12.5%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.size} • {product.sold} units sold</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">₹{product.revenue.toLocaleString()}</p>
                    <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(product.sold / 50) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed P&L Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed {selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)} P&L Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Period</th>
                  <th className="text-right p-2">Sales (₹)</th>
                  <th className="text-right p-2">Cost (₹)</th>
                  <th className="text-right p-2">Profit (₹)</th>
                  <th className="text-right p-2">Margin (%)</th>
                </tr>
              </thead>
              <tbody>
                {getCurrentData().map((item, index) => {
                  const periodKey = getPeriodLabel();
                  const margin = ((item.profit / item.sales) * 100).toFixed(1);
                  return (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-2 font-medium">{item[periodKey]}</td>
                      <td className="text-right p-2">₹{item.sales.toLocaleString()}</td>
                      <td className="text-right p-2">₹{item.cost.toLocaleString()}</td>
                      <td className="text-right p-2 text-green-600">₹{item.profit.toLocaleString()}</td>
                      <td className="text-right p-2 text-blue-600">{margin}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
