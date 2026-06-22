import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill out all fields");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      await setDoc(doc(db, "users", uid), {
        uid,
        name,
        email,
        role: "admin",
        createdAt: serverTimestamp(),
      });

      alert("Account created successfully!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7] flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md rounded-2xl border p-8 shadow-sm">

        <h1 className="text-3xl font-bold text-center mb-2">
          Create Account
        </h1>

        <p className="text-gray-500 text-center mb-8">
          Register as Admin
        </p>

        <form onSubmit={handleRegister} className="space-y-4">

          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg"
          >
            Register
          </button>

        </form>

        <p className="text-center mt-6">
          Already have an account?{" "}
          <Link to="/" className="font-semibold">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}