const mockSocket = {
    on: jest.fn(),
    emit: jest.fn(),
    off: jest.fn(),
  };
  
  export default jest.fn(() => mockSocket);
  