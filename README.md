# ESS Internship Portal Backend

The **ESS Internship Portal Backend** is a RESTful API service developed to streamline and support internship application management. It provides secure APIs for submitting applications, managing applicants, administrator authentication, file uploads, and handling contact messages.

---

## Tech Stack

* **Runtime Environment:** Node.js
* **Framework:** Express.js
* **Database:** MySQL
* **Authentication:** JWT (JSON Web Tokens)
* **File Uploads:** Multer
* **Configuration:** dotenv
* **Security & Sharing:** CORS

---

## Project Structure

```text
├── controllers/
├── middleware/
├── routes/
├── uploads/
├── database/
│   └── internship_schema.sql
├── server.js
├── package.json
├── package-lock.json
└── README.md
---


## Requirements

Before running the project, install:

- Node.js
- MySQL

---

## Installation

Clone the repository:

```bash
git clone https://github.com/melkamubekelem46-dot/internship-backend.git

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

---

## Environment Configuration

Create a `.env` file in the backend root directory:

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=ess_portal

JWT_SECRET=your_jwt_secret
```