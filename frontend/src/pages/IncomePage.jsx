import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { BusinessContext } from "../context/BusinessContext";
import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

function IncomePage() {
  const { selectedBusiness } =
    useContext(BusinessContext);

  const [income, setIncome] = useState([]);

  const [formData, setFormData] = useState({
    source: "",
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
const [showModal, setShowModal] =
  useState(false);
  const fetchIncome = async () => {
    if (!selectedBusiness) return;

    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/income/${selectedBusiness._id}`
      );

      setIncome(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchIncome();
  }, [selectedBusiness]);

  const deleteIncome = async (id) => {

  const confirmDelete =
    window.confirm(
      "Delete this income?"
    );

  if (!confirmDelete) return;

  try {

    await axios.delete(
      `http://127.0.0.1:5000/income/${id}`
    );

    fetchIncome();

  } catch (error) {
    console.error(error);
  }
};
const editIncome = (income) => {

  setFormData({
    source: income.source,
    amount: income.amount,
    category: income.category,
    customCategory: "",
    date: income.date,
    description: income.description,
  });

  setEditingId(income._id);
  setShowModal(true);
};

const updateIncome = async (e) => {

  e.preventDefault();

  try {

    await axios.put(
      `http://127.0.0.1:5000/income/${editingId}`,
      {
        source: formData.source,
        amount: formData.amount,
        category:
          formData.category === "Other"
            ? formData.customCategory
            : formData.category,
        date: formData.date,
        description: formData.description,
      }
    );

    alert("Income Updated");

    setEditingId(null);

    setFormData({
      source: "",
      amount: "",
      category: "",
      customCategory: "",
      date: "",
      description: "",
    });

    fetchIncome();

  } catch (error) {
    console.error(error);
  }
};

  const addIncome = async (e) => {
    e.preventDefault();

    try {
      const incomeData = {
        businessId: selectedBusiness._id,
        source: formData.source,
        amount: formData.amount,
        category:
          formData.category === "Other"
            ? formData.customCategory
            : formData.category,
        date: formData.date,
        description: formData.description,
      };

      await axios.post(
        "http://127.0.0.1:5000/income",
        incomeData
      );

      alert("Income Added Successfully");

      setFormData({
        source: "",
        amount: "",
        category: "",
        customCategory: "",
        date: "",
        description: "",
      });

      fetchIncome();
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
<h1 className="text-4xl font-serif text-white">      
   Income - {selectedBusiness.businessName}
      </h1>
      <div className="mb-8">
 

  <p className="text-slate-400 mt-2">
    {income.length} entries · ₹
    {income.reduce(
      (sum, item) =>
        sum + Number(item.amount),
      0
    )} total
  </p>
</div>

<div className="mb-8 flex justify-end">

  <button
    onClick={() => {

      setEditingId(null);

      setFormData({
        source: "",
        amount: "",
        category: "",
        customCategory: "",
        date: "",
        description: "",
      });

      setShowModal(true);

    }}
    className="
    px-6 py-3
    rounded-2xl
    bg-gradient-to-r
    from-cyan-500
    to-blue-600
    font-semibold
    "
  >
    + Add Income
  </button>

</div>
<div
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
<h2 className="text-3xl font-serif text-white mb-6">          Income History
        </h2>

        <table className="w-full border-collapse">
          <thead>
<tr className="border-b border-white/10">             
<th className="py-5 px-6 text-left text-slate-400 uppercase text-sm">Source</th>
             <th className="py-5 px-6 text-left text-slate-400 uppercase text-sm">Amount</th>
             <th className="py-5 px-6 text-left text-slate-400 uppercase text-sm">Category</th>
             <th className="py-5 px-6 text-left text-slate-400 uppercase text-sm">Date</th>
             <th className="py-5 px-6 text-center text-slate-400 uppercase text-sm">Actions</th>
            </tr>
          </thead>

          <tbody>
            {income.length > 0 ? (
              income.map((income) => (
                <tr
                  key={income._id}
className="
border-b
border-white/10
hover:bg-white/5
transition-all
font-serif
"              >
                  <td className="p-4 text-white">
                    {income.source}
                  </td>

                  <td className="p-4 font-semibold text-emerald-400">
 
  {income.amount}
</td>

                  <td className="p-4 text-white">
                 <span
  className="
    bg-indigo-500/20
    text-indigo-300
    px-3
    py-1
    rounded-full
    text-sm
  "
>
  {income.category}
</span>
                  </td>

                  <td className="p-4 text-white">
                    {income.date}
                  </td>
             <td className="p-5">

              <div className="flex justify-center gap-5">

                <button
                  onClick={() =>
                    editIncome(income)
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
                    deleteIncome(
                      income._id
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
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
className="p-8 text-center text-gray-400"                >
                  No Income Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
<AnimatePresence>

  {showModal && (

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="
      fixed inset-0
      bg-black/60
      backdrop-blur-sm
      z-50
      flex
      items-center
      justify-center
      "
    >

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.95,
          y: 20,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          scale: 0.95,
          y: 20,
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
      
      >

       <form
  onSubmit={
    editingId
      ? updateIncome
      : addIncome
  }

  className="
        w-full
        max-w-3xl
        bg-[#0f1f4d]
        border
        border-white/10
        rounded-3xl
        p-8
        shadow-2xl
        "   >
<div className="flex items-center justify-between mb-8">

  <h2 className="text-4xl font-serif text-white">

    {editingId
      ? "Update Income"
      : "Add Income"}

  </h2>

  <button
    type="button"
    onClick={() => {

      setShowModal(false);

      setEditingId(null);

      setFormData({
        source: "",
        amount: "",
        category: "",
        customCategory: "",
        date: "",
        description: "",
      });

    }}
    className="
    text-slate-400
    hover:text-white
    text-3xl
    transition-all
    "
  >
    ×
  </button>

</div>

        <input
          type="text"
          name="source"
          placeholder="Income Source"
          value={formData.source}
          onChange={handleChange}
         className="
w-full
bg-[#08162E]
border border-white/10
text-white
placeholder-gray-400
p-3
rounded-xl
mb-4
focus:outline-none
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
bg-[#08162E]
border border-white/10
text-white
placeholder-gray-400
p-3
rounded-xl
mb-4
focus:outline-none
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
bg-[#08162E]
border border-white/10
text-white
placeholder-gray-400
p-3
rounded-xl
mb-4
focus:outline-none
focus:border-cyan-400
"
          required
        >
            <option value="">
            Select Category
          </option>
          <option value="Product Sales">
  Product Sales
</option>

<option value="Services">
  Services
</option>

<option value="Client Payments">
  Client Payments
</option>

<option value="Subscriptions">
  Subscriptions
</option>

<option value="Freelancing">
  Freelancing
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
bg-[#08162E]
border border-white/10
text-white
placeholder-gray-400
p-3
rounded-xl
mb-4
focus:outline-none
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
bg-[#08162E]
border border-white/10
text-white
placeholder-gray-400
p-3
rounded-xl
mb-4
focus:outline-none
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
bg-[#08162E]
border border-white/10
text-white
placeholder-gray-400
p-3
rounded-xl
mb-4
focus:outline-none
focus:border-cyan-400
"
        />

        <button
          type="submit"
className="
bg-gradient-to-r
from-cyan-500
to-blue-600
text-white
px-6
py-3
rounded-2xl
font-semibold
hover:scale-105
transition-all
"        >
          Add Income
        </button>
        {
  editingId && (
    <button
      type="button"
      onClick={() => {

        setEditingId(null);

        setFormData({
          source: "",
          amount: "",
          category: "",
          customCategory: "",
          date: "",
          description: "",
        });

      }}
className="
ml-3
bg-white/10
text-white
px-6
py-3
rounded-xl
hover:bg-white/20
transition-all
"    >
      Cancel
    </button>
  )
}
      

    </form>

      </motion.div>

    </motion.div>

  )}

</AnimatePresence>

    </div>
     </div>

    </div>
  );
}

export default IncomePage;

