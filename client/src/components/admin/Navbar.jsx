import { Menu, Bell, Search } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Navbar = ({ setSidebarOpen }) => {
  const { user } = useAuth();

  const avatar = user?.avatar
    ? user.avatar.startsWith("http")
      ? user.avatar
      : `http://localhost:5000/uploads/${user.avatar}`
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
        user?.name || "Admin",
      )}&background=000000&color=ffffff`;

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b bg-white px-6">
      {/* Left */}

      <div className="flex items-center gap-4">
        {/* Mobile Menu */}

        <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
          <Menu size={28} />
        </button>

        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>

          <p className="text-sm text-gray-500">
            Welcome back, {user?.name || "Admin"}
          </p>
        </div>
      </div>

      {/* Center */}

      <div className="hidden md:flex items-center w-full max-w-md mx-8">
        <div className="relative w-full">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-xl border py-3 pl-11 pr-4 outline-none focus:border-black"
          />
        </div>
      </div>

      {/* Right */}

      <div className="flex items-center gap-5">
        {/* Notification */}

        <button className="relative">
          <Bell size={22} />

          <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-red-500"></span>
        </button>

        {/* Avatar */}

        <div className="flex items-center gap-3">
          <img
            src={avatar}
            alt={user?.name}
            className="h-11 w-11 rounded-full border object-cover"
          />

          <div className="hidden sm:block">
            <h3 className="font-semibold">{user?.name}</h3>

            <p className="text-xs capitalize text-gray-500">{user?.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
