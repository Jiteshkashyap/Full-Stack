# Delivery Admin Dashboard (MERN Stack)

Industry-ready Admin Panel for a Delivery Application (Grocery /Blinkit-style).

---

## 1. Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (local or Atlas)
- Git

---

### Clone Repository
git clone <YOUR_GITHUB_REPO_URL>
cd Full-Stack

---

### Backend Setup
cd backend
npm install

Create a `.env` file inside `backend` folder:

PORT=8000  
MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_jwt_secret  

Run backend:
npm run dev

Backend runs on:
http://localhost:8000

---

### Frontend Setup
cd frontend
npm install
npm run dev

Frontend runs on:
http://localhost:5173

---

## 2. API List

### Admin Authentication
POST /api/admin/login

---

### Category APIs
POST   /api/category/create  
GET    /api/category/all  
PUT    /api/category/:id/update  
DELETE /api/category/:id/delete  

---

### Sub-Category APIs
POST   /api/subcategory/:categoryId/create  
GET    /api/subcategory/all  
PUT    /api/subcategory/:id/update  
DELETE /api/subcategory/:id/delete  

---

### Product APIs
POST   /api/product/:categoryId/:subCategoryId/create  
GET    /api/product/all  
PUT    /api/product/:categoryId/:subCategoryId/:productId/update  
DELETE /api/product/:categoryId/:subCategoryId/:productId/delete  

---

### Swagger API Docs
http://localhost:8000/api-docs

---

## 3. Database Schema (MongoDB)

### Category
{
  name: String,
  status: Boolean
}

---

### Sub-Category
{
  name: String,
  category: ObjectId,
  status: Boolean
}

---

### Product
{
  productName: String,
  brand: String,
  sku: String,
  unit: String,
  description: String,
  images: Array,
  category: ObjectId,
  subCategory: ObjectId,
  status: Boolean
}

---

