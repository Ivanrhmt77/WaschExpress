# WaschExpress 🧺🚀

**WaschExpress** is a modern, intelligent Laundry Management System designed to streamline operations for laundry businesses. It features a dual-application architecture: a robust **Node.js/Express backend** for logic & data management, and a sleek **Next.js frontend** for admin dashboards and customer tracking.

One of its standout features is an **AI-powered completion time predictor** that dynamically adjusts estimates based on current queue load and real-time weather conditions (rain delays drying\!).

-----

## 🛠 Technology Stack

### **Frontend (Client-Side)**

* **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
* **Language**: TypeScript / TSX
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **UI Components**: [Shadcn/ui](https://ui.shadcn.com/) (based on Radix UI)
* **Icons**: [Lucide React](https://lucide.dev/)
* **State/Data**: React Hooks, SWR/Fetch
* **Authentication**: Supabase Auth (Client)

### **Backend (Server-Side)**

* **Runtime**: [Node.js](https://nodejs.org/)
* **Framework**: [Express.js](https://expressjs.com/)
* **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
* **External APIs**: [Open-Meteo](https://open-meteo.com/) (Real-time weather data)
* **Testing**: Jest

-----

## 📂 Project Architecture

The project is a monorepo-style structure split into two main directories: `backend` and `frontend`.

### **1. Backend (`/backend`)**

Handles business logic, database interactions, and AI predictions.

| Folder/File | Description |
| :--- | :--- |
| **`routes/`** | Contains API route handlers. |
| ├── `jobs.js` | CRUD operations for laundry orders (jobs). |
| ├── `predict.js` | **AI Logic**: Calculates ETA based on queue size + weather. |
| ├── `queue.js` | Manages the processing queue logic. |
| ├── `submitJob.js` | Public endpoint for submitting new orders. |
| └── `customers.js` | Customer management endpoints. |
| **`utils/`** | Helper functions (e.g., feature extraction for predictions). |
| **`server.js`** | Main entry point; initializes Express app and middleware. |
| **`schema.sql`** | SQL script to set up the Supabase database schema & RLS. |
| **`supabaseClient.js`**| Configures the Supabase Admin client. |

### **2. Frontend (`/frontend`)**

Provides the user interface for Admins and Customers.

| Folder/File | Description |
| :--- | :--- |
| **`app/`** | Next.js App Router pages. |
| ├── `(public)/` | Landing page and public-facing routes. |
| ├── `admin/` | **Protected**: Dashboard, Order Entry, Customer List. |
| ├── `track/[id]/` | Public order tracking page for customers. |
| ├── `(auth)/login/` | Staff login page. |
| **`components/`** | Reusable UI components. |
| ├── `landing/` | Components for the homepage (Hero, Pricing, etc.). |
| ├── `order/` | Forms and tables for managing orders. |
| ├── `ui/` | Low-level UI blocks (Buttons, Inputs, Cards). |
| **`lib/`** | Utilities, type definitions, and API clients. |

-----

## 🚀 Getting Started

### **Prerequisites**

1. **Node.js** (v18 or higher)
2. **npm** or **pnpm**
3. **Supabase Account**: You need a project for the database.

### **1. Fork & Clone**

1. Click the **Fork** button at the top right of this repository.
2. Clone your forked repository:

    ```bash
    git clone https://github.com/YOUR_USERNAME/WaschExpress.git
    cd WaschExpress
    ```

### **2. Database Setup (Supabase)**

1. Create a new project in Supabase.
2. Go to the **SQL Editor** in your Supabase dashboard.
3. Copy the content of `backend/schema.sql`.
4. Run the script to create tables (`jobs`, `customers`, `predictions`) and set up Row Level Security (RLS) policies.
5. *Optional*: In Authentication \> Settings, turn off "Confirm email" if you want easier testing.

### **3. Backend Setup**

1. Navigate to the backend folder:

    ```bash
    cd backend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Configure Environment Variables:
      * Rename `.env.example` to `.env`.
      * Fill in your Supabase credentials:
    <!-- end list -->
    ```env
    SUPABASE_URL=your_supabase_project_url
    SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_(secret)
    PORT=4001
    ```

4. Start the server:

    ```bash
    npm run dev
    # Server runs on http://localhost:4001
    ```

### **4. Frontend Setup**

1. Open a new terminal and navigate to the frontend folder:

    ```bash
    cd frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Configure Environment Variables:
      * Rename `.env.example` to `.env.local`.
      * Fill in credentials:
    <!-- end list -->
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_(public)
    NEXT_PUBLIC_BACKEND_URL=http://localhost:4001
    ```

4. Start the development server:

    ```bash
    npm run dev
    # App runs on http://localhost:3000
    ```

-----

## ✨ Features & How to Use Them

### **1. Admin Dashboard**

A central hub for business owners to see real-time statistics.

* **How to access**: Go to `http://localhost:3000/admin`.
* **Features**:
  * View **Today's Revenue**.
  * Monitor **Active Orders** (currently washing).
  * Check **Machine Utilization** (simulated).
  * See a feed of **Recent Activity**.

### **2. Order Management (New Order)**

Staff can input walk-in orders efficiently.

* **How to use**:
    1. Navigate to `/admin/create-order`.
    2. **Select Customer**: Search for an existing customer or click "Add New" to create one (requires Name & Phone).
    3. **Choose Service**: Select "Regular" or "Express" wash.
    4. **AI Prediction**: As you add items, the system calls the backend to check the weather and queue.
          * *If it's raining in Jakarta, the system adds buffer time for drying\!* 🌧️
    5. **Submit**: Creates the order with status "Queued".

### **3. Smart Tracking System**

Customers can track their laundry status without logging in.

* **How to use**:
    1. Copy an `Order ID` from the Admin dashboard (e.g., `a1b2-c3d4...`).
    2. Go to `http://localhost:3000/track/YOUR_ORDER_ID`.
    3. **View**:
          * Current Status (Queued, Washing, Done).
          * **Estimated Completion Time** (calculated by the AI model).
          * Weather condition affecting their order.

### **4. AI Prediction Logic**

The backend (`backend/routes/predict.js`) performs intelligent estimation:

1. **Queue Analysis**: Checks how many jobs are currently "Queued" or "Processing".
2. **Weather Check**: Queries the Open-Meteo API for real-time weather in the laundry location (default: Jakarta).
      * **Rain/Thunderstorm**: Adds +30 minutes to the total time.
      * **Clear/Cloudy**: Standard processing time.
3. **Operational Hours**: Adjusts the completion date. If the predicted time goes past closing (e.g., 8 PM), the completion time rolls over to the next morning at 8 AM.

-----

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/AmazingFeature`).
2. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
3. Push to the branch (`git push origin feature/AmazingFeature`).
4. Open a Pull Request.

-----

## 📄 License

This project is for educational and portfolio purposes. Please credit **WaschExpress** if used as a base for other projects.
