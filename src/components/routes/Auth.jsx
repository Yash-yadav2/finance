import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Input } from "/src/components/ui/input";
import { Button } from "/src/components/ui/button";
import { loginUser, registerUser } from "../../redux/authSlice";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      .then(() => {
        navigate("/admin");
      })
      .catch((err) => setError(err.message || "Authentication failed"));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-700">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md">
        <h2 className="text-4xl font-extrabold text-center text-gray-900">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        {(error || authError) && (
          <p className="text-red-500 text-center mt-2">{error || authError}</p>
        )}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="mt-5">
              </div>
            </>
          )}

          <div className="mt-5">
            <label className="block text-gray-700 font-semibold">Email</label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="mt-2 p-3 border border-gray-300 rounded-md w-full"
            />
          </div>

          <div className="mt-5">
            <label className="block text-gray-700 font-semibold">Password</label>
            <Input
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
              className="mt-2 p-3 border border-gray-300 rounded-md w-full"
            />
          </div>

          <Button
            type="submit"
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition duration-200"
            disabled={loading}
          >
            {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
          </Button>
        </form>

       
      </div>
    </div>
  );
}
