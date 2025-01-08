const MarketStatus = ({ currentDateTime, dataLength }) => {
  const checkMarketStatus = () => {
    const currentDate = new Date(
      currentDateTime.year,
      currentDateTime.month - 1,
      currentDateTime.date,
      currentDateTime.hour,
      currentDateTime.minute,
      currentDateTime.second
    );

    const day = currentDateTime.day;
    if (day == "Sunday" || day == "Saturday") {
      return "Market Close";
    }

    const sessions = [
      { start: "09:00", end: "09:15", label: "Opening Session" },
      { start: "09:15", end: "11:30", label: "Morning Trading Session" },
      { start: "11:30", end: "13:00", label: "Lunch break" },
      { start: "13:00", end: "14:30", label: "Afternoon Trading Session" },
      { start: "14:30", end: "15:00", label: "Post Trading Session" },
    ];

    for (const session of sessions) {
      const start = new Date(currentDate);
      const end = new Date(currentDate);

      const [startHour, startMinute] = session.start.split(":").map(Number);
      const [endHour, endMinute] = session.end.split(":").map(Number);

      start.setHours(startHour, startMinute, 0, 0);
      end.setHours(endHour, endMinute, 0, 0);

      if (currentDate >= start && currentDate < end) {
        return session.label;
      }
      return "Market Close";
    }
  };

  const getColorBaseOnMarketStatus = (currentDateTime) => {
    const marketStatus = checkMarketStatus(currentDateTime);
    if (
      marketStatus == "Opening Session" ||
      marketStatus == "Post Trading Session"
    )
      return "bg-blue-200";
    else if (
      marketStatus == "Morning Trading Session" ||
      marketStatus == "Afternoon Trading Session"
    )
      return "bg-green-200";
    else if (marketStatus == "Lunch break") return "bg-yellow-200";
    else if (marketStatus == "Market Close") return "bg-gray-200";
  };

  return (
    <span
      className={`text-sm mr-6 font-semibold text-gray-800 whitespace-pre p-2 rounded-md text-center px-4 py-1 ${getColorBaseOnMarketStatus(
        currentDateTime
      )}`}
    >
      {checkMarketStatus(currentDateTime)}
    </span>
  );
};

export default MarketStatus;
