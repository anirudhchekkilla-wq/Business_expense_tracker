import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { BusinessContext } from "../context/BusinessContext";
import { FiEdit2, FiTrash2, FiSearch } from "react-icons/fi";
import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";

function ExpensesPage() {
  const { selectedBusiness } =
    useContext(BusinessContext);

  const [expenses, setExpenses] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    customCategory: "",
    date: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
const [editingId, setEditingId] =
  useState(null);

  const fetchExpenses = async () => {
    if (!selectedBusiness) return;

    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/expenses/${selectedBusiness._id}`
      );

      setExpenses(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [selectedBusiness]);

  const deleteExpense = async (id) => {

  const confirmDelete =
    window.confirm(
      "Delete this expense?"
    );

  if (!confirmDelete) return;

  try {

    await axios.delete(
      `http://127.0.0.1:5000/expenses/${id}`
    );

    fetchExpenses();

  } catch (error) {
    console.error(error);
  }
};
const editExpense = (expense) => {

  setFormData({
    title: expense.title,
    amount: expense.amount,
    category: expense.category,
    customCategory: "",
    date: expense.date,
    description: expense.description,
  });

  setEditingId(expense._id);
};

const updateExpense = async (e) => {

  e.preventDefault();

  try {

    await axios.put(
      `http://127.0.0.1:5000/expenses/${editingId}`,
      {
        title: formData.title,
        amount: formData.amount,
        category:
          formData.category === "Other"
            ? formData.customCategory
            : formData.category,
        date: formData.date,
        description: formData.description,
      }
    );

    alert("Expense Updated");

    setEditingId(null);

    setFormData({
      title: "",
      amount: "",
      category: "",
      customCategory: "",
      date: "",
      description: "",
    });

    fetchExpenses();

  } catch (error) {
    console.error(error);
  }
};

