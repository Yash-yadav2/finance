import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Input } from "/src/components/ui/input";
import { Button } from "/src/components/ui/button";
import { loginUser, registerUser } from "../redux/authSlice";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error: authError } = useSelector((state) => state.auth);

  const toggleAuthMode = () => setIsLogin(!isLogin);

  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Invalid email format");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    const action = isLogin ? loginUser : registerUser;
    dispatch(action(formData))
      .unwrap()
      .then((res) => {
        navigate("/admin");
      })
      .catch((err) => setError(err.message || "Authentication failed"));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center">
          {isLogin ? "Login" : "Signup"}
        </h2>

        {(error || authError) && (
          <p className="text-red-500 text-center mt-2">
            {error || authError}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="mt-5 flex space-x-2">
                <Input
                  type="text"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  required
                />
                <Input
                  type="text"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mt-5">
                <label className="block font-semibold">Phone</label>
                <Input
                  type="text"
                  placeholder="Enter your phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mt-5">
                <label className="block font-semibold">Country</label>
                <Input
                  type="text"
                  placeholder="Enter your country"
                  value={formData.country}
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                  required
                />
              </div>
            </>
          )}

          {/* Role selection available in both login and signup */}          
          <div className="mt-5">
            <label className="block font-semibold">Role</label>
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-md mt-1"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="finance">Finance Admin</option>
            </select>
          </div>

          <div className="mt-5">
            <label className="block font-semibold">Email</label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div className="mt-5">
            <label className="block font-semibold">Password</label>
            <Input
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
            disabled={loading}
          >
            {loading ? "Processing..." : isLogin ? "Login" : "Signup"}
          </Button>
        </form>

        <p
          className="text-center mt-6 text-gray-500 cursor-pointer hover:underline"
          onClick={toggleAuthMode}
        >
          {isLogin
            ? "Don't have an account? Signup"
            : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
}
