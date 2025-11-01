# 🔐 Password Manager

A secure and interactive **Password Manager** built with **React** for the frontend and **MongoDB + Node.js** for backend storage.  
This application allows users to **safely store, manage, and retrieve passwords** with encryption, clean UI, and smooth user experience.
---

## 🚀 Features

✅ **User Authentication**
- Secure signup/login system  
- Passwords hashed using **bcrypt**  
- Login authentication using **JWT tokens**  

✅ **Encrypted Password Storage**
- All saved passwords are **AES-encrypted** before being stored in MongoDB  
- No plain-text password storage anywhere in the system  

✅ **Interactive & Responsive UI**
- Built using **React + Vite**  
- Clean and modern interface with great **user experience**  
- Fully responsive — supports mobile, tablet, and desktop view  

✅ **Password Management**
- Add, edit, and delete saved credentials  
- Copy password to clipboard instantly  
- Built-in **password strength indicator and password generator**  
- Search and filter saved passwords easily

✅ **User-Friendly Experience**
- Smooth animations and transitions  
- Auto-hide passwords for privacy  
- Minimal clicks to access or add new credentials
- 
---

## 🛠️ Tech Stack

Frontend: React.js, HTML, CSS, JavaScript  
Backend: Node.js, Express.js  
Database: MongoDB / MongoDB Atlas  
Security: JWT Authentication, bcrypt.js  
Version Control: Git & GitHub  

---

## 📁 Project Structure

Password-Manager  
│  
├── client/  → React Frontend  
│   ├── src/  
│   │   ├── components/      → UI Components  
│   │   ├── pages/           → Login, Signup, Dashboard  
│   │   ├── App.jsx  
│   │   └── main.jsx  
│   └── package.json  
│  
├── server/  → Backend (Node.js + MongoDB)  
│   ├── models/             → MongoDB Schemas  
│   ├── routes/             → API Routes  
│   ├── controllers/        → Logic + Functions  
│   ├── server.js           → Main Server File  
│   └── package.json  
│  
└── README.md  

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
git clone https://github.com/YourUsername/Password-Manager.git  
cd Password-Manager  

### 2️⃣ Install Dependencies  
Frontend:  
cd client  
npm install  

Backend:  
cd ../server  
npm install  

### 3️⃣ Add Environment Variables  
Create a `.env` file inside `server/` and add:  
MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_secret_key  
PORT=5000  

---

## ▶️ Running the App

Start Backend:  
cd server  
npm start  

Start Frontend:  
cd client  
npm start  

Frontend runs at: http://localhost:3000  
Backend runs at: http://localhost:5000  

---

## 🔒 Security Features

- Passwords are encrypted using **bcrypt.js**  
- **JWT tokens** used for user login sessions  
- Secure environment variables using `.env`  
- No passwords stored in plain text  

---

## 🌟 Future Improvements

- Dark Mode UI  
- Password strength meter  
- Forgot password (email/OTP)  
- Browser extension for autofill  
- Mobile App using React Native  

---

## 🤝 Contributing

1. Fork this repo  
2. Create a new branch  
3. Commit changes  
4. Push and make a Pull Request  

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 👤 Author

**Md Masthan**  
GitHub: https://github.com/Masthan41
Email: mdmastan633@gmail.com  

---
