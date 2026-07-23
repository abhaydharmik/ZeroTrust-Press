import React from "react";
import { FileText, LayoutDashboard, LogOut, Tag, Users, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: <Users size={20} />,
    },
    {
      name: "Blogs",
      path: "/admin/blogs",
      icon: <FileText size={20} />,
    },
    {
      name: "Categories",
      path: "/admin/categories",
      icon: <Tag size={20} />
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}

      <aside
        className={`fixed top-0 left-0 z-50 w-64 h-screen bg-black text-white transform transition-transform duration-300 
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b border-gray-800 px-6 py-5">
          <h1 className="text-2xl font-bold">Admin</h1>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 flex flex-col">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-4 transition ${
                  isActive
                    ? "bg-white text-black font-semibold"
                    : "hover:bg-gray-900"
                }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}

        <div className="absolute bottom-0 w-full border-t border-gray-800 p-5">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-3 hover:bg-red-600 transition"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
