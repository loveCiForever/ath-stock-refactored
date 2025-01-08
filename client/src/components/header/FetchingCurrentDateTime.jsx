import { useState, useEffect } from "react";
import axios from "axios";

const FetchingCurrentDateTime = () => {
  const [currentDateTime, setCurrentDateTime] = useState({});
  //   const [isDataNull, setIsDataNull] = useState(false);

  const fetchCurrentDateTime = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/api/current-date-time"
      );
      setCurrentDateTime(response.data);
      //   setDataLength(Object.keys(currentDateTime).length);
      //   console.log("Data:", response.data);
    } catch (error) {
      console.error("Error fetching current date:", error);
    }
  };

  useEffect(() => {
    fetchCurrentDateTime();
    const interval = setInterval(() => {
      fetchCurrentDateTime();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return { currentDateTime };
};

export default FetchingCurrentDateTime;
