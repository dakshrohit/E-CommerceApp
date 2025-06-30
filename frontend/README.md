# 🛍️ MERN E-Commerce App

A fully responsive, feature-rich, and modular **e-commerce web application** built using the **MERN stack** with modern UI/UX principles, custom components, and scalable architecture.

---

## 🚀 Tech Stack

| Layer      | Technology                 | Purpose                                             |
|------------|----------------------------|-----------------------------------------------------|
| Frontend   | React                      | Component-based UI architecture                     |
| Styling    | Tailwind CSS               | Utility-first, responsive design system             |
| Animations | Framer Motion              | Smooth UI transitions and micro-interactions        |
| State      | React Context + useReducer | Global state management (Auth & Cart)               |
| Routing    | React Router               | SPA routing and navigation                          |
| Backend    | Node.js + Express.js       | RESTful API & business logic                        |
| Database   | MongoDB + Mongoose         | MongoDB database to store users, products, orders     |
| Auth       | JWT + Cookies              | Secure login/session management                     |
| Payments   | (Planned: Razorpay)        | Gateway integration for order checkout              |
| Hosting    | Ngrok (for testing)        | Secure tunneling to local development server        |

---

## ✅ Features — Implemented

### 🔐 Authentication (Buyer/Seller)
- Signup and login forms with validation  
- JWT-based secure authentication  
- Auto-login using cookie persistence  
- Role-based conditional rendering *(seller features coming soon)*  

### 🛒 Cart System
- Add to Cart with quantity handling  
- Global cart context using `useReducer`  
- Actions: `ADD_TO_CART`, `REMOVE_FROM_CART`, `INCREASE_QUANTITY`, `DECREASE_QUANTITY`, `CLEAR_CART`  
- Toast notifications with `react-hot-toast`  

### 🧾 Checkout
- Cart + *Buy Now* checkout support  
- Address input section  
- Route handling via **params** and **query params**  
- Framer Motion-based animations  

### 📦 Orders
- “My Orders” page shows all user orders  
- Each order displays:
  - Order ID
  - Date placed
  - List of items with quantity & price  
- Total amount shown  
- Secure `credentials: "include"` fetch  

### ✅ Success Page
- Clean confirmation page  
- Navigation buttons to:
  - Home
  - Orders  

### 👤 Profile Page
- Display logged-in user details: name, email, role  
- Protected route using cookies  

### 🎨 UI/UX
- Fully responsive across all screen sizes  
- Dark theme: Blue + Gray + Black palette  
- Card animations, page transitions  
- All feedback via toast notifications  
- Custom Tailwind components + few ShadCN components

---

## 🔧 Project Structure (Monorepo)


---

## 📦 Features — Planned

### 🧑‍💼 Seller Functionality
- Upload products  
- Inventory management  
- Seller dashboard  

### 💳 Razorpay Payment Gateway
- Seamless checkout flow  
- Order status updates  
- Razorpay validation  

### 📦 Admin Features
- Admin dashboard  
- View/update/delete products and orders  

### 📝 Reviews & Ratings
- Users can review products  
- Rating average shown on product page  

### 🔔 Notifications
- Toast/modals for shipping and delivery  
- Order status messages  

### 📜 Order Tracking
- Real-time updates *(WebSocket or polling planned)*  

### 🎁 Coupons & Discounts
- Backend promo code logic  
- UI input at checkout  

### 🧪 Testing
- Jest + React Testing Library for frontend  
- Postman or Supertest for backend  

---

## 📌 Environment Setup

### 1. Backend

```bash
cd backend
npm install
npm run dev
```
### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

### 3. Ngrok 

```bash
cd backend
npm install
npm run dev
```




