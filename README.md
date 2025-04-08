# 💸 PayMent App

A full-stack digital payment platform inspired by PayTM. Users can register, transfer money, and view their transaction history securely.

---

## 🚀 Features

### 👤 User Authentication
- Signup and Login with Gmail verification

- Password encryption

### 💳 Money Transfer
- Transfer money between registered users
- Transaction limits and error handling



---

## 🛠️ Tech Stack

### Frontend
- React
- Tailwind CSS
- React Router
- Axios
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- Zod for input validation
- JWT for authentication
- dotenv for config management

---

## 📁 Project Structure

PayMent-main/ ├── backend/ │ ├── routes/ # Express routes (user, account, transaction) │ ├── api/ # API logic │ ├── config.js # App configuration │ ├── db.js # MongoDB connection │ ├── index.js # Server entry point │ └── middleware.js # Auth middleware │ ├── frontend/ │ ├── components/ # Reusable React components │ ├── pages/ # Page-level components (Login, Signup, Dashboard, etc.) │ ├── App.jsx # Main App logic │ ├── main.jsx # ReactDOM render │ └── tailwind.config.js

yaml
Copy
Edit

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js
- MongoDB (local or Atlas)


### 1. Clone the repository

```bash
git clone https://github.com/yourusername/PayMent-main.git
cd PayMent-main
2. Backend Setup
bash
Copy
Edit
cd backend
npm install
Create a .env file in the backend directory:

ini
Copy
Edit
PORT=5000
MONGO_URL=mongodb://localhost:27017/payments
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
Start backend server:

bash
Copy
Edit
npm start
3. Frontend Setup
bash
Copy
Edit
cd ../frontend
npm install
npm run dev


All sensitive information is stored in .env and never committed





Admin panel for monitoring

📧 Contact
Developed by Soumyadip Chatterjee