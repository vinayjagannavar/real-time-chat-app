import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MessageInput from "../components/MessageInput"; 

describe("MessageInput Component", () => {
  test("renders input field and send button", () => {
    render(<MessageInput onSendMessage={jest.fn()} />);
    expect(screen.getByPlaceholderText("Type a message...")).toBeInTheDocument();
    expect(screen.getByText("Send")).toBeInTheDocument();
  });

  test("calls onSendMessage when enter key is pressed", async () => {
    const mockSendMessage = jest.fn();
    render(<MessageInput onSendMessage={mockSendMessage} />);

    const input = screen.getByPlaceholderText("Type a message...");
    fireEvent.change(input, { target: { value: "Test message" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    // ✅ Fix: Ensure the function was called after input event
    await waitFor(() => expect(mockSendMessage).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(mockSendMessage).toHaveBeenCalledWith("Test message"));
  });
});
