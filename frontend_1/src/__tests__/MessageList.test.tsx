import React from "react";

import { render, screen } from "@testing-library/react";
import MessageList from "../components/MessageList";

const messages = [
  { id: "user1", text: "Hello" },
  { id: "user2", text: "Hi there!" },
];

describe("MessageList Component", () => {
  test("renders messages correctly", () => {
    render(<MessageList messages={messages} currentUserId="user1" />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(screen.getByText("Hi there!")).toBeInTheDocument();
  });

  test("marks current user's messages as 'Me'", () => {
    render(<MessageList messages={messages} currentUserId="user1" />);
    expect(screen.getByText("Me")).toBeInTheDocument();
  });
});
