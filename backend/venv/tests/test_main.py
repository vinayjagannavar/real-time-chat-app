import pytest
from httpx import AsyncClient
from fastapi.testclient import TestClient
from main import app, sio  # Ensure this matches your FastAPI app file
import socketio

client = TestClient(app)

@pytest.mark.asyncio
async def test_websocket_connection():
    """Test WebSocket connection and disconnection"""
    sio_client = socketio.AsyncClient()
    await sio_client.connect("http://localhost:8000", transports=["websocket"])
    assert sio_client.connected
    await sio_client.disconnect()
    assert not sio_client.connected

@pytest.mark.asyncio
async def test_websocket_message():
    """Test message broadcasting"""
    sio_client1 = socketio.AsyncClient()
    sio_client2 = socketio.AsyncClient()

    await sio_client1.connect("http://localhost:8000", transports=["websocket"])
    await sio_client2.connect("http://localhost:8000", transports=["websocket"])

    received_messages = []

    async def message_handler(data):
        received_messages.append(data)

    sio_client2.on("message", message_handler)
    await sio_client1.emit("message", "Hello, World!")
    await sio_client2.sleep(1)

    assert received_messages[0]["text"] == "Hello, World!"

    await sio_client1.disconnect()
    await sio_client2.disconnect()
