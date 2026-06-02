import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BusinessContext } from "../context/BusinessContext";
import {
  FiBell,
  FiChevronDown,
  FiLogOut,
  FiRepeat,
  FiSettings,
} from "react-icons/fi";

function TopNavbar() {

  const navigate = useNavigate();

  const { selectedBusiness } =
    useContext(BusinessContext);

  const [showMenu, setShowMenu] =
    useState(false);

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("selectedBusiness");

    navigate("/");
  };

  return (

<div className="h-20 bg-[#020617]/95 backdrop-blur-xl border-b border-white/10 px-8 flex justify-between items-center">      {/* Business Info */}

      <div className="flex items-center gap-4">

        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-600 flex items-center justify-center text-white font-bold">

          {selectedBusiness?.businessName?.charAt(0)}

        </div>

        <div>

          <h2 className="text-white font-serif text-lg">

            {selectedBusiness?.businessName}

          </h2>

          <p className="text-gray-300 text-sm font-serif ">

            {selectedBusiness?.businessType}

          </p>

        </div>

      </div>

      {/* Right Side */}

      <div className="flex items-center gap-5 relative">

        {/* Notification */}

        <button className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20">

          <FiBell size={18} />

        </button>

        {/* User */}

        <div className="relative">

          <button
            onClick={() =>
              setShowMenu(!showMenu)
            }
            className="flex items-center gap-3 px-3 py-2 rounded-full bg-white/10 hover:bg-white/20"
          >

            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400" />

            <span className="text-white">
              User
            </span>

            <FiChevronDown className="text-white" />

          </button>

          {showMenu && (

            <div className="absolute right-0 mt-2 w-50 bg-[#102C5C] border border-white/10 rounded-2xl overflow-hidden shadow-xl z-50">

              <button
                onClick={() =>
                  navigate("/businesses")
                }
                className="w-full flex items-center gap-3 px-5 py-2 text-white hover:bg-white/10"
              >
                <FiRepeat />
                Switch Business
              </button>

              <button
                onClick={() =>
                  navigate("/settings")
                }
                className="w-full flex items-center gap-3 px-5 py-2 text-white hover:bg-white/10"
              >
                <FiSettings />
                Settings
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-5 py-2 text-red-400 hover:bg-white/10"
              >
                <FiLogOut />
                Logout
              </button>

            </div>

          )}

        </div>

      </div>

    </div>

  );
}

export default TopNavbar;