HR Project

A full-stack HR management application built with React (frontend) and Node.js/Express (backend), featuring PostgreSQL for data storage and AI-powered feedback rephrasing.

---

Instructions to Run the App

### Prerequisites

- Node.js (v18+ recommended)
- Python 3 (for local AI paraphrasing, optional)
- PostgreSQL database

1. Setup the Database

- Create a PostgreSQL database named `employees`.
- Create the required tables (`users`, `employees`, `feedbacks`, `absences`) as referenced in the backend code.

2. Backend Setup

```sh
cd src-backend
npm install
# Configure your database credentials in index.js if needed
# Ensure .env contains valid API keys for SAPLING_TOKEN and HUGGING_FACE_BART_TOKEN
npm start
```
The backend will run on [http://localhost:8080](http://localhost:8080).

#### (Optional) Local AI Paraphrasing Server

If you want to use the local paraphrasing model:
```sh
cd src-backend
pip install flask transformers torch
python rephrase_server.py
```
This will start a Flask server on port 5000.

3. Frontend Setup

```sh
cd src-frontend
npm install
npm run dev
```
The frontend will run on [http://localhost:5173](http://localhost:5173).

---

## Architecture Notes

- **Frontend:** React with Redux Toolkit for state management, React Router for navigation, and Tailwind CSS for styling.
- **Backend:** Node.js with Express, using PostgreSQL for persistent storage. API endpoints handle authentication, employee data, absences, and feedback.
- **AI Feedback Rephrasing:** Integrated with Sapling AI API (default), with options for Hugging Face API or a local Pegasus paraphraser model via Flask.
- **Separation of Concerns:** Clear separation between frontend and backend, with RESTful API design.
- **Role-based Access:** Different user roles (manager, co-worker, employee) have different permissions for data access and actions.

---

## Improvements with More Time

- **Testing:** Add unit and integration tests for both frontend and backend.
- **Error Handling:** Improve error messages and user feedback throughout the app.
- **Security:** Implement password hashing, JWT-based authentication, and better input validation.
- **UI/UX:** Enhance the design, add loading states, and improve responsiveness.
- **CI/CD:** Set up automated deployment and continuous integration pipelines.
- **Documentation:** Add API documentation and more detailed setup instructions.
- **Scalability:** Refactor backend for modularity and scalability (e.g., using services/controllers).
- **Performance:** Optimize database queries and React rendering for large datasets.
- **Internationalization:** Add support for multiple languages.
- **Usage of TypeScript:** I strogly consider the usage of TypeScript for a production version.

---

Time spent: 1 week

---
