import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../ui/table";
import { Input } from "../ui/input";
import { fetchAllTransactions, updateTransactionStatus } from "../../redux/transactionSlice";

const TransactionPanel = () => {
  const dispatch = useDispatch();
  
  const { transactions, loading, error } = useSelector((state) => state.transaction);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [rejectionNote, setRejectionNote] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [timeFilter, setTimeFilter] = useState("");

  useEffect(() => {
    dispatch(fetchAllTransactions());
  }, [dispatch]);

  const handleTransactionUpdate = () => {
    const { _id, transactionUserId, status, userAccountNumber, userAccountHolderName } = selectedTransaction;
    const updateData = { transactionUserId, status, userAccountNumber, userAccountHolderName };
    if (status === "rejected") {
        updateData.rejectionNote = rejectionNote;
      }
    dispatch(updateTransactionStatus({ id: _id, updateData }))
      .unwrap()
      .then(() => setSelectedTransaction(null))
      .catch((err) => console.error("Update failed:", err));
  };

  const filteredTransactions = transactions.filter((tx) => {
    return (
      (statusFilter ? tx.status === statusFilter : true) &&
      (dateFilter ? tx.createdAt.startsWith(dateFilter) : true) &&
      (timeFilter ? tx.createdAt.includes(timeFilter) : true) &&
      (searchQuery
        ? tx.transactionUserId.includes(searchQuery) || 
          tx.user.username.includes(searchQuery) || 
          tx.user.email.includes(searchQuery)
        : true)
    );
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Transactions</h2>
      
         <div className="flex flex-wrap gap-4 mb-4">
        <Input
          type="text"
          placeholder="Search by Transaction ID or User"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded w-64"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="received">Received</option>
          <option value="rejected">Rejected</option>
        </select>
        <Input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="p-2 border rounded"
        />
        <Input
          type="time"
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
          className="p-2 border rounded"
        />
      </div>

      {loading && <p>Loading transactions...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      <div className="overflow-x-auto">
        <Table className="min-w-full border border-gray-200">
          <TableHeader>
            <TableRow className="bg-gray-200 text-gray-700">
              <TableHead className="border px-4 py-2">User</TableHead>
              <TableHead className="border px-4 py-2">Amount</TableHead>
              <TableHead className="border px-4 py-2">Company account number</TableHead>
              <TableHead className="border px-4 py-2">Transaction ID</TableHead>
              <TableHead className="border px-4 py-2">User Account Number</TableHead>
              <TableHead className="border px-4 py-2">User Account Holder Name</TableHead>
              <TableHead className="border px-4 py-2">Status</TableHead>
              <TableHead className="border px-4 py-2">Action</TableHead>
              <TableHead className="border px-4 py-2">note</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {filteredTransactions.length > 0 ? (
              filteredTransactions.map((tx) => (
                <TableRow key={tx._id} className="hover:bg-gray-50">
                  <TableCell className="border px-4 py-2">
                    {tx.user.firstName} {tx.user.lastName} <br />
                    <span className="text-sm text-gray-500">{tx.user.email}</span>
                  </TableCell>
                  <TableCell className="border px-4 py-2">{tx.amount}</TableCell>
                  <TableCell className="border px-4 py-2">{tx.companyAccountNumber}</TableCell>
                  <TableCell className="border px-4 py-2">{tx.transactionUserId}</TableCell>
                  <TableCell className="border px-4 py-2">{tx.userAccountNumber}</TableCell>
                  <TableCell className="border px-4 py-2">{tx.userAccountHolderName}</TableCell>
                  <TableCell className="border px-4 py-2">{tx.paymentMethod}</TableCell>
                  <TableCell className="border px-4 py-2">{tx.status}</TableCell>
                  <TableCell className="border px-4 py-2">{tx.rejectionNote}</TableCell>
                  <TableCell className="border px-4 py-2">
                    <Button
                      onClick={() => setSelectedTransaction(tx)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="5" className="text-center py-4 text-gray-500">
                  No transactions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {selectedTransaction && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4"
          onClick={() => setSelectedTransaction(null)}
        >
          <div
            className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
              onClick={() => setSelectedTransaction(null)}
            >
              ✖
            </button>
            <h2 className="text-2xl font-semibold text-center mb-4">Update Transaction</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Transaction ID</label>
                <Input
                  type="text"
                  value={selectedTransaction.transactionUserId}
                  onChange={(e) =>
                    setSelectedTransaction({ ...selectedTransaction, transactionUserId: e.target.value })
                  }
                  className="mt-1 block w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">User Account Number</label>
                <Input
                  type="text"
                  value={selectedTransaction.userAccountNumber}
                  onChange={(e) =>
                    setSelectedTransaction({ ...selectedTransaction, userAccountNumber: e.target.value })
                  }
                  className="mt-1 block w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">User Account Holder Name</label>
                <Input
                  type="text"
                  value={selectedTransaction.userAccountHolderName}
                  onChange={(e) =>
                    setSelectedTransaction({ ...selectedTransaction, userAccountHolderName: e.target.value })
                  }
                  className="mt-1 block w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  value={selectedTransaction.status}
                  onChange={(e) =>
                    setSelectedTransaction({ ...selectedTransaction, status: e.target.value })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="pending">Pending</option>
                  <option value="received">Received</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              {selectedTransaction.status === "rejected" && (
                <div>
                  <label className="block text-sm font-medium">Rejection Note</label>
                  <Input
                    type="text"
                    value={selectedTransaction.rejectionNote}
                    onChange={(e) => setRejectionNote(e.target.value)}
                    className="mt-1 block w-full"
                  />
                </div>
              )}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Payment Type</label>
                <Input
                  type="text"
                  value={selectedTransaction.paymentType}
                  readOnly
                  className="mt-1 block w-full bg-gray-100"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                <Input
                  type="text"
                  value={selectedTransaction.paymentMethod}
                  readOnly
                  className="mt-1 block w-full bg-gray-100"
                />
              </div>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
              <Button onClick={handleTransactionUpdate} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                Save
              </Button>
              <Button onClick={() => setSelectedTransaction(null)} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionPanel;
