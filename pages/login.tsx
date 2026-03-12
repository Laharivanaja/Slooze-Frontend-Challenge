import { useState } from "react";
import { useRouter } from "next/router";
import { users } from "../data/users";

export default function Login() {

  const router = useRouter();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleLogin = () => {

    const user = users.find(
      u => u.email === email && u.password === password
    );

    if(user){
      localStorage.setItem("role", user.role);

      if(user.role === "manager"){
        router.push("/dashboard");
      } else {
        router.push("/products");
      }

    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">

      <div className="bg-white p-6 rounded shadow w-80">

        <h1 className="text-xl font-bold mb-4">
          Login
        </h1>

        <input
          className="border p-2 mb-3 w-full"
          placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border p-2 mb-3 w-full"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white w-full py-2 rounded"
        >
          Login
        </button>

      </div>

    </div>
  );
}