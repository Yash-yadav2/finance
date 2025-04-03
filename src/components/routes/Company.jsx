import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "/src/components/ui/button";
import { Input } from "/src/components/ui/input";
import {
  fetchCompanyAccounts,
  createCompanyAccount,
  updateCompanyAccount,
  deleteCompanyAccount,
} from "../../redux/companyAccountSlice";

export default function Company() {
  const dispatch = useDispatch();
  const { data: accounts, loading, error } = useSelector((state) => state.companyAccounts);

  // State for creating a new account
  const [newAccount, setNewAccount] = useState({
    bankName: "",
    image: "",
    QRcode: "",
    min: 0,
    max: 0,
    paymentType: "bank",
    accountHolderName: "",
    accountNumber: "",
    paymentMethod:"",
    WalletAddress: "",
  });

  // State for updating an existing account
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [updateData, setUpdateData] = useState({
    bankName: "",
    image: "",
    QRcode: "",
    min: 0,
    max: 0,
    paymentType: "bank",
    paymentMethod:"",
    accountHolderName: "",
    accountNumber: "",
    WalletAddress: "",
  });

  useEffect(() => {
    dispatch(fetchCompanyAccounts());
  }, [dispatch]);

  // Prepopulate update data when an account is selected
  useEffect(() => {
    if (selectedAccount) {
      setUpdateData({
        bankName: selectedAccount.bankName || "",
        image: selectedAccount.image || "",
        QRcode: selectedAccount.QRcode || "",
        min: selectedAccount.min || 0,
        max: selectedAccount.max || 0,
        paymentType: selectedAccount.paymentType || "bank",
        paymentMethod: selectedAccount.paymentMethod || "",
        accountHolderName: selectedAccount.accountHolderName || "",
        accountNumber: selectedAccount.accountNumber || "",
        WalletAddress: selectedAccount.WalletAddress || "",
      });
    }
  }, [selectedAccount]);

  // Filter accounts by payment type (if needed)
  const filteredAccounts = accounts.filter((acc) =>
    ["bank", "vip", "super"].includes(acc.paymentType)
  );

  const handleCreate = () => {
    dispatch(createCompanyAccount(newAccount));
    setNewAccount({
      bankName: "",
      image: "",
      QRcode: "",
      min: 0,
      max: 0,
      paymentType: "bank",
      paymentMethod:"",
      accountHolderName: "",
      accountNumber: "",
      WalletAddress: "",
    });
  };

  const handleDelete = (id) => {
    dispatch(deleteCompanyAccount(id));
  };

  const handleSaveChanges = () => {
    if (selectedAccount) {
      dispatch(updateCompanyAccount({ id: selectedAccount._id, updatedData: updateData }));
      setSelectedAccount(null);
    }
  };

  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      <header className="max-w-7xl mx-auto mb-8">
        <h2 className="text-4xl font-extrabold text-center text-gray-800">Finance Panel</h2>
        <p className="text-center text-gray-600 mt-2">Manage Company Accounts with Ease</p>
      </header>

      {/* Create New Account Section */}
      <section className="max-w-5xl mx-auto mb-10 p-6 bg-white rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Create New Account</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bank Name */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">Bank Name</label>
            <Input
              type="text"
              placeholder="Enter Bank Name"
              value={newAccount.bankName}
              onChange={(e) => setNewAccount({ ...newAccount, bankName: e.target.value })}
              className="border border-gray-300 rounded-md p-2"
            />
          </div>
          {/* Payment Type */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">Payment Type</label>
            <select
              value={newAccount.paymentType}
              onChange={(e) => setNewAccount({ ...newAccount, paymentType: e.target.value })}
              className="border border-gray-300 rounded-md p-2"
            >
              <option value="bank">Bank</option>
              <option value="vip">VIP</option>
              <option value="super">Super</option>
            </select>
          </div>
          {/* Image URL */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">Image URL</label>
            <Input
              type="text"
              placeholder="Enter Image URL"
              value={newAccount.image}
              onChange={(e) => setNewAccount({ ...newAccount, image: e.target.value })}
              className="border border-gray-300 rounded-md p-2"
            />
          </div>
          {/* QR Code URL */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">QR Code URL</label>
            <Input
              type="text"
              placeholder="Enter QR Code URL"
              value={newAccount.QRcode}
              onChange={(e) => setNewAccount({ ...newAccount, QRcode: e.target.value })}
              className="border border-gray-300 rounded-md p-2"
            />
          </div>
          {/* Min Amount */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">Min Amount</label>
            <Input
              type="number"
              placeholder="Enter Min Amount"
              value={newAccount.min}
              onChange={(e) => setNewAccount({ ...newAccount, min: e.target.value })}
              className="border border-gray-300 rounded-md p-2"
            />
          </div>
          {/* Max Amount */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">Max Amount</label>
            <Input
              type="number"
              placeholder="Enter Max Amount"
              value={newAccount.max}
              onChange={(e) => setNewAccount({ ...newAccount, max: e.target.value })}
              className="border border-gray-300 rounded-md p-2"
            />
          </div>
          {/* Account Holder Name */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">Account Holder Name</label>
            <Input
              type="text"
              placeholder="Enter Account Holder Name"
              value={newAccount.accountHolderName}
              onChange={(e) =>
                setNewAccount({ ...newAccount, accountHolderName: e.target.value })
              }
              className="border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">paymentMethod</label>
            <Input
              type="text"
              placeholder="Enter paymentMethod"
              value={newAccount.  paymentMethod}
              onChange={(e) =>
                setNewAccount({ ...newAccount, paymentMethod: e.target.value })
              }
              className="border border-gray-300 rounded-md p-2"
            />
          </div>
          {/* Account Number */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">Account Number</label>
            <Input
              type="text"
              placeholder="Enter Account Number"
              value={newAccount.accountNumber}
              onChange={(e) =>
                setNewAccount({ ...newAccount, accountNumber: e.target.value })
              }
              className="border border-gray-300 rounded-md p-2"
            />
          </div>
          {/* Wallet Address */}
          <div className="flex flex-col md:col-span-2">
            <label className="mb-1 text-sm font-medium text-gray-700">Wallet Address</label>
            <Input
              type="text"
              placeholder="Enter Wallet Address"
              value={newAccount.WalletAddress}
              onChange={(e) =>
                setNewAccount({ ...newAccount, WalletAddress: e.target.value })
              }
              className="border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>
        <div className="mt-6 text-right">
          <Button onClick={handleCreate} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition">
            Create Account
          </Button>
        </div>
      </section>

      {/* Accounts List Section */}
      <section className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-4 overflow-x-auto">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Accounts List</h3>
        {loading ? (
          <p className="text-center">Loading accounts...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 border">Bank Name</th>
                <th className="p-3 border">Image</th>
                <th className="p-3 border">QR Code</th>
                <th className="p-3 border">Min</th>
                <th className="p-3 border">Max</th>
                <th className="p-3 border">Payment Type</th>
                <th className="p-3 border">Account Holder</th>
                <th className="p-3 border">Account Number</th>
                <th className="p-3 border">paymentMethod</th>
                <th className="p-3 border">Wallet Address</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAccounts.map((acc) => (
                <tr
                  key={acc._id}
                  className="hover:bg-gray-50 transition cursor-pointer"
                  onClick={() => setSelectedAccount(acc)}
                >
                  <td className="p-3 border">{acc.bankName}</td>
                  <td className="p-3 border">
                    <div className="flex items-center space-x-2">
                      {acc.image && (
                        <img src={acc.image} alt="Bank" className="h-10 w-10 object-cover rounded" />
                      )}
                      <span className="text-sm">{acc.image}</span>
                    </div>
                  </td>
                  <td className="p-3 border">
                    <div className="flex items-center space-x-2">
                      {acc.QRcode && (
                        <img src={acc.QRcode} alt="QR Code" className="h-10 w-10 object-cover rounded" />
                      )}
                      <span className="text-sm">{acc.QRcode}</span>
                    </div>
                  </td>
                  <td className="p-3 border">{acc.min}</td>
                  <td className="p-3 border">{acc.max}</td>
                  <td className="p-3 border text-center">{acc.paymentType}</td>
                  <td className="p-3 border">{acc.accountHolderName}</td>
                  <td className="p-3 border">{acc.accountNumber}</td>
                  <td className="p-3 border">{acc.paymentMethod}</td>
                  <td className="p-3 border">{acc.WalletAddress}</td>
                  <td className="p-3 border">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(acc._id);
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded transition"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Update Modal Popup */}
      {selectedAccount && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Update Account</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Bank Name */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">Bank Name</label>
                <Input
                  type="text"
                  value={updateData.bankName}
                  onChange={(e) => setUpdateData({ ...updateData, bankName: e.target.value })}
                  className="border border-gray-300 rounded-md p-2"
                />
              </div>
              {/* Payment Type */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">Payment Type</label>
                <select
                  value={updateData.paymentType}
                  onChange={(e) => setUpdateData({ ...updateData, paymentType: e.target.value })}
                  className="border border-gray-300 rounded-md p-2"
                >
                  <option value="bank">Bank</option>
                  <option value="vip">VIP</option>
                  <option value="super">Super</option>
                </select>
              </div>
              {/* Image URL */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">Image URL</label>
                <Input
                  type="text"
                  value={updateData.image}
                  onChange={(e) => setUpdateData({ ...updateData, image: e.target.value })}
                  className="border border-gray-300 rounded-md p-2"
                />
              </div>
              {/* QR Code URL */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">QR Code URL</label>
                <Input
                  type="text"
                  value={updateData.QRcode}
                  onChange={(e) => setUpdateData({ ...updateData, QRcode: e.target.value })}
                  className="border border-gray-300 rounded-md p-2"
                />
              </div>
              {/* Min Amount */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">Min Amount</label>
                <Input
                  type="number"
                  value={updateData.min}
                  onChange={(e) => setUpdateData({ ...updateData, min: e.target.value })}
                  className="border border-gray-300 rounded-md p-2"
                />
              </div>
              {/* Max Amount */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">Max Amount</label>
                <Input
                  type="number"
                  value={updateData.max}
                  onChange={(e) => setUpdateData({ ...updateData, max: e.target.value })}
                  className="border border-gray-300 rounded-md p-2"
                />
              </div>
              {/* Account Holder */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">Account Holder</label>
                <Input
                  type="text"
                  value={updateData.accountHolderName}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, accountHolderName: e.target.value })
                  }
                  className="border border-gray-300 rounded-md p-2"
                />
              </div>
              {/* Account Number */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">Account Number</label>
                <Input
                  type="text"
                  value={updateData.accountNumber}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, accountNumber: e.target.value })
                  }
                  className="border border-gray-300 rounded-md p-2"
                />
              </div>
              {/* paymentMethod */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">paymentMethod</label>
                <Input
                  type="text"
                  value={updateData.paymentMethod}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, paymentMethod: e.target.value })
                  }
                  className="border border-gray-300 rounded-md p-2"
                />
              </div>
              {/* Wallet Address */}
              <div className="flex flex-col md:col-span-2">
                <label className="text-sm font-medium text-gray-700">Wallet Address</label>
                <Input
                  type="text"
                  value={updateData.WalletAddress}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, WalletAddress: e.target.value })
                  }
                  className="border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <Button
                onClick={() => setSelectedAccount(null)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveChanges}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
