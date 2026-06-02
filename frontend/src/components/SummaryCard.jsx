import {
  FiTrendingUp,
  FiTrendingDown,
  FiDollarSign,
} from "react-icons/fi";

function SummaryCard({
  title,
  amount,
  currencySymbol = "₹",
}) {

  const getIcon = () => {
    if (title.includes("Income")) {
      return <FiTrendingUp size={24} />;
    }

    if (title.includes("Expense")) {
      return <FiTrendingDown size={24} />;
    }

    return <FiDollarSign size={24} />;
  };

  const getGradient = () => {
    if (title.includes("Income")) {
      return "from-cyan-500 to-blue-600";
    }

    if (title.includes("Expense")) {
      return "from-orange-500 to-red-500";
    }

    return "from-purple-500 to-indigo-600";
  };

  return (
<div
  className="
  relative
  overflow-hidden
  rounded-3xl
  bg-white/[0.05]
  backdrop-blur-xl
  border
  border-white/10
  p-6
  hover:scale-[1.02]
  transition-all
  duration-300
  "
>

      {/* Glow Effect */}

      <div
        className={`
          absolute
          top-0
          right-0
          w-32
          h-32
          rounded-full
          blur-3xl
          opacity-20
          bg-gradient-to-r
          ${getGradient()}
        `}
      />

      {/* Header */}

      <div className="flex justify-between items-center">

        <div>

          <p className="text-slate-400 text-lg uppercase tracking-wide">
  {title}
</p>

          <h2
  className={`text-5xl font-serif mt-6 ${
    title.includes("Income")
      ? "text-emerald-400"
      : title.includes("Expense")
      ? "text-amber-400"
      : "text-indigo-400"
  }`}
>

            {currencySymbol}
            {Number(amount).toLocaleString()}
            <p className="text-slate-400 text-sm mt-3">
  Last 6 months
</p>

          </h2>

        </div>

        <div
          className={`
            w-14
            h-14
            rounded-2xl
            flex
            items-center
            justify-center
            text-white
             ${
      title.includes("Income")
        ? "text-emerald-400"
        : title.includes("Expense")
        ? "text-amber-400"
        : "text-indigo-400"
    }
          bg-white/10
backdrop-blur-md
          `}
        >
          {getIcon()}
        </div>

      </div>

      {/* Bottom Line */}

      <div
        className={`
          mt-6
          h-1
          rounded-full
          bg-gradient-to-r
          ${getGradient()}
        `}
      />

    </div>

  );
}

export default SummaryCard;