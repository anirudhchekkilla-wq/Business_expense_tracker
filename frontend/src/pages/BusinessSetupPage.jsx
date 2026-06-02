import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function BusinessSetupPage() {

  const navigate = useNavigate();

  const [businessData, setBusinessData] = useState({
    businessName: "",
    businessType: "",
    customBusinessType: "",
    currency: "INR",
    logo:null,
  });

  const handleChange = (e) => {

    if (e.target.type === "file") {

      setBusinessData({
        ...businessData,
        logo: e.target.files[0],
      });

    } else {

      setBusinessData({
        ...businessData,
        [e.target.name]: e.target.value,
      });

    }

  };

  const handleSubmit = async () => {

    try {

      const businessType =
        businessData.businessType === "Other"
          ? businessData.customBusinessType
          : businessData.businessType;

      const userId =
        localStorage.getItem("user_id");
console.log(
  "USER ID:",
  localStorage.getItem("user_id")
);
      await axios.post(
        "http://127.0.0.1:5000/business",
        {
          user_id: userId,
          businessName: businessData.businessName,
          businessType: businessType,
          currency: businessData.currency,
        }
      );

      navigate("/businesses");

    } catch (error) {

      console.log(error);

    }

  };

  return (

<div className="
min-h-screen
flex
items-center
justify-center
bg-gradient-to-br
from-[#020617]
via-[#0b1120]
to-[#1a0f3d]
relative
overflow-hidden
p-6
">
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
<div
  className="
  relative
  z-10
  w-full
  max-w-4xl
  rounded-[32px]
  border
  border-white/10
  bg-white/[0.03]
  backdrop-blur-xl
  p-10
  "
>
       <h1
  className="
  text-6xl
  font-serif
  text-[#e7ebff]
  "
>
  Set up your business
</h1>

<p className="text-[#a9b3d1] text-xl mt-3 mb-10">
  You can add more businesses anytime.
</p>
<label className="block text-gray-400 mb-3">
  Business name
</label>
        <input
          type="text"
          name="businessName"
          placeholder="Business Name"
          value={businessData.businessName}
          onChange={handleChange}
className="
w-full
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
transition
mb-8
"        />
<div className="grid md:grid-cols-2 gap-6 mb-8">
        <select
          name="businessType"
          value={businessData.businessType}
          onChange={handleChange}
         className="
w-full
px-5
py-4
rounded-2xl
bg-[#1A1F3D]
border
border-white/10
text-white

"
        >
          <option value="">Select Business Type</option>

         <option className="bg-[#1A1F3D] text-white">Retail Shop</option>
         <option className="bg-[#1A1F3D] text-white">Restaurant</option>
         <option className="bg-[#1A1F3D] text-white">Factory</option>
         <option className="bg-[#1A1F3D] text-white">Freelancer</option>
         <option className="bg-[#1A1F3D] text-white">Startup</option>
         <option className="bg-[#1A1F3D] text-white">Service Business</option>
         <option className="bg-[#1A1F3D] text-white">E-commerce</option>
         <option className="bg-[#1A1F3D] text-white">Medical Store</option>
         <option className="bg-[#1A1F3D] text-white">Clothing Store</option>
         <option className="bg-[#1A1F3D] text-white">Supermarket</option>
         <option className="bg-[#1A1F3D] text-white">Gym/Fitness</option>
         <option className="bg-[#1A1F3D] text-white">Salon/Beauty</option>
         <option className="bg-[#1A1F3D] text-white">Agency</option>
         <option className="bg-[#1A1F3D] text-white">Other</option>

        </select>

        {businessData.businessType === "Other" && (

          <input
            type="text"
            name="customBusinessType"
            placeholder="Enter Custom Business Type"
            value={businessData.customBusinessType}
            onChange={handleChange}
            className="
w-full
px-5
py-4
rounded-2xl
bg-[#1A1C3A]
border
border-white/10
text-white
outline-none
focus:border-violet-500
"
          />

        )}

        <select
          name="currency"
          value={businessData.currency}
          onChange={handleChange}
className="
w-full
px-5
py-4
rounded-2xl
bg-[#1A1F3D]
border
border-white/10
text-white

"        >
          <option className="bg-[#1A1F3D] text-white"value="INR">INR ₹</option>
          <option className="bg-[#1A1F3D] text-white"value="USD">USD $</option>
          <option className="bg-[#1A1F3D] text-white"value="EUR">EUR €</option>
          <option className="bg-[#1A1F3D] text-white"value="GBP">GBP £</option>
        </select>
</div>
 



        <div className="flex justify-end gap-4">

  <button
  type="button"
  onClick={() => navigate(-1)}
  className="
  px-8
  py-4
  rounded-2xl
  border
  border-white/10
  text-white
  "
>
  Cancel
</button>

  <button
    onClick={handleSubmit}
    className="
    px-8
    py-4
    rounded-2xl
    bg-gradient-to-r
    from-[#6D5EF8]
    to-[#7B6CF8]
    text-white
    font-semibold
    "
  >
    Create business
  </button>

</div>

      </div>

    </div>

  );
}

export default BusinessSetupPage;