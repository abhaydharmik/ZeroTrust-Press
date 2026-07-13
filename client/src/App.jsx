import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import BlogDetails from "./pages/BlogDetails";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";
import MyBlogs from "./pages/MyBlogs";
import Profile from "./pages/Profile";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Blogs from "./pages/admin/Blogs";
import ProtectedAdminRoute from "./components/admin/ProtectedAdminRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
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
      <Route
        path="/my-blogs"
        element={
          <ProtectedRoute>
            <MyBlogs />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedAdminRoute>
            <AdminLayout />
          </ProtectedAdminRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="blogs" element={<Blogs />} />
      </Route>
    </Routes>
  );
};

export default App;
