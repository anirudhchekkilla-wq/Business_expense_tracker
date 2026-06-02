import { Link, useLocation } from "react-router-dom";
import {
  FiGrid,
  FiDollarSign,
  FiTrendingUp,
  FiBarChart2,
  FiFileText,
  FiSettings,
} from "react-icons/fi";

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FiGrid />,
    },
    {
      name: "Expenses",
      path: "/expenses",
      icon: <FiDollarSign />,
    },
    {
      name: "Income",
      path: "/income",
      icon: <FiTrendingUp />,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: <FiBarChart2 />,
    },
    {
      name: "Transactions",
      path: "/transactions",
      icon: <FiFileText />,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <FiSettings />,
    },
  ];

  return (
<div className="w-64 min-h-screen bg-[#020617]/95 backdrop-blur-xl border-r border-white/10 flex flex-col">
      {/* Logo */}

      <div className="p-6 border-b border-white/10">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500" />

          <h1 className="text-white text-2xl font-serif">
            ExpenseTracker
          </h1>

        </div>

      </div>

      {/* Menu */}

      <nav className="flex-1 px-4 py-6 space-y-3">

        {menuItems.map((item) => (

          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
              
              ${
                location.pathname === item.path
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }
            `}
          >
            <span className="text-lg">
              {item.icon}
            </span>

            <span>{item.name}</span>
          </Link>

        ))}

      </nav>

      {/* Help Card */}

      <div className="p-4">

        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">

          <h3 className="text-white font-semibold">
            Need Help?
          </h3>

          <p className="text-gray-400 text-sm mt-1">
            Check our quick start guide.
          </p>

        </div>

      </div>

    </div>
  );
}

export default Sidebar;