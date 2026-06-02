import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { BusinessContext } from "../context/BusinessContext";

function BusinessSelectionPage() {
  const navigate = useNavigate();

  const { selectBusiness } =
    useContext(BusinessContext);

  const [businesses, setBusinesses] =
    useState([]);

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    try {

      const userId =
        localStorage.getItem(
          "user_id"
        );

      const response =
        await axios.get(
          `http://127.0.0.1:5000/businesses/${userId}`
        );

      setBusinesses(
        response.data
      );

    } catch (error) {

      console.log(error);

    }
  };

  return (
<div className="min-h-screen bg-gradient-to-br
from-[#030712]
via-[#0b1120]
to-[#140b2d]
relative
overflow-hidden text-white px-12 py-10">
  {/* Glow Effects */}
  {/* Background Glow */}
<div className="absolute inset-0 pointer-events-none">

  <div
    className="
    absolute
    top-0
    right-0
    w-[700px]
    h-[700px]
    bg-purple-700/20
    blur-[180px]
    "
  />

  <div
    className="
    absolute
    bottom-0
    left-0
    w-[700px]
    h-[700px]
    bg-blue-700/15
    blur-[180px]
    "
  />

</div>
     <div className="flex justify-between items-start mb-12">

  <div>

    <h1
      className="
      text-6xl
      font-serif
      text-[#e7ebff]
      "
    >
      Your businesses
    </h1>

    <p className="text-[#a9b3d1] text-xl mt-4">
      Pick a workspace or create a new one.
    </p>

  </div>

  <button
    onClick={() => navigate("/")}
    className="text-[#cfd6f6] hover:text-white"
  >
    ← Home
  </button>

</div>

<div className="grid lg:grid-cols-2 gap-8">
        {businesses.map((business) => (

          <div
            key={business._id}
            onClick={() => {

  console.log("Selected:", business);

  selectBusiness(business);

  navigate("/dashboard");

}}
className="
cursor-pointer
rounded-3xl
border
border-white/10
bg-white/[0.03]
backdrop-blur-xl
p-8
transition-all
duration-300
hover:border-white/20
hover:scale-[1.01]
"          >

<h2 className="text-4xl font-serif text-white">
  {business.businessName}
</h2>

<p className="text-[#a9b3d1] mt-2">
  {business.businessType} · {business.currency}
</p>

{/* Stats Row */}
<div className="grid grid-cols-3 gap-4 mt-8">

  <div className="rounded-2xl border border-white/10 p-4">

    <p className="text-xs text-gray-400">
      INCOME
    </p>

    <p className="text-2xl text-emerald-400 mt-2">
      --
    </p>

  </div>

  <div className="rounded-2xl border border-white/10 p-4">

    <p className="text-xs text-gray-400">
      EXPENSE
    </p>

    <p className="text-2xl text-amber-400 mt-2">
      --
    </p>

  </div>

  <div className="rounded-2xl border border-white/10 p-4">

    <p className="text-xs text-gray-400">
      PROFIT
    </p>

    <p className="text-2xl text-violet-400 mt-2">
      --
    </p>

  </div>

</div>

          </div>

        ))}

     <div
  onClick={() =>
    navigate("/business-setup")
  }
  className="
  cursor-pointer
  rounded-3xl
  border
  border-dashed
  border-white/10
  bg-white/[0.03]
  backdrop-blur-xl
  p-12
  flex
  flex-col
  items-center
  justify-center
  min-h-[260px]
  hover:border-violet-500/40
  transition-all
  duration-300
  "
>

          <h2 className="text-5xl font-serif text-white">
  Add new business
</h2>

<p className="text-[#a9b3d1] mt-3">
  Spin up a new workspace
</p>

        </div>

      </div>

    </div>
  );
}

export default BusinessSelectionPage;