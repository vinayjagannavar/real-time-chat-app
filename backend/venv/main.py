from fastapi import FastAPI
import socketio
import uvicorn

app = FastAPI()

sio = socketio.AsyncServer(
    async_mode="asgi", cors_allowed_origins="http://localhost:3000"
)
socket_app = socketio.ASGIApp(sio)

app.mount("/socket.io", socket_app)

@sio.event
async def connect(sid, environ):
    print(f"Connected: {sid}")

@sio.event
async def disconnect(sid):
    print(f"Disconnected: {sid}")

@sio.event
async def message(sid, data):
    """Handles incoming messages and validates them"""
    if not isinstance(data, str) or not data.strip():
        await sio.emit("error", {"error": "Invalid message format"}, to=sid)
        return

    print(f"Message from {sid}: {data}")
    await sio.emit("message", {"id": sid, "text": data})

@app.get("/")
async def get():
    return "FastAPI with Socket.IO"

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
