
import React, { useEffect } from 'react';
import { CheckCircle, XCircle, Info } from 'lucide-react';
import { Notification } from '../types';
import gsap from 'gsap';

interface NotificationToastProps {
  notifications: Notification[];
  removeNotification: (id: number) => void;
}

const NotificationToast: React.FC<NotificationToastProps> = ({ notifications, removeNotification }) => {
  return (
    <div className="fixed top-24 right-6 z-[100] flex flex-col gap-4 pointer-events-none">
      {notifications.map((notif) => (
        <ToastItem key={notif.id} notification={notif} onRemove={() => removeNotification(notif.id)} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{ notification: Notification; onRemove: () => void }> = ({ notification, onRemove }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate in
    gsap.fromTo(ref.current,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.2)' }
    );

    // Auto remove after 4 seconds
    const timer = setTimeout(() => {
      gsap.to(ref.current, {
        x: 100,
        opacity: 0,
        duration: 0.3,
        onComplete: onRemove
      });
    }, 4000);

    return () => clearTimeout(timer);
  }, [onRemove]);

  const icons = {
    success: <CheckCircle className="text-green-500" size={20} />,
    error: <XCircle className="text-red-500" size={20} />,
    info: <Info className="text-blue-500" size={20} />
  };

  return (
    <div 
      ref={ref}
      className="bg-neutral-900 border border-neutral-800 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4 min-w-[300px] pointer-events-auto"
    >
      {icons[notification.type]}
      <div>
        <p className="font-medium text-sm">{notification.message}</p>
      </div>
    </div>
  );
};

export default NotificationToast;
