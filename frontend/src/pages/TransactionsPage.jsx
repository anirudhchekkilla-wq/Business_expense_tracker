import React, {
  useContext,
  useEffect,
  useState,
} from "react";

import axios from "axios";
import { BusinessContext } from "../context/BusinessContext";
import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";

const TransactionsPage = () => {
  const { selectedBusiness } =
    useContext(BusinessContext);

  const [transactions, setTransactions] =
    useState([]);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [typeFilter, setTypeFilter] =
    useState("All");

  const [categoryFilter, setCategoryFilter] =
    useState("All");
const [fromDate, setFromDate] =
  useState("");

const [toDate, setToDate] =
  useState("");
  const fetchTransactions = async () => {
    try {
      if (!selectedBusiness) return;

      const incomeRes = await axios.get(
        `http://127.0.0.1:5000/income/${selectedBusiness._id}`
      );

      const expenseRes = await axios.get(
        `http://127.0.0.1:5000/expenses/${selectedBusiness._id}`
      );

      const incomeData = incomeRes.data.map(
        (item) => ({
          ...item,
          type: "Income",
          title: item.source,
        })
      );

      const expenseData = expenseRes.data.map(
        (item) => ({
          ...item,
          type: "Expense",
          title: item.title,
        })
      );

      const mergedTransactions = [
        ...incomeData,
        ...expenseData,
      ];

      mergedTransactions.sort(
        (a, b) =>
          new Date(b.date) -
          new Date(a.date)
      );

      setTransactions(
        mergedTransactions
      );

    } catch (error) {
      console.error(
        "Transaction Fetch Error:",
        error
      );
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [selectedBusiness]);

  const categories = [
    "All",
    ...new Set(
      transactions.map(
        (transaction) =>
          transaction.category
      )
    ),
  ];

  const filteredTransactions =
    transactions.filter(
      (transaction) => {

        const matchesSearch =
          transaction.title
            ?.toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            ) ||

          transaction.category
            ?.toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            ) ||

          transaction.type
            ?.toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            );

        const matchesType =
          typeFilter === "All" ||
          transaction.type ===
            typeFilter;

        const matchesCategory =
          categoryFilter ===
            "All" ||
          transaction.category ===
            categoryFilter;
        const transactionDate =
  new Date(transaction.date);

const matchesDate =
  (!fromDate ||
    transactionDate >=
      new Date(fromDate)) &&

  (!toDate ||
    transactionDate <=
      new Date(toDate));

        return (
  matchesSearch &&
  matchesType &&
  matchesCategory &&
  matchesDate
        );
      }
    );

  return (
    <div className="flex">

      <Sidebar />

<div className="flex-1 bg-[#020617] min-h-screen">
        <TopNavbar />
<div
  className="
  p-6
  min-h-screen
  bg-gradient-to-br
  from-[#020617]
  via-[#0b1120]
  to-[#1a0f3d]
  text-white
"
>
      <div className="mb-8">

  <h1
    className="
    text-4xl
    font-serif
    text-[#e7ebff]
    "
  >
    Transactions
  </h1>

  <p className="text-[#a9b3d1] text-xl mt-2">
    Combined history across income and expenses.
  </p>

</div>

      {/* Filters */}
<div
  className="
  bg-white/[0.03]
  backdrop-blur-xl
  border
  border-white/10
  rounded-[32px]
  p-5
  mb-8
"
>

  <div className="flex items-center gap-4">

    <input
      type="text"
      placeholder="Search transactions..."
      value={searchTerm}
      onChange={(e) =>
        setSearchTerm(e.target.value)
      }
      className="
      flex-1
      px-5
      py-4
      rounded-2xl
      bg-white/5
      border
      border-white/10
      text-white
      placeholder:text-gray-500
      outline-none
      focus:border-violet-500
      "
    />

    <div
      className="
      flex
      gap-2
      bg-white/5
      border
      border-white/10
      rounded-2xl
      p-2
      "
    >

      <button
        onClick={() => setTypeFilter("All")}
        className={`
          px-5
          py-3
          rounded-xl
          transition-all
          ${
            typeFilter === "All"
              ? "bg-[#6D5EF8] text-white"
              : "text-gray-400 hover:text-white"
          }
        `}
      >
        All
      </button>

      <button
        onClick={() => setTypeFilter("Income")}
        className={`
          px-5
          py-3
          rounded-xl
          transition-all
          ${
            typeFilter === "Income"
              ? "bg-[#6D5EF8] text-white"
              : "text-gray-400 hover:text-white"
          }
        `}
      >
        Income
      </button>

      <button
        onClick={() => setTypeFilter("Expense")}
        className={`
          px-5
          py-3
          rounded-xl
          transition-all
          ${
            typeFilter === "Expense"
              ? "bg-[#6D5EF8] text-white"
              : "text-gray-400 hover:text-white"
          }
        `}
      >
        Expense
      </button>

    </div>

  </div>

</div>

     
<div
  className="
  bg-white/[0.03]
  backdrop-blur-xl
  border
  border-white/10
  rounded-[32px]
  overflow-hidden
"
>
        <table className="w-full font-serif">

<thead className="border-b border-white/10">
            <tr>

              <th
  className="
  p-6
  text-left
  text-gray-400
  uppercase
  tracking-wide
"
>
                Type
              </th>

              <th
  className="
  p-6
  text-left
  text-gray-400
  uppercase
  tracking-wide
"
>
                Title
              </th>

              <th
  className="
  p-6
  text-left
  text-gray-400
  uppercase
  tracking-wide
"
>
                Category
              </th>

              <th
  className="
  p-6
  text-left
  text-gray-400
  uppercase
  tracking-wide
"
>
                Amount
              </th>

              <th
  className="
  p-6
  text-left
  text-gray-400
  uppercase
  tracking-wide
"
>
                Date
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredTransactions.map(
              (transaction) => (

                <tr
                  key={
                    transaction._id
                  }
className="
border-b
border-white/5
hover:bg-white/[0.02]
transition
"                >
 <td className="p-6 text-[#d1d5db]">
          {transaction.type === "Income" ? (

  <span
    className="
    inline-flex
    items-center
    gap-2
    px-4
    py-2
    rounded-full
    bg-emerald-500/15
    text-emerald-400
    text-sm
    font-medium
    "
  >
    ↗ income
  </span>

) : (

  <span
    className="
    inline-flex
    items-center
    gap-2
    px-4
    py-2
    rounded-full
    bg-amber-500/15
    text-amber-400
    text-sm
    font-medium
    "
  >
    ↘ expense
  </span>

)}
</td>
                  <td className="p-6 text-[#d1d5db]">
                    {
                      transaction.title
                    }
                  </td>

                  <td className="p-6 text-[#d1d5db]">
                    {
                      transaction.category
                    }
                  </td>

                  <td
                    className={`p-3 font-serif ${
                      transaction.type ===
                      "Income"
                        ? "text-emerald-600"
                        : "text-amber-600"
                    }`}
                  >
                  {transaction.type === "Income"
  ? `+₹${transaction.amount}`
  : `-₹${transaction.amount}`}
                  </td>

                  <td className="p-6 text-[#d1d5db]">
                    {new Date(
                      transaction.date
                    ).toLocaleDateString()}
                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
    </div>
    </div>
  );
};

export default TransactionsPage;