# Udyam Registration Form Clone

A full-stack web application that replicates the first two steps of the **Udyam Registration** process with responsive UI, backend validation, and web scraping.  
The project is **live deployed on Render**.

---

## 📌 Project Overview

This application mimics **Step 1 (Aadhaar + OTP Validation)** and **Step 2 (PAN Validation)** from the [Udyam Registration Portal](https://udyamregistration.gov.in/UdyamRegistration.aspx).  
It includes:

- **Frontend**: Responsive React UI replicating the original portal’s design.
- **Scraping**: Puppeteer-based extraction of field names, validation rules, and dropdowns from the official site.
- **Backend**: REST API for validating and storing form data.
- **Testing**: Jest-based unit tests for validation and API endpoints.
- **Deployment**: Hosted live on Render.

---

## 🛠 Tech Stack

**Frontend**  
- React (with hooks & functional components)  
- Responsive design (mobile-first)  
- Real-time validation  

**Backend**  
- Node.js & Express  
- PostgreSQL (via Prisma ORM)  
- REST API endpoints for validation & storage  

**Scraping**  
- Puppeteer for automated field and validation rule extraction  

**Testing**  
- Jest for unit tests (form validation & API endpoints)  

**Deployment**  
- Frontend + Backend deployed on **Render**  

---

## ✨ Features

- **Pixel-perfect UI** matching Udyam’s Step 1 & 2  
- **Real-time validation** for Aadhaar & PAN formats  
- **Dynamic rendering** of form fields from scraped schema  
- **Progress tracker** for step navigation  
- **Optional PIN code-based city/state autofill**  
- **Full responsiveness** for desktop, tablet, and mobile  
- **Persistent storage** in PostgreSQL  

---

## 📂 Project Structure

```
.
├── frontend/        # React application
├── backend/         # Node.js + Express server
├── scraping/        # Puppeteer scripts
├── tests/           # Jest test cases
└── README.md
```

---

## 🚀 Live Demo

**🔗 [View the Live Application on Render](https://your-live-app-url-here.com)**

---

## 🧪 Testing

Run all tests:

```bash
npm run test
```

Includes:
- Field validation tests
- API endpoint tests

---

## ⚙️ Installation & Setup

1. **Clone repository**
   ```bash
   git clone https://github.com/yourusername/udyam-clone.git
   cd udyam-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set environment variables**  
   Create a `.env` file in the root with:
   ```
   DATABASE_URL=postgresql://user:password@localhost:5432/dbname
   ```

4. **Run scraping script** (optional)
   ```bash
   node scraping/scraper.js
   ```

5. **Run development servers**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   ```
   http://localhost:3000
   ```

---

## 📜 License

This project is licensed under the MIT License.
