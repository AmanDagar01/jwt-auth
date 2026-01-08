import React, { useState } from 'react'
import axios from "axios";

const Login = () => {
    const [formData, setFormData] = useState({email:"", password: ""});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/login", formData, {
                headers: { "Content-Type": "application/json" },
            });
            localStorage.setItem("token", res.data.token); // Save token
            alert("Login successful!");
            setFormData({ email: "", password: "" }); // Reset form
        } catch (error) {
            alert(error.response?.data?.message || "Error occurred");
        }
    };
  return (
    <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
            />
            <input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
            />
            <button type="submit">Login</button>
        </form>
  )
}

export default Login;