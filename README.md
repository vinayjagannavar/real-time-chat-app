# 🛠️ Real-Time Chat Application (FastAPI + Next.js)

This is a **real-time chat application** built using:
- **Backend:** FastAPI, Socket.IO, Python
- **Frontend:** Next.js, TypeScript, TailwindCSS
- **Communication:** WebSockets for real-time messaging

---

## 📌 Features

✅ **Real-time messaging** via WebSockets  
✅ **FastAPI backend** with Socket.IO integration  
✅ **Next.js frontend** for a modern UI experience  
✅ **Unit testing** for WebSocket interactions  
✅ **Graceful error handling** for WebSocket disconnections  

---

## 🚀 Setup Instructions

### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/your-username/real-time-chat-app.git
cd real-time-chat-app


2️⃣ Set Up Backend

cd backend
python3 -m venv venv
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate  # Windows
pip install -r requirements.txt
cp .env.example .env  # Copy and configure environment variables
uvicorn main:app --host 0.0.0.0 --port 8000 --reload

3️⃣ Set Up Frontend

cd ../frontend
npm install
cp .env.example .env  # Copy and configure environment variables
npm run dev
📌 The frontend should now be running at http://localhost:3000

🧪 Running Tests
1️⃣ Backend Tests

cd backend
pytest -v

2️⃣ Frontend Tests
cd frontend
npm test

🌍 Deployment Instructions
1️⃣ Deploy Backend
1. Use a cloud provider (AWS, GCP, DigitalOcean) to deploy the FastAPI backend.
2. Alternatively, deploy using Docker:
        $docker build -t chat-backend .
        $docker run -d -p 8000:8000 chat-backend

2️⃣ Deploy Frontend
1. Deploy the Next.js frontend on Vercel:
    $vercel deploy
2. Or, use Docker:
    $docker build -t chat-frontend .
    $docker run -d -p 3000:3000 chat-frontend

