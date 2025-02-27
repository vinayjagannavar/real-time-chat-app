import { render, screen, fireEvent } from "@testing-library/react";
import Chat from "./components/Chat";

import { io } from "socket.io-client";

jest.mock("socket.io-client");

const mockSocket = {
  on: jest.fn(),
  emit: jest.fn(),
  off: jest.fn(),
};
io.mockReturnValue(mockSocket);

describe("Chat Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders Chat UI correctly", () => {
    render(<Chat />);
    expect(screen.getByText(/Real-Time Chat/i)).toBeInTheDocument();
  });

  test("displays connection status correctly", () => {
    render(<Chat />);
    expect(screen.getByText(/Status:/i)).toBeInTheDocument();
  });

  test("handles WebSocket connection and disconnection", () => {
    render(<Chat />);
    mockSocket.on.mock.calls.forEach(([event, callback]) => {
      if (event === "connect") callback();
    });
    expect(screen.getByText(/Connected/i)).toBeInTheDocument();
    
    mockSocket.on.mock.calls.forEach(([event, callback]) => {
      if (event === "disconnect") callback();
    });
    expect(screen.getByText(/Disconnected/i)).toBeInTheDocument();
  });

  test("sends a message when clicking send button", () => {
    render(<Chat />);
    const input = screen.getByPlaceholderText(/Type a message/i);
    const sendButton = screen.getByText(/Send/i);
    
    fireEvent.change(input, { target: { value: "Hello" } });
    fireEvent.click(sendButton);
    
    expect(mockSocket.emit).toHaveBeenCalledWith("message", "Hello", expect.any(Function));
  });

  test("does not send an empty message", () => {
    render(<Chat />);
    const sendButton = screen.getByText(/Send/i);
    fireEvent.click(sendButton);
    expect(mockSocket.emit).not.toHaveBeenCalled();
  });

  test("displays received messages", () => {
    render(<Chat />);
    mockSocket.on.mock.calls.forEach(([event, callback]) => {
      if (event === "message") callback({ id: "user1", text: "Hello!" });
    });
    expect(screen.getByText(/Hello!/i)).toBeInTheDocument();
  });

  test("displays error message when connection fails", () => {
    render(<Chat />);
    mockSocket.on.mock.calls.forEach(([event, callback]) => {
      if (event === "connect_error") callback(new Error("Failed to connect"));
    });
    expect(screen.getByText(/Failed to connect to server/i)).toBeInTheDocument();
  });
});
