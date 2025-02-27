# 🚀 Real-Time Chat Backend (FastAPI + WebSockets)

This is the **backend** for a real-time chat application using **FastAPI** and **Socket.IO**. It provides WebSocket support for real-time message exchange.

---

## 📌 Features

✅ FastAPI with **Socket.IO** for real-time communication  
✅ WebSocket endpoint for **instant messaging**  
✅ **Automatic broadcasting** of messages to all connected users  
✅ **Unit tests** for WebSocket connections and message handling  
✅ **Graceful error handling** for WebSocket disconnections  

---

## 🛠️ Setup and Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/real-time-chat-backend.git
cd real-time-chat-backend

2️⃣ Create a Virtual Environment

# On macOS/Linux
$python3 -m venv venv
$source venv/bin/activate

# On Windows
$python -m venv venv
$venv\Scripts\activate

3️⃣ Install Dependencies

$pip install -r requirements.txt

🚀 Running the Server
Start the FastAPI server using Uvicorn:

$uvicorn main:app --host 0.0.0.0 --port 8000 --reload

The server will be available at http://localhost:8000
WebSocket clients can connect at ws://localhost:8000/socket.io

🔍 API Endpoints
1️⃣ Health Check
GET / → Returns a simple message

$curl http://localhost:8000/

🧪 Running Tests

1️⃣ Install Testing Dependencies

$pip install pytest pytest-asyncio httpx python-socketio

2️⃣ Start the Server
Before running tests, ensure the FastAPI server is running:

$uvicorn main:app --host 0.0.0.0 --port 8000 --reload

3️⃣ Run Tests

$pytest -v