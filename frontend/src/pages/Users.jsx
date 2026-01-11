import { MoreVertical, Plus } from "lucide-react";

const USERS = [
  {
    id: 1,
    name: "Chris Evans",
    email: "chris@company.com",
    role: "Admin",
    status: "Active",
    joined: "12 Jan 2025",
  },
  {
    id: 2,
    name: "John Smith",
    email: "john@company.com",
    role: "Manager",
    status: "Active",
    joined: "05 Feb 2025",
  },
  {
    id: 3,
    name: "Sara Lee",
    email: "sara@company.com",
    role: "Staff",
    status: "Inactive",
    joined: "22 Dec 2024",
  },
  {
    id: 4,
    name: "Aman Verma",
    email: "aman@company.com",
    role: "Staff",
    status: "Active",
    joined: "18 Jan 2025",
  },
];

const statusStyle = (status) =>
  status === "Active"
    ? "text-green-600"
    : "text-red-500";

export default function Users() {
  return (
    <div className="p-6 bg-gray-100 h-full">
      
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Users</h1>

        <button className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded text-sm">
          <Plus size={14} />
          New User
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded border overflow-x-auto">

        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b text-gray-500">
            <tr>
              <th className="p-3 text-left">USER NAME</th>
              <th className="p-3 text-left">EMAIL</th>
              <th className="p-3 text-left">ROLE</th>
              <th className="p-3 text-left">STATUS</th>
              <th className="p-3 text-left">JOINED</th>
              <th className="p-3 text-right">ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {USERS.map((user) => (
              <tr
                key={user.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-3 font-medium">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.role}</td>
                <td className={`p-3 font-medium ${statusStyle(user.status)}`}>
                  {user.status}
                </td>
                <td className="p-3">{user.joined}</td>
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
