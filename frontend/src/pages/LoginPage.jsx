
import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../context/AuthContext";

function LoginPage() {

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    // Empty field validation
    if (!formData.email || !formData.password) {
      setError("Please fill all required fields");
      return;
    }

    // Signup validations
    if (!isLogin) {

      if (!formData.fullName || !formData.confirmPassword) {
        setError("Please fill all fields");
        return;
      }

      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return;
      }

    }

    try {

      const url = isLogin
        ? "http://127.0.0.1:5000/login"
        : "http://127.0.0.1:5000/register";

      const response = await axios.post(
        url,
        formData
      );

      console.log(response.data);

      // LOGIN LOGIC
     if (isLogin) {

  login(response.data.token);

  localStorage.setItem(
    "user_id",
    response.data.user_id
  );

  navigate("/businesses");

} else {

        alert("Signup Successful! Please Login");

        setIsLogin(true);

      }

    } catch (error) {

      console.log(error);

      if (error.response && error.response.data.message) {

        setError(error.response.data.message);

      } else {

        setError("Backend Error");

      }

    }

  };

  return (

    
<div className="relative min-h-screen grid lg:grid-cols-2 bg-[#030712] overflow-hidden">

  {/* Glow Effects */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-900/20 blur-[150px]" />
    <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-purple-900/20 blur-[150px]" />
  </div>

  {/* LEFT SIDE */}
  <div className="relative z-10 flex flex-col justify-between p-12 lg:p-16">

    {/* Logo */}
    <div className="flex items-center gap-3">

      <div
        className="
        h-10
        w-10
        rounded-full
        bg-gradient-to-br
        from-violet-400
        to-fuchsia-500
      "
      />

      <h1 className="text-white text-3xl font-serif">
        Expense Tracker
      </h1>

    </div>

    {/* Heading */}
    <div className="max-w-xl">

      <h2
        className="
        text-[#e7ebff]
        text-6xl
        lg:text-6xl
        font-serif
        leading-tight
      "
      >
        Numbers that
        <br />
        speak clearly.
      </h2>

      <p
        className="
        mt-8
        text-xl
        text-[#a9b3d1]
        leading-relaxed
      "
      >
        Trusted by independent operators,
        agencies, and growing teams to keep
        cash flow crystal clear.
      </p>

    </div>

    {/* Testimonial */}
    <div
      className="
      max-w-xl
      p-8
      rounded-3xl
      border
      border-white/10
      bg-white/[0.03]
      backdrop-blur-xl
    "
    >

      <p className="text-[#cfd6f6] text-lg">
        Streamline your financial management with our intuitive expense and income tracking.
      </p>

      <div className="flex items-center gap-4 mt-6">

        <div
          className="
          h-12
          w-12
          rounded-full
          bg-gradient-to-br
          from-violet-400
          to-fuchsia-500
        "
        />

        <div>
          <p className="text-white font-semibold">
            Login or
          </p>

          <p className="text-gray-400 text-sm">
            Signup
          </p>
        </div>

      </div>

    </div>

  </div>

  {/* RIGHT SIDE */}
  <div className="relative z-10 flex items-center justify-center p-8">

    <motion.form
  layout
  transition={{
    layout: {
      duration: 0.3,
      ease: "easeInOut",
    },
  }}
  onSubmit={handleSubmit}
className="
w-full
max-w-xl
p-10
rounded-[32px]
bg-white/[0.03]
backdrop-blur-xl
border
border-white/10
"
>

        {/* Heading */}
       <AnimatePresence mode="wait">

  <motion.h1
    key={isLogin ? "login" : "signup"}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.25 }}
className="
text-white
font-serif
text-4xl
mb-2
"  >
    {isLogin ? "Login" : "Create Account"}
  </motion.h1>

</AnimatePresence>

        {/* Error Message */}
        {
          error && (
            <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )
        }

        {/* Full Name */}
        <AnimatePresence mode="wait">

  {!isLogin && (

    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
    >

      <input
        type="text"
        name="fullName"
        placeholder="Jane Doe"
        value={formData.fullName}
        onChange={handleChange}
       className="
w-full
mb-5
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
"
      />

    </motion.div>

  )}

</AnimatePresence>

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
className="
w-full
mb-5
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
"        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
className="
w-full
mb-5
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
"        />

        {/* Confirm Password */}
      <AnimatePresence>

  {!isLogin && (

    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
    >

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        className="
w-full
mb-5
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
"
      />

    </motion.div>

  )}

</AnimatePresence>

        {/* Submit Button */}
        <motion.button
  type="submit"
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  className="w-full bg-gradient-to-r
from-[#6D5EF8]
to-[#7B6CF8]
font-semibold
text-lg text-white py-3 rounded-lg"
>
  {isLogin ? "Login" : "Signup"}
</motion.button>

        {/* Toggle Login Signup */}
        <p className="text-center mt-6 text-gray-600">

          {
            isLogin
              ? "Don't have an account?"
              : "Already have an account?"
          }

          <button
            type="button"
            onClick={() => {

setIsLogin((prev) => !prev);
              setError("");

            }}
            className="text-blue-600 font-semibold ml-2"
          >

            {isLogin ? "Signup" : "Login"}

          </button>

        </p>

      </motion.form>

  </div>

</div>
     

    

  );

}

export default LoginPage;

