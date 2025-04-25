# GBU CRC PORTAL

GBU CRC Portal is an online job portal that connects students and recruiters, making the placement process hassle-free.

## Why gbu crc portal is made?

- To bridge the gap between recruiters and students (reducing the involvement of the college).
- To eliminate the use of Google Forms and make the process more professional.
- To avoid repetitive form-filling for students.
- To simplify data management for the university.
- To Get ATS Score Free for Student.

## Tech Stack

- React.js(Frontend)
- Tailwindcss(Styling)
- Chart.js(Graph Data)
- Quills(Rich Text Editor)
- Express.js(Backend)
- Json Web Token(Authentication)
- MongoDB(Database)
- Cloudinary(Image/Resume Storage)
- Zod(Validation)
- Nodemailer(Mail Sending)
- Redis(Queue)
- Langchain(AI services)
- Qdrant(vector database)

## Project Setup

For frontend:

- go to frontend directory
  ```bash
  cd client
  ```
- install all package
  ```bash
  npm install
  ```
- Start Frontend Server
  ```bash
  npm run dev
  ```

For Backend:

- go to Server directory
  ```bash
  cd server
  ```
- install all package
  ```bash
  npm install
  ```
- Start Server Server
  ```bash
  npm start
  ```

For Workers:

- go to Workers directory

  ```bash
   cd workers
  ```

- install all package
  ```bash
  npm install
  ```
- Start Worker Server
  ```bash
  npm start
  ```

## ENV File Setup

For frontend:

```bash
VITE_BACKEND_URL = http://localhost:3000
```

For Backend:

```bash
JWT_SECRET =
MONGODB_URI =
CLOUDINARY_NAME =
CLOUDINARY_API_KEY =
CLOUDINARY_SECRET_KEY =
EMAIL_USER =
EMAIL_PASS =
```
