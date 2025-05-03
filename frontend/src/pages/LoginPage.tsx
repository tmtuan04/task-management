import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

// GraphQL mutation
const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [login, { loading }] = useMutation(LOGIN_MUTATION);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await login({ variables: form });
      localStorage.setItem("token", data.login.token);
      alert("Login successful!");
      // window.location.href = "/dashboard"; // Chuyển hướng nếu cần
    } catch (error) {
      const err = error as Error
      console.error(err.message);
      alert("Login failed. Please check your email or password.");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="text-center mb-4 mt-1">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white text-2xl font-bold mb-2">
          TMT
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Task Manager</h1>
        <p className="text-gray-600">Welcome back! Please login to continue.</p>
      </div>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-5">Login</h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              placeholder="name@example.com"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>

      <div className="mt-4 text-center text-sm text-gray-600">
        By continuing, you agree to our{" "}
        <a href="#" className="text-blue-600 hover:text-blue-700">Terms of Service</a> and{" "}
        <a href="#" className="text-blue-600 hover:text-blue-700">Privacy Policy</a>
      </div>
    </div>
  );
};

export default LoginPage;