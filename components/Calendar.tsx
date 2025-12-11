"use client";
import React, { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface CalendarProps {
  isOpen: boolean;
  onClose: () => void;
  onDateSelect: (date: string) => void;
  availableDates?: string[]; // Array of date strings in YYYY-MM-DD format
  fullyBookedDates?: string[]; // Array of date strings in YYYY-MM-DD format
  helpInfo?: {
    title?: string;
    description?: string;
    phone?: string;
    email?: string;
  };
}

export default function Calendar({
  isOpen,
  onClose,
  onDateSelect,
  availableDates = [],
  fullyBookedDates = [],
  helpInfo,
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Get today's date for highlighting
  const today = useMemo(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }, []);

  // Get first day of month and number of days
  const monthStart = useMemo(() => {
    return new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  }, [currentMonth]);

  const monthEnd = useMemo(() => {
    return new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
  }, [currentMonth]);

  const firstDayOfWeek = monthStart.getDay();
  const daysInMonth = monthEnd.getDate();

  // Navigate months
  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Format date as YYYY-MM-DD
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Check date status
  const getDateStatus = (date: Date): "available" | "booked" | "today" | "disabled" => {
    const dateStr = formatDate(date);
    const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    // Check if it's today (regardless of month)
    if (dateOnly.getTime() === today.getTime()) {
      return "today";
    }

    // Check if it's in the current month
    if (date.getMonth() !== currentMonth.getMonth()) {
      return "disabled";
    }

    // Check if fully booked
    if (fullyBookedDates.includes(dateStr)) {
      return "booked";
    }

    // Check if available
    if (availableDates.includes(dateStr)) {
      return "available";
    }

    // Default to disabled if not in available dates
    return "disabled";
  };

  // Handle date click
  const handleDateClick = (date: Date) => {
    const status = getDateStatus(date);
    const dateStr = formatDate(date);
    // Allow clicking if available or if it's today and available
    if (status === "available" || (status === "today" && availableDates.includes(dateStr))) {
      onDateSelect(dateStr);
      onClose();
    }
  };

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const days: Date[] = [];

    // Get the last day of the previous month
    const prevMonthEnd = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 0);
    const daysInPrevMonth = prevMonthEnd.getDate();

    // Add days from previous month (to fill the first week)
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, day));
    }

    // Add days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
    }

    // Add days from next month (to fill the remaining cells)
    const remainingCells = 42 - days.length; // 6 rows * 7 days = 42
    for (let day = 1; day <= remainingCells; day++) {
      days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, day));
    }

    return days;
  }, [currentMonth, firstDayOfWeek, daysInMonth]);

  // Format month/year for display
  const monthYear = useMemo(() => {
    return currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  }, [currentMonth]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Select Available Date</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            aria-label="Close"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={goToPreviousMonth}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          <h4 className="text-lg font-semibold text-gray-900">{monthYear}</h4>
          <button
            onClick={goToNextMonth}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            aria-label="Next month"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 mb-6">
          {calendarDays.map((date, index) => {
            const status = getDateStatus(date);
            const isOtherMonth = date.getMonth() !== currentMonth.getMonth();
            const dateStr = formatDate(date);
            const isToday = status === "today";
            const isAvailable = status === "available" || (isToday && availableDates.includes(dateStr));
            const isBooked = status === "booked";
            const isDisabled = isOtherMonth || isBooked || (!isAvailable && !isToday);
            const day = date.getDate();

            return (
              <button
                key={`${date.getTime()}-${index}`}
                onClick={() => handleDateClick(date)}
                disabled={isDisabled}
                className={`
                  aspect-square flex items-center justify-center text-sm rounded-lg transition-colors duration-200
                  ${
                    isOtherMonth
                      ? "text-gray-300 cursor-not-allowed"
                      : isToday
                      ? "bg-orange-100 text-orange-600 font-semibold cursor-pointer"
                      : isAvailable
                      ? "bg-green-100 text-green-700 hover:bg-green-200 cursor-pointer"
                      : isBooked
                      ? "bg-red-100 text-red-700 cursor-not-allowed"
                      : "text-gray-300 cursor-not-allowed"
                  }
                `}
              >
                {day}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-100 rounded"></div>
            <span className="text-sm text-gray-600">Available - Click to select</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-100 rounded"></div>
            <span className="text-sm text-gray-600">Fully Booked</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-orange-100 rounded"></div>
            <span className="text-sm text-gray-600">Today</span>
          </div>
        </div>

        {/* Need Help Section */}
        <div className="bg-orange-50 rounded-lg p-4">
          <h5 className="font-semibold text-orange-800 mb-2">
            {helpInfo?.title || "Need Help?"}
          </h5>
          <p className="text-sm text-orange-700 mb-3">
            {helpInfo?.description ||
              "Contact us directly for availability confirmation and booking assistance."}
          </p>
          <div className="space-y-1 text-sm text-orange-700">
            {helpInfo?.phone && (
              <p>
                <strong>Phone:</strong> {helpInfo.phone}
              </p>
            )}
            {helpInfo?.email && (
              <p>
                <strong>Email:</strong> {helpInfo.email}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

