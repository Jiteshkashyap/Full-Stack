import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const orderChartData = [
  { name: "Mon", orders: 40 },
  { name: "Tue", orders: 65 },
  { name: "Wed", orders: 55 },
  { name: "Thu", orders: 80 },
  { name: "Fri", orders: 70 },
  { name: "Sat", orders: 95 },
  { name: "Sun", orders: 60 },
];
export default function Dashboard() {
  return (
    <div className="space-y-8">
      
      <h1 className="text-2xl font-semibold text-gray-800">
        Dashboard
      </h1>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Users" value="120" />
        <StatCard title="Total Drivers" value="25" />
        <StatCard title="Total Orders" value="540" />
        <StatCard title="Total Products" value="80" />
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">
            Orders This Week
          </h2>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={orderChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="orders"
                  fill="#2563eb"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

       
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">
            Live Summary
          </h2>

          <p className="text-gray-500 text-sm">Active Drivers</p>
          <p className="text-2xl font-bold mb-4">12</p>

          <p className="text-gray-500 text-sm">Pending Orders</p>
          <p className="text-2xl font-bold">18</p>
        </div>
      </div>
    </div>
  );
}


function StatCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-2xl font-bold text-gray-800 mt-2">{value}</h2>
    </div>
  );
}
