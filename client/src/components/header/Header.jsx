// Libraries and Hooks
import { useEffect, useState } from "react";
import axios from "axios";

// Components
import Branding from "../branding/Branding";
import Hamburger from "./Hamburger.jsx";
import Notification from "./Notification.jsx";
import SignIn from "./SignIn.jsx";

// eslint-disable-next-line react/prop-types
const Header = ({ toggleSideBar }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  // const [isMarketOpen, setMarketOpen] = useState(false);

  const [currentDateTime, setCurrentDateTime] = useState({});

  const fetchCurrentDateTime = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/api/current_date_time"
      );
      setCurrentDateTime(response.data);
      // console.log("Current date time:", response.data);
    } catch (error) {
      console.error("Error fetching current date:", error);
    }
  };

  const displayCurrentDayTime = (currentDateTime) => {
    const year = currentDateTime.year;
    const month = currentDateTime.month;
    const date = currentDateTime.date;
    const hour = currentDateTime.hour;
    const minute = currentDateTime.minute;
    const second = currentDateTime.second;
    const day = currentDateTime.day;

    return `${day} ${date}/${month}/${year} ${hour}:${minute}:${second}`;
  };

  const checkMarketStatus = (currentDateTime) => {
    const currentDate = new Date(
      currentDateTime.year,
      currentDateTime.month - 1,
      currentDateTime.date,
      currentDateTime.hour,
      currentDateTime.minute,
      currentDateTime.second
    );

    const day = currentDateTime.day;
    if(day == 'Sunday' || day == 'Saturday') {
      return 'Market Close';
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
    }

    return 'Market Close';
  };

  const getColorBaseOnMarketStatus = (currentDateTime) => {
    const marketStatus = checkMarketStatus(currentDateTime);
    if(marketStatus == 'Opening Session' || marketStatus == 'Post Trading Session') 
      return 'bg-blue-200';
    else if(marketStatus == 'Morning Trading Session' || marketStatus == 'Afternoon Trading Session')
      return 'bg-green-200';
    else if(marketStatus == 'Lunch break')
      return 'bg-yellow-200';
    else if(marketStatus == 'Market Close')
      return 'bg-gray-200';
  };

  // const convertToTimestamp = (currentDateTime) => {
  //   const date = new Date(
  //     currentDateTime.year,
  //     currentDateTime.month - 1,
  //     currentDateTime.date,
  //     currentDateTime.hour,
  //     currentDateTime.minute,
  //     currentDateTime.second
  //   );

  //   const timestamp = date.getTime();
  //   return timestamp;
  // };

  useEffect(() => {
    fetchCurrentDateTime();
    const interval = setInterval(() => {
      fetchCurrentDateTime();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky h-[65px] bg-white border-b border-gray-200 flex-col w-full transition-shadow duration-300 ${
        isScrolled ? "shadow-sm shadow-gray-300" : "null"
      }`}
    >
      <div className="flex items-center justify-between w-full h-full">
        <div className="flex items-center justify-center bg-red-000">
          <div className={`ml-4 visible`}>
            <Hamburger toggleSideBar={toggleSideBar} />
          </div>

          <div className="ml-5">
            <Branding />
          </div>
        </div>

        <div className="flex items-center justify-center mr-5 bg-red-000">
          <div className="flex items-center justify-center mr-5">
            <span className={`text-sm ml-2 font-mono text-gray-800 whitespace-pre p-2 rounded-md text-center px-4 py-1 ${getColorBaseOnMarketStatus(currentDateTime)}` }>
              {checkMarketStatus(currentDateTime)}
            </span>
            <span className="ml-2 font-mono text-gray-800 whitespace-pre text-md">
              {displayCurrentDayTime(currentDateTime)}
            </span>
          </div>
          <div className="mr-4">
            <Notification />
          </div>

          <div className="mr-3">
            <SignIn />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
