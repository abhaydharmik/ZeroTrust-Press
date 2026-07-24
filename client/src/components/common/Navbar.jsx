import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Plus,
  User,
  LogOut,
  NotebookPen,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    setMenuOpen(false);
    logout();
    navigate("/login");
  };

  const navLink = ({ isActive }) =>
    `relative text-base font-medium transition-all duration-200 ${
      isActive
        ? "text-black"
        : "text-gray-600 hover:text-black"
    } after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-black after:rounded-full after:transition-all after:duration-300 ${
      isActive
        ? "after:w-full"
        : "after:w-0 hover:after:w-full"
    }`;

  const mobileLink = ({ isActive }) =>
    `block rounded-lg px-4 py-3 text-base font-medium transition ${
      isActive
        ? "bg-black text-white"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
          {/* Logo */}
          <NavLink
            to="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">
              <NotebookPen size={20} />
            </div>

            <span className="text-xl font-bold tracking-wide">
              BlogHub
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            <NavLink
              to="/"
              end
              className={navLink}
            >
              Home
            </NavLink>

            <NavLink
              to="/my-blogs"
              className={navLink}
            >
              My Blogs
            </NavLink>
          </nav>

          {/* Desktop Right */}
          <div className="hidden items-center gap-3 md:flex">
            <NavLink
              to="/create-blog"
              className="flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              <Plus size={18} />
              Create Blog
            </NavLink>

            <NavLink
              to="/profile"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition hover:bg-gray-100"
            >
              <User size={20} />
            </NavLink>

            <button
              onClick={handleLogout}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition hover:bg-red-50 hover:text-red-600"
            >
              <LogOut size={20} />
            </button>
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg p-2 hover:bg-gray-100 md:hidden"
          >
            {menuOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="border-t bg-white md:hidden">
            <div className="space-y-2 p-4">
              <NavLink
                to="/"
                end
                className={mobileLink}
                onClick={() => setMenuOpen(false)}
              >
                Home
              </NavLink>

              <NavLink
                to="/my-blogs"
                className={mobileLink}
                onClick={() => setMenuOpen(false)}
              >
                My Blogs
              </NavLink>

              <NavLink
                to="/create-blog"
                onClick={() => setMenuOpen(false)}
                className="mt-3 flex items-center justify-center gap-2 rounded-full bg-black px-4 py-3 text-white"
              >
                <Plus size={18} />
                Create Blog
              </NavLink>

              <NavLink
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-gray-100"
              >
                <User size={20} />
                Profile
              </NavLink>

              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-red-600 hover:bg-red-50"
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;