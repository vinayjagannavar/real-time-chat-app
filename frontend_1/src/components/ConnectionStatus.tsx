import React from 'react';

interface ConnectionStatusProps {
  status: string;
}

const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ status }) => (
  <div className={`text-sm mb-4 ${status === 'Connected' ? 'text-green-600' : 'text-red-600'}`}>
    Status: {status}
  </div>
);

export default ConnectionStatus;