import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  //  auto redirect if already logged in
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill out all fields");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));

      if (!userDoc.exists()) {
        throw new Error("User profile not found");
      }

      const userData = userDoc.data();
      if (userData.role !== "admin") {
        alert("Only admin users can access this dashboard.");
        return;
      }

      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({
          uid: userCredential.user.uid,
          email: userData.email,
          name: userData.name,
          role: userData.role,
        })
      );

      alert("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert(error.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7] flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md rounded-2xl border p-8 shadow-sm">

        <h1 className="text-3xl font-bold text-center mb-2">
          Admin Login
        </h1>

        <p className="text-gray-500 text-center mb-8">
          Sign in to your admin account
        </p>

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg"
          >
            Login
          </button>

        </form>

        <p className="text-center mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="font-semibold">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}