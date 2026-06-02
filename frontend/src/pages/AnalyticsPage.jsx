import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { BusinessContext } from "../context/BusinessContext";
import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
   BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
Line,
} from "recharts";
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A855F7",
  "#EC4899",
  "#10B981",
  "#F43F5E",
];

const AnalyticsPage = () => {
  const { selectedBusiness } = useContext(BusinessContext);

  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const fetchAnalyticsData = async () => {
    try {
      if (!selectedBusiness) return;

      const incomeRes = await axios.get(
        `http://127.0.0.1:5000/income/${selectedBusiness._id}`
      );

      const expenseRes = await axios.get(
        `http://127.0.0.1:5000/expenses/${selectedBusiness._id}`
      );

      setIncome(incomeRes.data);
      setExpenses(expenseRes.data);
    } catch (error) {
      console.error("Analytics Fetch Error:", error);
    }
  };
  const expenseCategoryData = Object.values(
  expenses.reduce((acc, expense) => {
    const category = expense.category || "Other";

    if (!acc[category]) {
      acc[category] = {
        name: category,
        value: 0,
      };
    }

    acc[category].value += Number(expense.amount);

    return acc;
  }, {})
);
const totalIncome = income.reduce(
  (sum, item) => sum + Number(item.amount),
  0
);

const totalExpense = expenses.reduce(
  (sum, item) => sum + Number(item.amount),
  0
);
const incomeExpenseData = [
  {
    name: "Income",
    amount: totalIncome,
  },
  {
    name: "Expense",
    amount: totalExpense,
  },
];
const monthlyIncomeData = Object.values(
  income.reduce((acc, item) => {
    const month = new Date(item.date).toLocaleString(
      "default",
      { month: "short" }
    );

    if (!acc[month]) {
      acc[month] = {
        month,
        amount: 0,
      };
    }

    acc[month].amount += Number(item.amount);

    return acc;
  }, {})
);

const monthlyExpenseData = Object.values(
  expenses.reduce((acc, item) => {
    const month = new Date(item.date).toLocaleString(
      "default",
      { month: "short" }
    );

    if (!acc[month]) {
      acc[month] = {
        month,
        amount: 0,
      };
    }

    acc[month].amount += Number(item.amount);

    return acc;
  }, {})
);

const monthlyProfitData = monthlyIncomeData.map((incomeMonth) => {
  const expenseMonth = monthlyExpenseData.find(
    (expense) => expense.month === incomeMonth.month
  );

  return {
    month: incomeMonth.month,
    profit:
      incomeMonth.amount -
      (expenseMonth ? expenseMonth.amount : 0),
  };
});
  useEffect(() => {
    fetchAnalyticsData();
  }, [selectedBusiness]);

  return (
    <div className="flex">

      <Sidebar />

<div className="flex-1 bg-[#020617] min-h-screen">
        <TopNavbar />
    

<div className="
p-6
min-h-screen
bg-gradient-to-br
from-[#020617]
via-[#0b1120]
to-[#1a0f3d]
text-white
">
      {/* Header */}
      <div className="mb-6">
<h1 className="
text-4xl
font-serif
text-[#e7ebff]
">          Analytics Dashboard
        </h1>

<p className="text-[#a9b3d1] text-xl mt-2">          Business: {selectedBusiness?.business_name}
        </p>
      </div>

      {/* Debug Information */}
<div className="
bg-white/[0.03]
font-serif
backdrop-blur-xl
border
border-white/10
rounded-3xl
p-6
mb-6
">        <h2 className="font-serif text-lg mb-2">
          Data Summary
        </h2>

        <p>Total Income Records: {income.length}</p>
        <p>Total Expense Records: {expenses.length}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

  <div className="
bg-white/[0.03]
backdrop-blur-xl
border
border-white/10
rounded-3xl
p-5
">
    <h3 className="text-3xl font-serif text-emerald-400 mt-3">
      Total Income
    </h3>

    <p className="text-2xl font-serif">
      ₹{totalIncome}
    </p>
  </div>

  <div className="
bg-white/[0.03]
backdrop-blur-xl
border
border-white/10
rounded-3xl
p-5
">
    <h3 className="text-3xl font-serif text-red-400 mt-3">
      Total Expense
    </h3>

    <p className="text-2xl font-serif">
      ₹{totalExpense}
    </p>
  </div>

  <div className="
bg-white/[0.03]
backdrop-blur-xl
border
border-white/10
rounded-3xl
p-5
">
    <h3 className="text-3xl font-serif text-violet-400 mt-3">
      Net Profit
    </h3>

    <p className="text-2xl font-serif">
      ₹{totalIncome - totalExpense}
    </p>
  </div>

</div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="
bg-white/[0.03]
backdrop-blur-xl
border
border-white/10
rounded-3xl
p-6
">
          <h2 className="
text-3xl
font-serif
text-[#e7ebff]
mb-6
">
            Expense Category Breakdown
          </h2>

          <div className="h-[300px] flex items-center justify-center text-gray-400">
<ResponsiveContainer width="100%" height={300}>
  <PieChart>

    <Pie
      data={expenseCategoryData}
      dataKey="value"
      nameKey="name"
      cx="50%"
      cy="50%"
      innerRadius={70}
      outerRadius={120}
      paddingAngle={2}
      stroke="#E5E7EB"
      strokeWidth={2}
    >
      {expenseCategoryData.map((entry, index) => (
        <Cell
          key={index}
          fill={COLORS[index % COLORS.length]}
        />
      ))}
    </Pie>

    <Tooltip
      contentStyle={{
        background: "#111827",
        border: "1px solid #ffffff10",
        borderRadius: "16px",
        color: "white",
      }}
    />

    <Legend
      verticalAlign="bottom"
      align="center"
      iconType="circle"
      wrapperStyle={{
        color: "#9ca3af",
        paddingTop: "20px",
      }}
    />

  </PieChart>
</ResponsiveContainer>
          </div>
        </div>

        <div className="
bg-white/[0.03]
backdrop-blur-xl
border
border-white/10
rounded-3xl
p-6
">
          <h2 className="
text-3xl
font-serif
text-[#e7ebff]
mb-6
">
            Income vs Expense
          </h2>

          <div className="h-[300px] flex items-center justify-center text-gray-400">
            <ResponsiveContainer width="40%" height={300}>
  <BarChart data={incomeExpenseData}>
    
<CartesianGrid
  stroke="#ffffff10"
  strokeDasharray="3 3"
/>
    <XAxis
  tick={{ fill: "#9ca3af" }}
 dataKey="name" />

   <YAxis
  tick={{ fill: "#9ca3af" }}
/>

  <Tooltip
  contentStyle={{
    background: "#111827",
    border: "1px solid #ffffff10",
    borderRadius: "16px",
    color: "white",
  }}
/>

<Legend
  wrapperStyle={{
    color: "#9ca3af",
  }}
/>
    <Bar
      dataKey="amount"
      fill="#3B82F6"
    />

  </BarChart>
</ResponsiveContainer>
          </div>
          
        </div>

        <div className="
bg-white/[0.03]
backdrop-blur-xl
border
border-white/10
rounded-3xl
p-6
">
          <h2 className="
text-3xl
font-serif
text-[#e7ebff]
mb-6
">
            Monthly Income Analysis
          </h2>

          <div className="h-[300px] flex items-center justify-center text-gray-400">
           <ResponsiveContainer width="30%" height={300}>
  <BarChart data={monthlyIncomeData}>
    
<CartesianGrid
  stroke="#ffffff10"
  strokeDasharray="3 3"
/>
    <XAxis
  tick={{ fill: "#9ca3af" }}
 dataKey="month" />

   <YAxis
  tick={{ fill: "#9ca3af" }}
/>

  <Tooltip
  contentStyle={{
    background: "#111827",
    border: "1px solid #ffffff10",
    borderRadius: "16px",
    color: "white",
  }}
/>

<Legend
  wrapperStyle={{
    color: "#9ca3af",
  }}
/>
    <Bar
      dataKey="amount"
      fill="#22C55E"
      name="Income"
    />

  </BarChart>
</ResponsiveContainer>
          </div>
        </div>

        <div className="
bg-white/[0.03]
backdrop-blur-xl
border
border-white/10
rounded-3xl
p-6
">
          <h2 className="
text-3xl
font-serif
text-[#e7ebff]
mb-6
">
            Monthly Expense Analysis
          </h2>

          <div className="h-[300px] flex items-center justify-center text-gray-400">
<ResponsiveContainer width="30%" height={300}>
  <BarChart data={monthlyExpenseData}>
    
<CartesianGrid
  stroke="#ffffff10"
  strokeDasharray="3 3"
/>
    <XAxis
  tick={{ fill: "#9ca3af" }}
 dataKey="month" />

   <YAxis
  tick={{ fill: "#9ca3af" }}
/>

  <Tooltip
  contentStyle={{
    background: "#111827",
    border: "1px solid #ffffff10",
    borderRadius: "16px",
    color: "white",
  }}
/>

    <Legend /><Legend
  wrapperStyle={{
    color: "#9ca3af",
  }}
/>

    <Bar
      dataKey="amount"
      fill="#EF4444"
      name="Expense"
    />

  </BarChart>
</ResponsiveContainer>          </div>
        </div>

      </div>

<div className="
bg-white/[0.03]
backdrop-blur-xl
border
border-white/10
rounded-3xl
p-6
mt-6
">
          <h2 className="
text-3xl
font-serif
text-[#e7ebff]
mb-6
">
          Profit Trend
        </h2>

        <div className="h-[350px] flex items-center justify-center text-gray-400">
<ResponsiveContainer width="100%" height={350}>
  <LineChart data={monthlyProfitData}>

   <CartesianGrid strokeDasharray="3 3" /> 

    <XAxis
  tick={{ fill: "#9ca3af" }}
 dataKey="month" />

   <YAxis
  tick={{ fill: "#9ca3af" }}
/>

  <Tooltip
  contentStyle={{
    background: "#111827",
    border: "1px solid #ffffff10",
    borderRadius: "16px",
    color: "white",
  }}
/>

  <Legend
  wrapperStyle={{
    color: "#9ca3af",
  }}
/>

    <Line
      type="monotone"
      dataKey="profit"
      stroke="#3B82F6"
      strokeWidth={3}
      name="Profit"
    />

  </LineChart>
</ResponsiveContainer>        </div>
      </div>

    </div>
    </div>
    </div>
  );
};

export default AnalyticsPage;