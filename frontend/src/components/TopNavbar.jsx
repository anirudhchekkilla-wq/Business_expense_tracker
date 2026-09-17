import { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BusinessContext } from "../context/BusinessContext";
import axios from "axios";
import {
  FiBell,
  FiChevronDown,
  FiLogOut,
  FiRepeat,
  FiSettings,
  FiAlertTriangle,
  FiTrendingUp,
  FiTrendingDown,
  FiInfo,
  FiCheck,
  FiTrash2,
  FiCheckCircle,
  FiX
} from "react-icons/fi";

function TopNavbar() {
  const navigate = useNavigate();
  const { selectedBusiness } = useContext(BusinessContext);

  const [showMenu, setShowMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const dropdownRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch data and build notifications dynamically based on business financial data
  useEffect(() => {
    if (!selectedBusiness?._id) return;

    const fetchNotifications = async () => {
      try {
        const [incomeRes, expenseRes] = await Promise.all([
          axios.get(` https://business-expense-tracker-vuwc.onrender.com/income/${selectedBusiness._id}`).catch(() => ({ data: [] })),
          axios.get(` https://business-expense-tracker-vuwc.onrender.com/expenses/${selectedBusiness._id}`).catch(() => ({ data: [] }))
        ]);

        const incomes = incomeRes.data || [];
        const expenses = expenseRes.data || [];

        const totalIncome = incomes.reduce((sum, i) => sum + Number(i.amount || 0), 0);
        const totalExpense = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);

        const currencySymbol =
          selectedBusiness?.currency === "USD"
            ? "$"
            : selectedBusiness?.currency === "EUR"
              ? "€"
              : "₹";

        const generatedNotifs = [];

        // 1. Alert if expense exceeds income
        if (totalExpense > totalIncome && totalExpense > 0) {
          generatedNotifs.push({
            id: `alert-budget-${selectedBusiness._id}`,
            type: "warning",
            title: "High Expenses Alert",
            message: `Total expenses (${currencySymbol}${totalExpense.toLocaleString()}) exceed income (${currencySymbol}${totalIncome.toLocaleString()}).`,
            time: "Budget Alert",
            read: false,
          });
        }

        // 2. Recent expense item
        if (expenses.length > 0) {
          const sortedExpenses = [...expenses].sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
          const latestExpense = sortedExpenses[0];
          generatedNotifs.push({
            id: `expense-${latestExpense._id || latestExpense.title}`,
            type: "expense",
            title: "Recent Expense Recorded",
            message: `${latestExpense.title || "Expense"}: ${currencySymbol}${Number(latestExpense.amount).toLocaleString()} (${latestExpense.category || "General"})`,
            time: latestExpense.date || "Recent",
            read: false,
          });
        }

        // 3. Recent income item
        if (incomes.length > 0) {
          const sortedIncomes = [...incomes].sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
          const latestIncome = sortedIncomes[0];
          generatedNotifs.push({
            id: `income-${latestIncome._id || latestIncome.source}`,
            type: "income",
            title: "Recent Income Added",
            message: `${latestIncome.source || "Income"}: ${currencySymbol}${Number(latestIncome.amount).toLocaleString()} (${latestIncome.category || "General"})`,
            time: latestIncome.date || "Recent",
            read: false,
          });
        }

        // 4. System / Welcome Notification
        generatedNotifs.push({
          id: `welcome-${selectedBusiness._id}`,
          type: "info",
          title: "Business Active",
          message: `${selectedBusiness.businessName} active (${selectedBusiness.currency || "USD"}).`,
          time: "System",
          read: true,
        });

        // Sync read status from localStorage if present
        const savedReadIds = JSON.parse(localStorage.getItem(`readNotifs_${selectedBusiness._id}`)) || [];
        const syncedNotifs = generatedNotifs.map(n => ({
          ...n,
          read: n.read || savedReadIds.includes(n.id)
        }));

        setNotifications(syncedNotifs);
      } catch (err) {
        console.error("Error building notifications:", err);
      }
    };

    fetchNotifications();
  }, [selectedBusiness]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("selectedBusiness");
    navigate("/");
  };

  const markAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    if (selectedBusiness?._id) {
      const readIds = updated.map(n => n.id);
      localStorage.setItem(`readNotifs_${selectedBusiness._id}`, JSON.stringify(readIds));
    }
  };

  const markSingleAsRead = (id) => {
    const updated = notifications.map(n => n.id === id ? { ...n, read: true } : n);
    setNotifications(updated);
    if (selectedBusiness?._id) {
      const readIds = updated.filter(n => n.read).map(n => n.id);
      localStorage.setItem(`readNotifs_${selectedBusiness._id}`, JSON.stringify(readIds));
    }
  };

  const deleteNotification = (id, e) => {
    e.stopPropagation();
    const updated = notifications.filter(n => n.id !== id);
    setNotifications(updated);
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="h-20 bg-[#020617]/95 backdrop-blur-xl border-b border-white/10 px-8 flex justify-between items-center z-40 relative">
      {/* Business Info */}
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-600 flex items-center justify-center text-white font-bold">
          {selectedBusiness?.businessName?.charAt(0)}
        </div>
        <div>
          <h2 className="text-white font-serif text-lg">
            {selectedBusiness?.businessName}
          </h2>
          <p className="text-gray-300 text-sm font-serif">
            {selectedBusiness?.businessType}
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-5 relative" ref={dropdownRef}>
        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowMenu(false);
            }}
            className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 relative transition-all duration-200 cursor-pointer"
            title="Notifications"
          >
            <FiBell size={18} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[11px] font-bold flex items-center justify-center animate-pulse border-2 border-[#020617]">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown Panel */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-[#0B192C]/95 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              {/* Header */}
              <div className="px-5 py-4 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-serif font-semibold text-base">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 text-xs rounded-full bg-cyan-500/20 text-cyan-400 font-medium">
                      {unreadCount} new
                    </span>
                  )}
                </div>

                {notifications.length > 0 && (
                  <div className="flex items-center gap-2 text-xs">
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <FiCheck className="inline" /> Mark read
                      </button>
                    )}
                    <button
                      onClick={clearAllNotifications}
                      className="text-slate-400 hover:text-rose-400 transition-colors ml-2 cursor-pointer"
                      title="Clear all"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                )}
              </div>

              {/* List */}
              <div className="max-h-80 overflow-y-auto divide-y divide-white/5 custom-scrollbar">
                {notifications.length === 0 ? (
                  <div className="px-5 py-8 text-center text-slate-400">
                    <FiCheckCircle size={32} className="mx-auto mb-2 text-slate-500 opacity-60" />
                    <p className="text-sm font-medium">No notifications</p>
                    <p className="text-xs text-slate-500 mt-1">You're all caught up!</p>
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => markSingleAsRead(notif.id)}
                      className={`px-4 py-3.5 flex items-start gap-3 hover:bg-white/[0.05] transition-colors cursor-pointer relative group ${!notif.read ? "bg-cyan-500/[0.04]" : "opacity-80"
                        }`}
                    >
                      {/* Icon */}
                      <div className="mt-0.5 shrink-0">
                        {notif.type === "warning" && (
                          <div className="w-8 h-8 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center">
                            <FiAlertTriangle size={16} />
                          </div>
                        )}
                        {notif.type === "income" && (
                          <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                            <FiTrendingUp size={16} />
                          </div>
                        )}
                        {notif.type === "expense" && (
                          <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center">
                            <FiTrendingDown size={16} />
                          </div>
                        )}
                        {notif.type === "info" && (
                          <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center">
                            <FiInfo size={16} />
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0 pr-4">
                        <div className="flex justify-between items-baseline mb-0.5">
                          <h4 className={`text-xs font-semibold truncate ${!notif.read ? "text-white" : "text-slate-300"}`}>
                            {notif.title}
                          </h4>
                          <span className="text-[10px] text-slate-400 shrink-0 ml-2">{notif.time}</span>
                        </div>
                        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{notif.message}</p>
                      </div>

                      {/* Unread indicator / Delete button */}
                      <div className="flex flex-col items-end gap-1.5 shrink-0">
                        {!notif.read && (
                          <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                        )}
                        <button
                          onClick={(e) => deleteNotification(notif.id, e)}
                          className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-rose-400 transition-opacity p-0.5 cursor-pointer"
                          title="Dismiss"
                        >
                          <FiX size={12} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User */}
        <div className="relative">
          <button
            onClick={() => {
              setShowMenu(!showMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-3 px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400" />
            <span className="text-white">User</span>
            <FiChevronDown className="text-white" />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-50 bg-[#102C5C] border border-white/10 rounded-2xl overflow-hidden shadow-xl z-50">
              <button
                onClick={() => navigate("/businesses")}
                className="w-full flex items-center gap-3 px-5 py-2 text-white hover:bg-white/10 cursor-pointer"
              >
                <FiRepeat />
                Switch Business
              </button>

              <button
                onClick={() => navigate("/settings")}
                className="w-full flex items-center gap-3 px-5 py-2 text-white hover:bg-white/10 cursor-pointer"
              >
                <FiSettings />
                Settings
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-5 py-2 text-red-400 hover:bg-white/10 cursor-pointer"
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
