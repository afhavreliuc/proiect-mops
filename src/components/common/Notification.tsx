import React from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded shadow-lg flex items-center gap-2 z-50`}>
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 hover:text-gray-200">×</button>
    </div>
  );
};

export default Notification;