import React from 'react';

interface NotifListProps {
  baseLib: string;
}

export const NotifList = ({ baseLib }: NotifListProps) => {
  const notifications = [
    { avatar: 'https://picsum.photos/seed/avatar2/96', title: 'Sarah commented on your post', action: 'View' },
    { avatar: 'https://picsum.photos/seed/avatar3/96', title: 'New meditation session available', action: 'Start' },
  ];

  if (baseLib === 'daisyui') {
    return (
      <div className="space-y-3">
        <h3 className="font-semibold">Today</h3>
        <div className="space-y-2">
          {notifications.map((notif, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-base-100 rounded-lg border border-base-300">
              <div className="avatar">
                <div className="w-10 h-10 rounded-full">
                  <img src={notif.avatar} alt="Avatar" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm">{notif.title}</p>
              </div>
              <button className="btn btn-sm btn-primary">{notif.action}</button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (baseLib === 'flowbite') {
    return (
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900 dark:text-white">Today</h3>
        <div className="space-y-2">
          {notifications.map((notif, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
              <img src={notif.avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
              <div className="flex-1">
                <p className="text-sm text-gray-900 dark:text-white">{notif.title}</p>
              </div>
              <button className="px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                {notif.action}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Default implementation
  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-[rgb(var(--color-text-primary))]">Today</h3>
      <div className="space-y-2">
        {notifications.map((notif, index) => (
          <div key={index} className="flex items-center gap-3 p-3 rounded-[var(--radius-md)] border border-[rgb(var(--color-border))] bg-[rgb(var(--color-bg-primary))]">
            <img src={notif.avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
            <div className="flex-1">
              <p className="text-sm text-[rgb(var(--color-text-primary))]">{notif.title}</p>
            </div>
            <button className="px-3 py-1 text-xs font-medium text-white bg-[rgb(var(--color-brand))] rounded-[var(--radius-sm)] hover:bg-[rgb(var(--color-brand))]/90 focus:ring-2 focus:ring-[rgb(var(--color-focus))] focus:ring-offset-2">
              {notif.action}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};