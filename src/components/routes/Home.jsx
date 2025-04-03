import { useState } from "react";
import { Button } from "/src/components/ui/button";
import AdminPanel from "../AdminPanel";
import TransactionPanel from "./Transaction";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";
import Company from "./Company";


const Home = () => {
  const [activeTab, setActiveTab] = useState("users"); 
  
  const admin = {
    name: "adan",
  };

  const dispatch = useDispatch();

 
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

 
   const handleLogout = () => {
    dispatch(logout());
  };


  return (
    <div className="p-0 md:p-5 bg-white">
   
      <nav className="flex justify-between items-center bg-gray-800 text-white p-4 md:rounded-t-md">
        <h1 className="text-xl font-semibold">Finance Dashboard</h1>
        <div className="flex items-center space-x-4">
          <span>{admin.name}</span>
          <Button
        onClick={handleLogout}
          className={"px-4 py-2 rounded-md bg-red-500"}
        >
          logout
        </Button>
        </div>
      </nav>

     

   
      <div className="flex space-x-4 my-4">
        <Button
          onClick={() => handleTabChange("users")}
          className={`px-4 py-2 rounded-md ${activeTab === "users" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
        >
          Transactions
        </Button>
        <Button
          onClick={() => handleTabChange("transactions")}
          className={`px-4 py-2 rounded-md ${activeTab === "Company" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
        >
          company account
        </Button>
      </div>

     
      {activeTab === "users" && (
        <div className="mt-4">
         <TransactionPanel/>
        </div>
      )}

      {activeTab === "transactions" && (
        <div className="mt-4">
          <Company/>
        </div>
      )}
    </div>
  );
};

export default Home;
