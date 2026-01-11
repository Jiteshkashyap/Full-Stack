import { MoreVertical } from "lucide-react";

const DRIVERS = [
  {
    id: 1,
    name: "Ramesh Kumar",
    phone: "9876543210",
    vehicle: "KA-01-AB-2345",
    location: "MG Road, Bengaluru",
    status: "Online",
    lastActive: "Just now",
  },
  {
    id: 2,
    name: "Suresh Patel",
    phone: "9123456780",
    vehicle: "MH-12-CD-8899",
    location: "Andheri East, Mumbai",
    status: "Online",
    lastActive: "2 mins ago",
  },
  {
    id: 3,
    name: "Amit Singh",
    phone: "9988776655",
    vehicle: "DL-05-EF-1122",
    location: "Connaught Place, Delhi",
    status: "Offline",
    lastActive: "30 mins ago",
  },
  {
    id: 4,
    name: "Rahul Verma",
    phone: "9011223344",
    vehicle: "UP-32-GH-7788",
    location: "Hazratganj, Lucknow",
    status: "Offline",
    lastActive: "1 hour ago",
  },
];

const statusStyle = (status) =>
  status === "Online"
    ? "text-green-600 bg-green-50"
    : "text-gray-500 bg-gray-100";

export default function LiveDrivers() {
  return (
    <div className="p-6 bg-gray-100 h-full">
     
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Live Drivers</h1>

        <span className="text-sm text-gray-500">
          Total: {DRIVERS.length}
        </span>
      </div>

    
      <div className="bg-white rounded border overflow-x-auto">

        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b text-gray-500">
            <tr>
              <th className="p-3 text-left">DRIVER</th>
              <th className="p-3 text-left">PHONE</th>
              <th className="p-3 text-left">VEHICLE</th>
              <th className="p-3 text-left">CURRENT LOCATION</th>
              <th className="p-3 text-left">STATUS</th>
              <th className="p-3 text-left">LAST ACTIVE</th>
              <th className="p-3 text-right">ACTION</th>
            </tr>
          </thead>

          <tbody>
            {DRIVERS.map((driver) => (
              <tr
                key={driver.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-3 font-medium">{driver.name}</td>
                <td className="p-3">{driver.phone}</td>
                <td className="p-3">{driver.vehicle}</td>
                <td className="p-3">{driver.location}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${statusStyle(
                      driver.status
                    )}`}
                  >
                    {driver.status}
                  </span>
                </td>
                <td className="p-3">{driver.lastActive}</td>
                <td className="p-3 text-right">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
