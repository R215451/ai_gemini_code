🚀 AI Chat Application (React + Gemini API)
📌 Project Overview

This project is a ChatGPT-like AI web application built using modern frontend technologies. It allows users to interact with an AI model, get responses, and manage conversation history efficiently.

The goal of this project is to create a simple, clean, and scalable AI chat interface that can be enhanced with more advanced features in the future.


⚙️ Tech Stack
Frontend: React.js
Styling: Tailwind CSS
API: Gemini API (for AI responses)
Storage: Local Storage (for recent history)
Logic Handling: JavaScript (Regex + Split for response formatting)

✨ Features
🧠 AI Chat System
User can ask questions and get AI-generated responses
Responses are fetched using Gemini API

Response Formatting
Raw API response is cleaned using:
split()
regex
Output is displayed in a simple and readable format

🕘 Recent History
User queries are stored using localStorage
Displays recent searches/questions
Helps in quick reuse of previous prompts

🎨 UI/UX
Clean and responsive UI
Styled using Tailwind CSS
Chat-based interface similar to modern AI apps


🔧 Core Functional Flow
User enters a question
Request sent to Gemini API
API returns raw response
Response processed using:
String split
Regex cleanup
Clean data displayed in UI
Question saved in localStorage

📈 Future Improvements (You can add later)
Authentication system
Database integration (instead of localStorage)
Chat saving with timestamps
Dark/Light mode toggle
Streaming responses (real-time typing effect)
Multiple chat sessions
Better response formatting (Markdown support)


📝 Notes
Project is designed to be scalable and extendable
Code structure allows easy addition of new features
Focus is on clean UI + simple logic handling