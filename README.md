# 📘 Learning Portal – Reading Synopsis + Gen AI Grading

## 📌 Project Overview

This project is a full-stack web application where participants of a corporate learning program can submit a reading synopsis. The system simulates sending the synopsis to a GenAI service, which returns a score and feedback. Admins can view and filter submissions based on title or score.

---

## 🛠 Tech Stack

- **Frontend**: React.js & Redux toolkit 
- **Backend**: Node.js with Express.js
- **Database**: MongoDB 
- **Mock GenAI API**: Simulates evaluation of submitted synopsis

---

## 🚀 Setup Instructions

### 🔧 Backend

1. Navigate to the Server folder.
2. Install dependencies:
3. 
   ```bash
   npm install

3.Create a .env file and add your environment variables:
# .env file
MONGO_URI=mongodb://localhost:27017/catalyst


PORT=3000

Start the backend server:

npm run dev

### 🔧 Frontend

Navigate to the Client folder.
Install dependencies:

npm install

Start the frontend application:

npm start

### 🔧 Database Mongo DB Compass

Use default local connection string:

mongodb://localhost:27017/learning_portal




🧠 GenAI Simulation

💡 Purpose

To emulate a real-world scenario where submitted content is evaluated by a GenAI system for structure, insightfulness, and originality. The simulation helps mimic how such a system might behave using a mock scoring engine.

⚙️ How It Works

Instead of connecting to a real AI service (e.g., OpenAI, Anthropic, etc.), we use a mock function that:

Accepts the synopsis text.

Randomly generates a score between 0 and 10.

Associates the score with preset feedback messages like:

"Excellent summary! Well-structured and insightful."

"Good effort, but consider adding more detail or depth."

If the score > 8.0, the system assumes high likelihood of AI usage and sets:

score = 0

feedback: "The submission appears to be heavily assisted by AI. Please try to write in your own words"

✅ Features Completed

 Participant form with validation (min 100 words)

 Simulated GenAI score and feedback

 Admin table view of all submissions

 Filtering by title and score

 Database integration



 ![image](https://github.com/user-attachments/assets/be7c24ed-b7b8-4af6-9abc-e29f218cf784)

 ![image](https://github.com/user-attachments/assets/b8eb1304-f006-4f8b-a19c-319da8a5a89a)


