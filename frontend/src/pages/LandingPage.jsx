import { Link } from "react-router-dom"
import {
  FiDollarSign,
  FiBarChart2,
  FiPieChart,
  FiTrendingUp,
  FiShield,
  FiBriefcase,
} from "react-icons/fi";
import { HiOutlineWallet } from "react-icons/hi2";
function LandingPage() {
  return (
<div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0b1120] to-[#111827] text-white">      {/* Navbar */}
<nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#050b22]/80 border-b border-white/10"> 
 <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
<div className="flex items-center gap-3">
<div
  className="
  w-12 h-12
  rounded-full
  bg-gradient-to-br
  from-violet-400
  to-purple-600
  flex items-center justify-center
  "
>
  <HiOutlineWallet className="text-white text-2xl" />
</div>
  <h1 className="text-3xl font-serif text-white">
    ExpenseTracker
  </h1>
</div>
<div className="hidden md:flex items-center gap-10 text-slate-300">    
    <a href="#home" className="hover:text-blue-600">Home</a>
      <a href="#features" className="hover:text-blue-600">Features</a>
      <a href="#about" className="hover:text-blue-600">About</a>
    </div>

    <div className="space-x-3">
      <Link
  to="/login"
  className="text-slate-300 hover:text-white transition"
>
        Login
      </Link>

     <Link
  to="/login"
  className="px-6 py-3 rounded-full bg-violet-500 hover:bg-violet-400 transition font-semibold"
>
        Signup
      </Link>
    </div>

  </div>
</nav>

      {/* Hero Section */}
      <section
  id="home"
className="relative pt-32 pb-20 overflow-hidden"
><div className="flex justify-center mb-8">
  <div className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300">
    ✨ New • Multi-business workspaces
  </div>
</div>
  <div className="max-w-7xl mx-auto px-6">

<div className="max-w-7xl mx-auto text-center px-6">      <div>
<h1 className="text-6xl md:text-7xl lg:text-6xl font-serif text-[#d9d7ff] leading-[0.95] tracking-tight mb-8 max-w-6xl mx-auto">
  Manage Your Business
  <br />
  Finances Easily
</h1>

<p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto mb-12 leading-relaxed">
  Track income, expenses, profit and analytics for multiple
  businesses in one place.
</p>

<div className="flex justify-center gap-6">    
       <Link
  to="/signup"
  className="px-8 py-4 rounded-full bg-violet-500 hover:bg-violet-400 transition font-semibold"
>
  Start Free →
</Link>

         <Link
  to="/login"
  className="px-8 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl"
>
  Sign In
</Link>
        </div>
      </div>

      

    </div>

  </div>
</section>
      {/* Features Section */}
     <section
  id="features"
  className="pt-16 pb-32"
>
  <div className="max-w-7xl mx-auto px-6">

    <h2 className="text-5xl md:text-6xl font-serif text-center text-[#d9d7ff] mb-6">
  Everything you need to run the numbers
</h2>

<p className="text-center text-slate-300 text-xl mb-20">
  A focused toolkit designed for modern businesses.
</p>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:-translate-y-2 transition-all duration-300">

  <div className="w-14 h-14 rounded-2xl bg-violet-500/20 flex items-center justify-center mb-6">
    <FiDollarSign size={26} className="text-violet-400"/>
  </div>

  <h3 className="text-3xl font-serif text-white mb-4">
    Expenses & Income
  </h3>

  <p className="text-slate-300">
Track every transaction with categories,
filters and one-click editing.  </p>

</div>
<div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:-translate-y-2 transition-all duration-300">

  <div className="w-14 h-14 rounded-2xl bg-violet-500/20 flex items-center justify-center mb-6">
   <FiBarChart2 size={26} className="text-violet-400"/>
  </div>

  <h3 className="text-3xl font-serif text-white mb-4">
Live Dashboards
  </h3>

  <p className="text-slate-300">
View profit, income and expenses
in real time.  </p>

</div>
<div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:-translate-y-2 transition-all duration-300">

  <div className="w-14 h-14 rounded-2xl bg-violet-500/20 flex items-center justify-center mb-6">
    <FiPieChart size={26} className="text-violet-400"/>
  </div>

  <h3 className="text-3xl font-serif text-white mb-4">
Smart Analytics
  </h3>

  <p className="text-slate-300">
    Beautiful charts and reports
for business insights.
  </p>

</div>
<div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:-translate-y-2 transition-all duration-300">

  <div className="w-14 h-14 rounded-2xl bg-violet-500/20 flex items-center justify-center mb-6">
    <FiTrendingUp size={26} className="text-violet-400" />
  </div>

  <h3 className="text-3xl font-serif text-white mb-4">
    Profit Trends

  </h3>

  <p className="text-slate-300">
    Monitor monthly growth
and performance.
  </p>

</div>
<div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:-translate-y-2 transition-all duration-300">

  <div className="w-14 h-14 rounded-2xl bg-violet-500/20 flex items-center justify-center mb-6">
<FiShield size={26} className="text-violet-400"/>  </div>

  <h3 className="text-3xl font-serif text-white mb-4">
  Secure Authentication

  </h3>

  <p className="text-slate-300">
    JWT protected login
and account security.
  </p>

</div>
<div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:-translate-y-2 transition-all duration-300">

  <div className="w-14 h-14 rounded-2xl bg-violet-500/20 flex items-center justify-center mb-6">
    <FiBriefcase size={26} className="text-violet-400"/>
  </div>

  <h3 className="text-3xl font-serif text-white mb-4">
    Multi-Business

  </h3>

  <p className="text-slate-300">
Manage multiple businesses
from one account.  </p>

</div>
</div>
  </div>
</section>


<section className="pt-16 pb-32">

  <h2 className="text-5xl md:text-6xl font-serif text-center text-[#d9d7ff] mb-6">
  A dashboard you'll actually open
</h2>

<p className="text-center text-slate-300 text-xl mb-20">
  Modern analytics, beautiful charts and instant insights.
</p>
<div className="max-w-7xl mx-auto px-6">

  <div className="bg-white/5 border border-white/10 rounded-[40px] p-8 backdrop-blur-xl">

    <div className="flex gap-3 mb-8">
      <div className="w-3 h-3 rounded-full bg-red-400" />
      <div className="w-3 h-3 rounded-full bg-yellow-400" />
      <div className="w-3 h-3 rounded-full bg-green-400" />
    </div>

    <div className="grid md:grid-cols-3 gap-6 mb-8">

      <div className="bg-[#0d1635] rounded-3xl p-6 border border-white/10">
        <p className="text-slate-400">Total Income</p>
        <h3 className="text-5xl font-serif tracking-tight text-emerald-400 mt-4">
  ₹48,920
</h3>
      </div>

      <div className="bg-[#0d1635] rounded-3xl p-6 border border-white/10">
        <p className="text-slate-400">Total Expenses</p>
        <h3 className="text-5xl font-serif tracking-tight text-amber-400 mt-4">
          ₹21,430
        </h3>
      </div>

      <div className="bg-[#0d1635] rounded-3xl p-6 border border-white/10">
        <p className="text-slate-400">Net Profit</p>
        <h3 className="text-5xl font-serif tracking-tight text-violet-400 mt-4">
          ₹27,490
        </h3>
      </div>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
<div className="md:col-span-2 bg-[#0d1635] rounded-3xl h-[350px] border border-white/10 flex items-end gap-4 p-8">
  <div className="w-10 bg-gradient-to-t from-violet-700 to-violet-400 rounded-t-full h-32"></div>

  <div className="w-10 bg-gradient-to-t from-violet-700 to-violet-400 rounded-t-full h-24"></div>

  <div className="w-10 bg-gradient-to-t from-violet-700 to-violet-400 rounded-t-full h-48"></div>

  <div className="w-10 bg-gradient-to-t from-violet-700 to-violet-400 rounded-t-full h-28"></div>

  <div className="w-10 bg-gradient-to-t from-violet-700 to-violet-400 rounded-t-full h-64"></div>

  <div className="w-10 bg-gradient-to-t from-violet-700 to-violet-400 rounded-t-full h-40"></div>

  <div className="w-10 bg-gradient-to-t from-violet-700 to-violet-400 rounded-t-full h-56"></div>
  <div className="w-10 bg-gradient-to-t from-violet-700 to-violet-400 rounded-t-full h-32"></div>

  <div className="w-10 bg-gradient-to-t from-violet-700 to-violet-400 rounded-t-full h-24"></div>

  <div className="w-10 bg-gradient-to-t from-violet-700 to-violet-400 rounded-t-full h-48"></div>

  <div className="w-10 bg-gradient-to-t from-violet-700 to-violet-400 rounded-t-full h-28"></div>
  
  <div className="w-10 bg-gradient-to-t from-violet-700 to-violet-400 rounded-t-full h-28"></div>

  <div className="w-10 bg-gradient-to-t from-violet-700 to-violet-400 rounded-t-full h-64"></div>

  <div className="w-10 bg-gradient-to-t from-violet-700 to-violet-400 rounded-t-full h-40"></div>


</div>
<div className="bg-[#0d1635] rounded-3xl h-[350px] border border-white/10 flex items-center justify-center">

  <div className="relative">

    <div className="w-48 h-48 rounded-full border-[18px]
      border-violet-500
      border-t-pink-400
      border-r-cyan-400
      border-b-amber-400">
    </div>

    <div className="absolute inset-0 flex items-center justify-center text-white text-xl">
      Spend
    </div>

  </div>

</div>

    </div>
</div>
  


    </div>

</section>



<section
  id="about"
  className="pt-12 pb-32"
>
  <div className="max-w-7xl mx-auto px-6 text-center">

    <h2 className="text-5xl md:text-6xl font-serif text-[#d9d7ff] mb-8">
      Built for ambitious operators
    </h2>

    <p className="max-w-5xl mx-auto text-xl text-slate-300 leading-relaxed">
      ExpenseTracker gives business owners, freelancers and
      growing teams the financial visibility they need.
      Track every rupee, understand every trend and make
      confident decisions from one beautiful workspace.
    </p>

  </div>
</section>





      {/* Footer */}
    <footer className="border-t border-white/10 py-10">

  <div className="max-w-7xl mx-auto px-6 text-center">

    <h3 className="text-2xl font-serif text-[#d9d7ff] mb-3">
      ExpenseTracker
    </h3>

    <p className="text-slate-400 mb-3">
      Built with React • Flask • MongoDB
    </p>

    <p className="text-slate-500 text-sm">
      © 2026 ExpenseTracker. All Rights Reserved.
    </p>

  </div>

</footer>
    </div>
  )
}

export default LandingPage