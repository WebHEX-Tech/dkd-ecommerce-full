"use client";

import { useEffect, useState, useRef } from "react";
import { Bell, X } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

interface Notification {
  id: string;
  customerName: string;
  timestamp: Date;
}

const OrderNotification = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedNotifications = localStorage.getItem("notifications");
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications));
    }

    const eventSource = new EventSource("/api/event");

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const newNotification: Notification = {
        id: data._id,
        customerName: data.customerName,
        timestamp: new Date(data.createdAt),
      };

      setNotifications((prev) => {
        if (
          prev.some((notification) => notification.id === newNotification.id)
        ) {
          return prev;
        }
        const updatedNotifications = [...prev, newNotification];
        localStorage.setItem(
          "notifications",
          JSON.stringify(updatedNotifications)
        );
        return updatedNotifications;
      });
    };

    eventSource.onerror = () => {
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const removeNotification = async (id: string) => {
    try {
      const response = await fetch(`/api/event?id=${id}`, { method: "DELETE" });
      if (response.ok) {
        setNotifications((prev) => {
          const updatedNotifications = prev.filter(
            (notification) => notification.id !== id
          );
          localStorage.setItem(
            "notifications",
            JSON.stringify(updatedNotifications)
          );
          return updatedNotifications;
        });
      } else {
        console.error("Failed to delete notification");
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="relative inline-block focus:outline-none"
      >
        <Bell className="text-black w-6 h-6" />
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
        )}
      </button>

      {dropdownOpen && (
        <div className="absolute -right-10 sm:right-0 mt-2 w-80 bg-white border border-gray-200 shadow-lg rounded-md overflow-hidden z-50">
          <ul className="divide-y divide-gray-200">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="relative p-4 flex justify-between items-center gap-2 hover:bg-blue-4"
              >
                <Link href="/orders">
                  <div className="text-sm">
                    <p className="font-medium text-blue-1">
                      {notification.customerName} placed an order
                    </p>
                    <p className="font-normal text-[14px] text-gray-500 truncate">
                      Order ID: {notification.id}
                    </p>
                    <p className="text-gray-400 text-[14px] mt-4">
                      {formatDistanceToNow(new Date(notification.timestamp))}{" "}
                      ago
                    </p>
                  </div>
                </Link>
                <button
                  onClick={() => removeNotification(notification.id)}
                  className="absolute top-[4px] right-[4px] text-red-600 hover:text-red-800"
                >
                  <X className="w-5 h-5 z-50" />
                </button>
              </div>
            ))}
            {notifications.length === 0 && (
              <li className="p-4 text-left text-gray-500">No notifications</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OrderNotification;
