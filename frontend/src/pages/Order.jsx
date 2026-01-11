import { useState } from "react";
import { ChevronDown, Plus } from "lucide-react";

const ORDERS = [
  {
    id: "SO-00001",
    date: "04 Aug 2015",
    customer: "Patricia Boyle",
    status: "FULFILLED",
    shipped: true,
    amount: 89.99,
  },
  {
    id: "SO-00002",
    date: "04 Aug 2015",
    customer: " James Beckman",
    status: "FULFILLED",
    shipped: true,
    amount: 699.0,
  },
  {
    id: "SO-00003",
    date: "14 Aug 2015",
    customer: "Mr. James Beckman",
    status: "PARTIALLY SHIPPED",
    shipped: true,
    amount: 210.0,
  },
  {
    id: "SO-00004",
    date: "08 Aug 2015",
    customer: "Patricia Boyle",
    status: "SHIPPED",
    shipped: true,
    amount: 60.0,
  },
  {
    id: "SO-00005",
    date: "05 Aug 2015",
    customer: " James Beckman",
    status: "SHIPPED",
    shipped: false,
    amount: 39.99,
  },
  {
    id: "SO-00006",
    date: "05 Aug 2015",
    customer: " James Beckman",
    status: "PARTIALLY SHIPPED",
    shipped: true,
    amount: 300.0,
  },
];

const statusColor = (status) => {
  if (status === "FULFILLED") return "text-green-600";
  if (status === "SHIPPED") return "text-blue-600";
  return "text-orange-500";
};

export default function Orders() {
  const [sortOpen, setSortOpen] = useState(false);

  return (
    <div className="p-6 bg-gray-100 h-full">
     
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">All Sales Orders</h1>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded text-sm">
            <Plus size={14} />
            New
          </button>

          <div className="relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="border px-3 py-2 rounded text-sm flex items-center gap-1 bg-white"
            >
              Sort
              <ChevronDown size={14} />
            </button>

            {sortOpen && (
              <div className="absolute right-0 mt-1 bg-white border rounded shadow w-48 z-10">
                {[
                  "Created Time",
                  "Last Modified Time",
                  "Date",
                  "Sales Order#",
                  "Customer Name",
                  "Amount",
                ].map((item) => (
                  <div
                    key={item}
                    className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                  >
                    {item}
                  </div>
                ))}
                <div className="border-t" />
                <div className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">
                  Import Sales Orders
                </div>
                <div className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">
                  Export Sales Orders
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      
      <div className="bg-white rounded border overflow-x-auto">

        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr className="text-left text-gray-500">
              <th className="p-3">DATE</th>
              <th className="p-3">SALES ORDER#</th>
              <th className="p-3">CUSTOMER NAME</th>
              <th className="p-3">STATUS</th>
              <th className="p-3 text-center">SHIPPED</th>
              <th className="p-3 text-right">AMOUNT</th>
            </tr>
          </thead>

          <tbody>
            {ORDERS.map((order) => (
              <tr
                key={order.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-3">{order.date}</td>
                <td className="p-3 text-blue-600 cursor-pointer">
                  {order.id}
                </td>
                <td className="p-3">{order.customer}</td>
                <td className={`p-3 font-medium ${statusColor(order.status)}`}>
                  {order.status}
                </td>
                <td className="p-3 text-center">
                  {order.shipped && (
                    <span className="inline-block h-2 w-2 bg-blue-600 rounded-full" />
                  )}
                </td>
                <td className="p-3 text-right font-medium">
                  ${order.amount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
