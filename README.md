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
```

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
```

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

---

## Database Setup

The database schema is included in:

```text
database/internship_schema.sql
```

Import this file into MySQL before running the backend server.

---

## Running the Server

Development mode:

```bash
npm run dev
```

Start server:

```bash
npm start
```

The API will run on:

```text
http://localhost:5000
```

---

## Main API Routes

### Admin Authentication

```http
POST /api/admin/login
```

### Applications

```http
POST   /api/applications
GET    /api/applications
PUT    /api/applications/:id/status
DELETE /api/applications/:id
```

### Contact Messages

```http
POST   /api/messages
GET    /api/messages
PUT    /api/messages/:id/read
DELETE /api/messages/:id
```

---

## Authentication

The system uses JWT (JSON Web Token) authentication for administrator access.

Protected routes require a valid authentication token. The token is generated after successful admin login and must be included in requests to access secured endpoints.

---

## File Upload

The system uses Multer middleware to handle applicant document uploads.

Supported file types:

- PDF
- DOC
- DOCX
- JPG
- PNG

Uploaded files are stored in the backend `uploads` directory.v