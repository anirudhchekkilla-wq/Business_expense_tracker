import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";
import SummaryCard from "../components/SummaryCard";
import { useState, useEffect, useContext } from "react";
import axios from "axios";

import {
  FiTrendingUp,
  FiTrendingDown,
  FiCreditCard,
} from "react-icons/fi";
import { BusinessContext } from "../context/BusinessContext";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
const COLORS = [
  "#38bdf8",
  "#22c55e",
  "#facc15",
  "#fb7185",
  "#06b6d4",
  "#8b5cf6",
];
function DashboardPage() {

  
 
  const { selectedBusiness } =
  useContext(BusinessContext);

const [totalIncome, setTotalIncome] =
  useState(0);

const [totalExpense, setTotalExpense] =
  useState(0);
const fetchDashboardData = async () => {

  if (!selectedBusiness) return;

  try {

    const incomeResponse =
      await axios.get(
        `http://127.0.0.1:5000/income/${selectedBusiness._id}`
      );

    const expenseResponse =
      await axios.get(
        `http://127.0.0.1:5000/expenses/${selectedBusiness._id}`
      );

    const incomeTotal =
      incomeResponse.data.reduce(
        (sum, item) =>
          sum + Number(item.amount),
        0
      );

    const expenseTotal =
      expenseResponse.data.reduce(
        (sum, item) =>
          sum + Number(item.amount),
        0
      );

    setTotalIncome(incomeTotal);
    setTotalExpense(expenseTotal);
    setIncomeData(incomeResponse.data);
setExpenseData(expenseResponse.data);
    const incomeTransactions =
  incomeResponse.data.map((item) => ({
    ...item,
    type: "Income",
    title: item.source,
  }));

const expenseTransactions =
  expenseResponse.data.map((item) => ({
    ...item,
    type: "Expense",
    title: item.title,
  }));

const allTransactions = [
  ...incomeTransactions,
  ...expenseTransactions,
];
allTransactions.sort(
  (a, b) =>
    new Date(b.date) -
    new Date(a.date)
);
setRecentTransactions(
  allTransactions.slice(0, 5)
);

  } catch (error) {
    console.error(error);
  }
};
useEffect(() => {
  fetchDashboardData();
}, [selectedBusiness]);

 const netProfit =
    totalIncome - totalExpense;
    const currencySymbol =
  selectedBusiness?.currency === "USD"
    ? "$"
    : selectedBusiness?.currency === "EUR"
    ? "€"
    : "₹";
    const [incomeData, setIncomeData] =
  useState([]);

const [expenseData, setExpenseData] =
  useState([]);
  const incomeExpenseChartData = [
  {
    name: "Income",
    amount: totalIncome,
  },
  {
    name: "Expense",
    amount: totalExpense,
  },
];

const expenseCategoryData = Object.values(
  expenseData.reduce((acc, item) => {

    const category =
      item.category || "Other";

    if (!acc[category]) {
      acc[category] = {
        name: category,
        value: 0,
      };
    }

    acc[category].value += Number(
      item.amount
    );

    return acc;

  }, {})
);
  
const [recentTransactions, setRecentTransactions] =
  useState([]);


  return (
    <div className="flex">

      <Sidebar />

<div className="flex-1 bg-[#020617] min-h-screen">
        <TopNavbar />

       <div className="p-8">
        <div className="mb-8">
  <h1 className="text-4xl font-serif text-white">
    Dashboard
  </h1>

  <p className="text-slate-400 mt-2 text-lg">
    Welcome back. Here's how{" "}
    {selectedBusiness?.businessName}
    {" "}is performing.
  </p>
</div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            <SummaryCard
              title="Total Income"
              amount={totalIncome}
              currencySymbol={currencySymbol}
            />

            <SummaryCard
              title="Total Expenses"
              amount={totalExpense}
              currencySymbol={currencySymbol}
            />

            <SummaryCard
              title="Net Profit/Loss"
              amount={netProfit}
              currencySymbol={currencySymbol}
            />

          </div>
          <div className="grid lg:grid-cols-2 gap-6 mt-8">

  {/* Income vs Expense */}

<div
  className="
bg-white/[0.03]
backdrop-blur-xl
border border-white/10
rounded-3xl
p-6
"
>
<h2 className="text-xl font-serif text-white mb-4">      Income vs Expense
    </h2>

    {incomeData.length === 0 &&
    expenseData.length === 0 ? (

      <p className="text-gray-300">
        No financial data available.
      </p>

    ) : (

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <BarChart
          data={incomeExpenseChartData}
        >

         <CartesianGrid
  stroke="#031539"
  strokeDasharray="4 4"
/>

<XAxis
  dataKey="name"
  stroke="#94A3B8"
/>

<YAxis
  stroke="#94A3B8"
/>

<Tooltip
  contentStyle={{
    backgroundColor: "#08162E",
    border: "1px solid #334155",
    borderRadius: "12px",
  }}
/>

<Bar
  dataKey="amount"
  radius={[4, 4, 0, 0]}
  fill="#10d39b"
/>

        </BarChart>

      </ResponsiveContainer>

    )}

  </div>

  {/* Expense Pie */}

<div
  className="
bg-white/[0.03]
backdrop-blur-xl
border border-white/10
rounded-3xl
p-6
"
>
<h2 className="text-xl font-serif text-white mb-4">      Expense Breakdown
    </h2>

    {expenseCategoryData.length ===
    0 ? (

     <p className="text-gray-300">
        No expense data available.
      </p>

    ) : (

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <PieChart>

          <Pie
            data={expenseCategoryData}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          >

            {expenseCategoryData.map(
              (entry, index) => (

                <Cell
                  key={index}
                  fill={
                    COLORS[
                      index %
                        COLORS.length
                    ]
                  }
                />

              )
            )}

          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

    )}

  </div>

</div>

  <div
  className="
bg-white/[0.03]
backdrop-blur-xl
border border-white/10
rounded-3xl
p-6
mt-8
"
>


           

  <div className="flex justify-between items-center mb-6">

  <h2 className="text-3xl font-serif text-white">
    Recent Transactions
  </h2>



</div>

<div className="space-y-4">

{recentTransactions.map(
(transaction,index)=>{

const isIncome =
transaction.type === "Income";

return (

<div
key={index}
className="
flex
items-center
justify-between
border-b
border-white/10
pb-4
"
>

<div className="flex items-center gap-4 font-serif">

<div
className={
isIncome
?
"w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400"
:
"w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400"
}
>

{isIncome ? "↗" : "↘"}

</div>

<div>

<h3 className="text-white font-serif">
{transaction.title}
</h3>

<p className="text-slate-400">

{transaction.category || transaction.type}
{" • "}
{transaction.date}

</p>

</div>

</div>

<div
className={
isIncome
?
"text-emerald-400 text-3xl font-serif"
:
"text-amber-400 text-3xl font-serif"
}
>

{isIncome ? "+" : "-"}

{currencySymbol}
{transaction.amount}

</div>

</div>

);

})}

</div>



          </div>

        </div>

      </div>

    </div>
  );
}

export default DashboardPage;