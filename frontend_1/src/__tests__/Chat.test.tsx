import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Chat from "../components/Chat"; // Ensure correct path
import io from "socket.io-client";

// Mock WebSocket
jest.mock("socket.io-client");

describe("Chat Component", () => {
  let mockSocket: any;

  beforeEach(() => {
    mockSocket = {
      on: jest.fn(),
      emit: jest.fn(),
      disconnect: jest.fn(),
    };
    (io as jest.Mock).mockReturnValue(mockSocket);
  });

  test("renders chat UI correctly", () => {
    render(<Chat />);
    expect(screen.getByText(/Real-Time Chat/i)).toBeInTheDocument();
  });

  test("displays WebSocket connection status", () => {
    render(<Chat />);
    expect(screen.getByText(/Status:/)).toBeInTheDocument();
  });

  test("sends a message when input is filled", async () => {
    render(<Chat />);
    const input = screen.getByPlaceholderText("Type a message...");
    
    fireEvent.change(input, { target: { value: "Hello" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    // ✅ Fix: Wait for WebSocket emit to be called
    await waitFor(() => expect(mockSocket.emit).toHaveBeenCalledWith("message", "Hello"));
  });

  test("receives messages and displays them", async () => {
    render(<Chat />);

    // Simulate receiving a message
    mockSocket.on.mockImplementation((event: string, callback: Function) => {
      if (event === "message") callback({ id: "user123", text: "Hello" });
    });

    // ✅ Wait for the message to appear in the DOM
    await waitFor(() => expect(screen.getByText("Hello")).toBeInTheDocument());
  });
});
