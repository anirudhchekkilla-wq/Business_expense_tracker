import React, {
  useContext,
  useState,
} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BusinessContext }
from "../context/BusinessContext";
import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";

const SettingsPage = () => {

  const {
    selectedBusiness,
  } = useContext(BusinessContext);
const navigate = useNavigate();
  const [businessName, setBusinessName] =
    useState(
      selectedBusiness?.businessName || ""
    );

  const [businessType, setBusinessType] =
    useState(
      selectedBusiness?.businessType || ""
    );

  const [currency, setCurrency] =
    useState(
      selectedBusiness?.currency || ""
    );

  const updateBusiness = async () => {
    try {

      await axios.put(
        `http://127.0.0.1:5000/business/${selectedBusiness._id}`,
        {
          businessName: businessName,
          businessType: businessType,
          currency: currency,
        }
      );

      alert(
        "Business Updated Successfully"
      );

    } catch (error) {
      console.error(error);
    }
  };

  const deleteBusiness = async () => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this business?"
  );

  if (!confirmDelete) return;

  try {

    await axios.delete(
      `http://127.0.0.1:5000/business/${selectedBusiness._id}`
    );

    localStorage.removeItem(
      "selectedBusiness"
    );

    alert(
      "Business Deleted Successfully"
    );

    navigate("/businesses");

  } catch (error) {
    console.error(error);
  }
};

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
      <div className="mb-10">

  <h1
    className="
    text-4xl
    font-serif
    text-[#e7ebff]
    "
  >
    Settings
  </h1>

  <p className="text-[#a9b3d1] text-xl mt-2">
    Manage business details and workspaces.
  </p>

</div>

<div className="space-y-8">

  {/* Business Details */}

  <div
    className="
    bg-white/[0.03]
    backdrop-blur-xl
    border
    border-white/10
    rounded-[32px]
    p-8
    "
  >

    <h2
      className="
      text-3xl
      font-serif
      text-[#e7ebff]
      mb-8
      "
    >
      Business details
    </h2>

    <div className="grid md:grid-cols-2 gap-6 mb-6">

      <div>

        <label className="block text-gray-400 mb-3">
          Business name
        </label>

        <input
          type="text"
          value={businessName}
          onChange={(e) =>
            setBusinessName(
              e.target.value
            )
          }
          className="
          w-full
          px-5
          py-4
          rounded-2xl
          bg-[#1A1C3A]
          border
          border-white/10
          text-white
          "
        />

      </div>

      <div>

        <label className="block text-gray-400 mb-3">
          Currency
        </label>

        <input
          type="text"
          value={currency}
          onChange={(e) =>
            setCurrency(
              e.target.value
            )
          }
          className="
          w-full
          px-5
          py-4
          rounded-2xl
          bg-[#1A1C3A]
          border
          border-white/10
          text-white
          "
        />

      </div>

    </div>

    <div className="mb-8">

      <label className="block text-gray-400 mb-3">
        Business type
      </label>

      <input
        type="text"
        value={businessType}
        onChange={(e) =>
          setBusinessType(
            e.target.value
          )
        }
        className="
        w-full
        px-5
        py-4
        rounded-2xl
        bg-[#1A1C3A]
        border
        border-white/10
        text-white
        "
      />

    </div>


    <div className="flex justify-end">

      <button
        onClick={updateBusiness}
        className="
        px-8
        py-4
        rounded-2xl
        bg-[#6D5EF8]
        hover:bg-[#7a6cf8]
        transition
        text-white
        font-semibold
        "
      >
        Save changes
      </button>

    </div>

  </div>

  {/* Workspaces */}

  <div
    className="
    bg-white/[0.03]
    backdrop-blur-xl
    border
    border-white/10
    rounded-[32px]
    p-8
    "
  >

    <h2
      className="
      text-4xl
      font-serif
      mb-3
      "
    >
      Workspaces
    </h2>

    <p className="text-[#a9b3d1] mb-6">
      Add new businesses or switch between them.
    </p>

    <div className="flex gap-4">

      <button
        onClick={() =>
          navigate("/business-setup")
        }
        className="
        px-6
        py-4
        rounded-2xl
        border
        border-white/10
        hover:bg-white/5
        transition
        "
      >
        + Add new business
      </button>

      <button
        onClick={() =>
          navigate("/businesses")
        }
        className="
        px-6
        py-4
        rounded-2xl
        border
        border-white/10
        hover:bg-white/5
        transition
        "
      >
        ↻ Switch business
      </button>

    </div>

  </div>

  {/* Danger Zone */}

  <div
    className="
    bg-white/[0.03]
    border
    border-red-500/40
    rounded-[32px]
    p-8
    "
  >

    <h2
      className="
      text-4xl
      font-serif
      text-red-500
      mb-3
      "
    >
      Danger zone
    </h2>

    <p className="text-gray-400 mb-6">
      Deleting a business permanently removes its transactions.
    </p>

    <button
      onClick={deleteBusiness}
      className="
      px-6
      py-4
      rounded-2xl
      bg-red-500/10
      border
      border-red-500/30
      text-red-400
      hover:bg-red-500/20
      transition
      "
    >
      🗑 Delete this business
    </button>

  </div>

</div>
</div>
</div>
</div>
  );
};

export default SettingsPage;