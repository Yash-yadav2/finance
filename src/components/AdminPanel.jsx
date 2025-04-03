import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent } from "/src/components/ui/card";
import { Button } from "/src/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "/src/components/ui/table";
import { Input } from "/src/components/ui/input";
import { fetchUsers, deleteUser } from "../redux/userSlice";

export default function AdminPanel() {
  const dispatch = useDispatch();
  
  const { data: users = [], loading, error } = useSelector((state) => state.users);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [roleFilter, setRoleFilter] = useState(""); 

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = users.filter((user) => {
    return (
      (roleFilter ? user.role === roleFilter : true) &&
      (searchQuery
        ? user._id.toString().includes(searchQuery) ||
          user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.phone?.includes(searchQuery) ||
          user.ipAddress?.includes(searchQuery)
        : true)
    );
  });
  

  const handleDeleteUser = (e, id) => {
    e.stopPropagation();
    dispatch(deleteUser(id));
  };

  return (
    <div className="p-5 bg-white">
      <h2 className="text-2xl font-bold mb-4">Admin Panel - All Users</h2>

      <div className="mb-4 flex gap-4">
        <Input
          type="text"
          placeholder="Search by ID, Name, Email, Phone, or IP..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:border-blue-500"
        />

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="p-3 border border-gray-300 rounded-md shadow-sm focus:border-blue-500"
        >
          <option value="">Filter by Role</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="finance">Finance</option>
        </select>
      </div>

      {loading && <p>Loading users...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id} className="text-center hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedUser(user)}>
              <td className="border p-2">{user._id}</td>
              <td className="border p-2">{user.username}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.role}</td>
              <td className="border p-2">
                <Button
                  onClick={(e) => handleDeleteUser(e, user._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4" onClick={() => setSelectedUser(null)}>
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-3 right-3 text-gray-600 hover:text-gray-900" onClick={() => setSelectedUser(null)}>
              ✖
            </button>
            <h2 className="text-3xl font-semibold text-center text-gray-900 mb-6">
  {selectedUser.name}
</h2>

<div className="flex flex-col space-y-6 text-gray-700 border-t-2 pt-6">
  {/* ID */}
  <div className="flex items-center border-b py-3 px-4 rounded-lg hover:bg-gray-50">
    <p className="font-medium text-gray-600 mr-2">ID:</p>
    <p className="text-gray-800 break-words">{selectedUser._id}</p>
  </div>

  {/* Email */}
  <div className="flex items-center border-b py-3 px-4 rounded-lg hover:bg-gray-50">
    <p className="font-medium text-gray-600 mr-2">Email:</p>
    <p className="text-gray-800 break-words">{selectedUser.email}</p>
  </div>

  {/* Phone */}
  <div className="flex items-center border-b py-3 px-4 rounded-lg hover:bg-gray-50">
    <p className="font-medium text-gray-600 mr-2">Phone:</p>
    <p className="text-gray-800">{selectedUser.phone}</p>
  </div>

  {/* Role */}
  <div className="flex items-center border-b py-3 px-4 rounded-lg hover:bg-gray-50">
    <p className="font-medium text-gray-600 mr-2">Role:</p>
    <p className="text-gray-800">{selectedUser.role}</p>
  </div>

  {/* IP Address */}
  <div className="flex items-center py-3 px-4 rounded-lg">
    <p className="font-medium text-gray-600 mr-2">IP Address:</p>
    <p className="text-gray-800">{selectedUser.ipAddress}</p>
  </div>
</div>

            <div className="mt-6 flex justify-center">
              <Button onClick={() => setSelectedUser(null)} className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
