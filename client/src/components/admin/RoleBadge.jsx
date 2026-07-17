import { ShieldCheck, User } from "lucide-react";
import React from "react";

const RoleBadge = ({ role }) => {
  const isAdmin = role === "admin";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
        isAdmin ? "bg-black text-white" : "bg-gray-200 text-gray-800"
      }`}
    >
      {isAdmin ? (<ShieldCheck size={14} />): (<User size={14} />)}
      {isAdmin ? "Admin" : "User"}
    </span>
  );
};

export default RoleBadge;