const addExpense = async (e) => {

  e.preventDefault();

  try {

    const expenseData = {

      business_id: selectedBusiness._id,

      title: formData.title,

      amount: formData.amount,

      category:
        formData.category === "Other"
          ? formData.customCategory
          : formData.category,

      date: formData.date,

      description: formData.description,
    };

    console.log("Expense Payload:", expenseData);

    await axios.post(
      "http://127.0.0.1:5000/expense",
      expenseData
    );

    alert("Expense Added Successfully");

    setFormData({
      title: "",
      amount: "",
      category: "",
      customCategory: "",
      date: "",
      description: "",
    });

    fetchExpenses();

  } catch (error) {

    console.error(error);

  }
};

  if (!selectedBusiness) {
    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold">
          No Business Selected
        </h1>
      </div>
    );
  }

  return (
    <div className="flex">

      <Sidebar />

<div className="flex-1 bg-[#020617] min-h-screen">
        <TopNavbar />
<div className="p-8 min-h-screen bg-gradient-to-br from-[#020617] via-[#0b1120] to-[#111827] text-white">  
      <h1 className="text-3xl font-serif mb-6">
        Expenses - {selectedBusiness.businessName}
      </h1>

      <form
  onSubmit={
    editingId
      ? updateExpense
      : addExpense
  }

className="
bg-[#0f1f4d]/80
backdrop-blur-xl
border
border-white/10
rounded-3xl
p-8
mb-8
shadow-2xl
"      >
        <h2 className="text-3xl font-serif text-white mb-6">
         {
  editingId
    ? "Update Expense"
    : "Add Expense"
}
        </h2>

        <input
          type="text"
          name="title"
          placeholder="Expense Title"
          value={formData.title}
          onChange={handleChange}
          className="
w-full
bg-[#1a2353]
border
border-white/10
rounded-2xl
p-4
text-white
placeholder:text-slate-400
mb-4
outline-none
focus:border-cyan-400
"
          required
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          className="
w-full
bg-[#1a2353]
border
border-white/10
rounded-2xl
p-4
text-white
placeholder:text-slate-400
mb-4
outline-none
focus:border-cyan-400
"
          required
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="
w-full
bg-[#1a2353]
border
border-white/10
rounded-2xl
p-4
text-white
placeholder:text-slate-400
mb-4
outline-none
focus:border-cyan-400
"
          required
        >
          <option value="">
            Select Category
          </option>

          <option value="Rent">
            Rent
          </option>

          <option value="Salary">
            Salary
          </option>

          <option value="Utilities">
            Utilities
          </option>

          <option value="Inventory">
            Inventory
          </option>

          <option value="Marketing">
            Marketing
          </option>

          <option value="Travel">
            Travel
          </option>

          <option value="Other">
            Other
          </option>
        </select>

        {formData.category === "Other" && (
          <input
            type="text"
            name="customCategory"
            placeholder="Custom Category"
            value={formData.customCategory}
            onChange={handleChange}
            className="
w-full
bg-[#1a2353]
border
border-white/10
rounded-2xl
p-4
text-white
placeholder:text-slate-400
mb-4
outline-none
focus:border-cyan-400
"
            required
          />
        )}

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="
w-full
bg-[#1a2353]
border
border-white/10
rounded-2xl
p-4
text-white
placeholder:text-slate-400
mb-4
outline-none
focus:border-cyan-400
"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="
w-full
bg-[#1a2353]
border
border-white/10
rounded-2xl
p-4
text-white
placeholder:text-slate-400
mb-4
outline-none
focus:border-cyan-400
"
        />

          <button
      className="
      px-6 py-3
      rounded-2xl
      bg-gradient-to-r
      from-violet-500
      to-indigo-500
      hover:scale-105
      transition-all
      font-semibold
    "
    >
      + Add Expense
    </button>
        {
  editingId && (
    <button
      type="button"
      onClick={() => {

        setEditingId(null);

        setFormData({
          title: "",
          amount: "",
          category: "",
          customCategory: "",
          date: "",
          description: "",
        });

      }}
className="
ml-3
px-6
py-3
rounded-2xl
bg-white/10
text-white
hover:bg-white/20
transition-all
"    >
      Cancel
    </button>
  )
}
      </form>

     <div className="bg-[#0f1f4d]/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">

  <div className="flex justify-between items-center p-6">

    <div>

      <h2 className="text-4xl font-serif text-white">
        Expenses
      </h2>

      <p className="text-slate-400 mt-2">
        {expenses.length} entries · ₹
        {expenses.reduce(
          (sum, item) =>
            sum + Number(item.amount),
          0
        )}
        {" "}total
      </p>

    </div>

  

  </div>

  <div className="px-6 pb-6">

   

    <table className="w-full">

      <thead>

        <tr className="border-b border-white/10 text-slate-400">

          <th className="text-left p-5">
            TITLE
          </th>

          <th className="text-left p-5">
            CATEGORY
          </th>

          <th className="text-left p-5">
            DATE
          </th>

          <th className="text-left p-5">
            AMOUNT
          </th>

          <th className="text-center p-5">
            ACTIONS
          </th>

        </tr>

      </thead>

      <tbody>

        {expenses.map((expense) => (

          <tr
            key={expense._id}
            className="
            border-b
            border-white/5
            hover:bg-white/5
          "
          >

            <td className="p-5 font-semibold">
              {expense.title}
            </td>

            <td className="p-5">

              <span
                className="
                px-3 py-1
                rounded-full
                bg-indigo-500/20
                text-indigo-300
                text-sm
              "
              >
                {expense.category}
              </span>

            </td>

            <td className="p-5 text-slate-300">
              {expense.date}
            </td>

            <td
              className="
              p-5
              text-amber-400
              font-bold
              text-xl
            "
            >
              -₹{expense.amount}
            </td>

            <td className="p-5">

              <div className="flex justify-center gap-5">

                <button
                  onClick={() =>
                    editExpense(expense)
                  }
                  className="
                  text-slate-300
                  hover:text-cyan-400
                "
                >
                  <FiEdit2 size={18} />
                </button>

                <button
                  onClick={() =>
                    deleteExpense(
                      expense._id
                    )
                  }
                  className="
                  text-slate-300
                  hover:text-red-400
                "
                >
                  <FiTrash2 size={18} />
                </button>

              </div>

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

</div>
</div>
</div>
</div>
  );
}

export default ExpensesPage;

