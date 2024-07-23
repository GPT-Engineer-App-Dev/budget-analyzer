import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ArrowUpRight, ArrowDownRight, DollarSign, Users, ShoppingCart, TrendingUp, Menu, Home, PieChart, Settings, HelpCircle } from 'lucide-react';

const generateData = () => [...Array(12)].map((_, i) => ({
  month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
  revenue: Math.floor(Math.random() * 5000) + 1000
}));

const MetricCard = ({ title, value, change, icon: Icon }) => (
  <Card className="flex-1">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <h3 className="text-sm font-medium">{title}</h3>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className={`text-xs ${change >= 0 ? 'text-green-500' : 'text-red-500'} flex items-center`}>
        {change >= 0 ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
        {Math.abs(change)}%
      </p>
    </CardContent>
  </Card>
);

const Navbar = ({ onMenuClick }) => (
  <nav className="bg-white shadow-md">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center">
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" onClick={onMenuClick}>
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <span className="font-bold text-xl ml-4">FinDash</span>
        </div>
        <div className="flex items-center">
          <Button variant="ghost" size="sm">Sign Out</Button>
        </div>
      </div>
    </div>
  </nav>
);

const SideSheet = () => (
  <SheetContent side="left" className="w-[250px] sm:w-[300px]">
    <nav className="flex flex-col h-full">
      <div className="py-4">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Menu</h2>
        <div className="space-y-1">
          <Button variant="ghost" className="w-full justify-start">
            <Home className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <PieChart className="mr-2 h-4 w-4" />
            Analytics
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <HelpCircle className="mr-2 h-4 w-4" />
            Help
          </Button>
        </div>
      </div>
    </nav>
  </SheetContent>
);

const Dashboard = () => {
  const [data, setData] = useState(generateData());
  const [timeframe, setTimeframe] = useState('1M');

  useEffect(() => {
    // Simulate data fetching based on timeframe
    setData(generateData());
  }, [timeframe]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Sheet>
        <Navbar />
        <SideSheet />
        <main className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-6">Financial Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <MetricCard title="Total Revenue" value="$12,345" change={2.5} icon={DollarSign} />
            <MetricCard title="New Customers" value="120" change={-0.8} icon={Users} />
            <MetricCard title="Sales" value="1,234" change={5.1} icon={ShoppingCart} />
            <MetricCard title="Growth Rate" value="3.2%" change={1.2} icon={TrendingUp} />
          </div>

          <Card className="mb-6">
            <CardHeader>
              <h2 className="text-xl font-semibold">Revenue Overview</h2>
              <div className="flex space-x-2">
                {['1W', '1M', '3M', '1Y', 'ALL'].map((tf) => (
                  <Button
                    key={tf}
                    variant={timeframe === tf ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTimeframe(tf)}
                  >
                    {tf}
                  </Button>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Top Performing Products</h2>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center">
                    <span>Product A</span>
                    <span className="font-semibold">$3,456</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Product B</span>
                    <span className="font-semibold">$2,345</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Product C</span>
                    <span className="font-semibold">$1,234</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Recent Transactions</h2>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center">
                    <span>Transaction #1234</span>
                    <span className="font-semibold text-green-500">+$567</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Transaction #5678</span>
                    <span className="font-semibold text-green-500">+$890</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Transaction #9012</span>
                    <span className="font-semibold text-red-500">-$123</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </main>
      </Sheet>
    </div>
  );
};

export default Dashboard;