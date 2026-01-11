import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../components/redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
import ApiService from "../components/ApiServices/ApiService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); 

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return; 

    setLoading(true);

    try {
      const res = await ApiService.adminLogin({ email, password })

      
      localStorage.setItem("token", res.data.token)

    
      dispatch(loginSuccess(res.data.user))

      
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid email or password")
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6">Admin Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Enter email"
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="text-right text-sm text-blue-600 cursor-pointer">
            Forgot Password?
          </div>

          <button
          type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-md font-medium text-white transition ${
              loading ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
