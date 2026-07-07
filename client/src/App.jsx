import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import BlogDetails from "./pages/BlogDetails";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Register />
          </ProtectedRoute>
        }
      />
      <Route path="/blog/:id" element={<BlogDetails />} />
      <Route
        path="/create-blog"
        element={
          <ProtectedRoute>
            <CreateBlog />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-blog/:id"
        element={
          <ProtectedRoute>
            <EditBlog />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
