# Voice Enabled Task Tracker

The Voice-Enabled Task Tracker is a full-stack productivity application built to create, manage, and track tasks using natural language voice commands. The frontend is developed with React.js, styled using TailwindCSS, and integrates the React Speech Recognition library to convert spoken input into structured task data such as title, priority, due date, and status.

On the backend, the application uses Node.js and Express.js to provide a clean REST API for CRUD operations. All task data is stored securely in MongoDB, ensuring fast, scalable, and reliable data persistence.

This project demonstrates seamless integration of voice processing, natural-language extraction, intuitive UI design, and modern API-driven architecture.

## Prerequisites

| Requirement | Version / Notes                                   |
| ----------- | ------------------------------------------------- |
|   Node.js   | Recommended: **v18+**                             |
|   MongoDB   | MongoDB Atlas (Cloud DB)                          |
|   NPM       | v8+                                               |
|   Browser   | Chrome recommended (SpeechRecognition works best) |

## Install & Run Steps

## Run This

Clone the Repository:

git clone https://github.com/aafrinshahas/voice-enabled-task-backend.git

Install Dependencies:

npm install

Run This Project:

npm run dev

## Frontend Setup (React + Vite)

cd frontend

npm install

npm run dev

## Tech Stack used in Frontend

- React (Vite)
- TailwindCSS (Vite)
- Axios
- date-fns
- react-speech-recognition

## Backend Setup (Node + Express + MongoDB)

cd backend

npm install

npm run start or npm start

## Tech Stack used in Backtend

- Node.js
- Express.js
- Mongoose
- CORS
- dotenv

## Database

MongoDB Atlas

## MongoDB Atlas Setup

Go to https://cloud.mongodb.com

Create a free cluster

Create database: taskDB

Create collection: tasks

Copy the connection string and paste into .env


## Environment Variables

Create a .env file inside backend

MONGO_URI=your-mongodb-atlas-url
PORT=5000

## AI Tools Usage

ChatGPT was used as a debugging assistant

## UI inspiration

Get the multiple reference from Dribbble and sketch the own UI

## Learnings

How to convert raw speech input into structured data with complex pattern matching

