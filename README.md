
# Business Expense Tracker

## 📌 Overview

Business Expense Tracker is a full-stack web application designed to help business owners manage their finances efficiently. The application allows users to manage multiple businesses under a single account, track income and expenses, analyze financial performance, and generate profit/loss insights through interactive dashboards and reports.

---

## 🚀 Features

### 🔐 Authentication

* User Registration & Login
* JWT Authentication
* Secure Password Hashing
* Protected Routes

### 🏢 Multi-Business Management

* Create and manage multiple businesses
* Business selection dashboard
* Switch between businesses
* Edit or delete businesses

### 📊 Dashboard

* Total Income Overview
* Total Expense Overview
* Net Profit/Loss Calculation
* Recent Transactions
* Financial Summary Cards
* Interactive Charts & Analytics

### 💸 Expense Management

* Add Expenses
* Edit Expenses
* Delete Expenses
* Search Expenses
* Filter by Category
* Custom Categories Support

### 💰 Income Management

* Add Income
* Edit Income
* Delete Income
* Income History Tracking
* Custom Categories Support

### 📈 Analytics

* Monthly Income Analysis
* Monthly Expense Analysis
* Profit Trends
* Category-wise Spending Analysis
* Pie Charts
* Bar Charts
* Line Charts

### 📝 Transactions

* Complete Transaction History
* Search Transactions
* Filter by Date
* Filter by Category
* Filter by Amount

### ⚙️ Settings

* Update Business Details
* Change Currency
* Add New Business
* Switch Businesses
* Delete Business

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Tailwind CSS
* React Router DOM
* Axios
* Recharts

### Backend

* Flask
* Flask-JWT-Extended
* Flask-CORS

### Database

* MongoDB Atlas

---

## 📂 Project Structure

```bash
business-expense-tracker/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── services/
│   │   ├── context/
│   │   └── assets/
│   │
│   └── package.json
│
├── backend/
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   ├── middleware/
│   ├── config/
│   └── app.py
│
└── README.md
```

---

## 🔄 Application Flow

1. User Registration/Login
2. Business Setup
3. Business Selection
4. Dashboard Access
5. Manage Income & Expenses
6. View Analytics
7. Track Transactions
8. Manage Business Settings

---

## 📊 Profit Calculation

```text
Profit / Loss = Total Income - Total Expenses
```

Positive Value → Profit

Negative Value → Loss

---

## 🎯 Future Enhancements

* PDF Report Generation
* Excel Export
* Dark Mode
* Email Notifications
* AI-Based Expense Insights
* Mobile Application
* Budget Planning Module

---

## 💻 Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/business-expense-tracker.git
cd business-expense-tracker
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Backend Setup

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate

pip install -r requirements.txt

python app.py
```

### Environment Variables

Create a `.env` file inside the backend folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_secret_key
```

---

## 📸 Screenshots

Add screenshots of:

* Landing Page
* Dashboard
* Income Management
* Expense Management
* Analytics
* Settings

---

## 🎓 Project Purpose

This project was built to demonstrate full-stack development skills including:

* React Frontend Development
* Flask REST APIs
* MongoDB Database Integration
* JWT Authentication
* Dashboard UI Design
* Data Visualization with Recharts
* Multi-Business Management Logic

---

## 👨‍💻 Author

**Anirudh Chekkilla**

Business Expense Tracker – Full Stack Finance Management Application.
