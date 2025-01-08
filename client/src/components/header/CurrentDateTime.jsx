import { useEffect, useState } from "react";
import axios from "axios";

const CurrentDateTime = ({ currentDateTime }) => {
  const displayCurrentDayTime = (currentDateTime) => {
    const year = currentDateTime.year;
    const month = currentDateTime.month;
    const date = currentDateTime.date;
    const hour = currentDateTime.hour;
    const minute = currentDateTime.minute;
    const second = currentDateTime.second;
    const day = currentDateTime.day;

    return currentDateTime
      ? `${day} ${date}/${month}/${year} ${hour}:${minute}:${second}`
      : "Error: CurrentDateTime";
  };

  return (
    <div className="flex items-center justify-center font-mono text-gray-800 tracking-wider text-md">
      {displayCurrentDayTime(currentDateTime)}
      {/* {dataLength} */}
    </div>
  );
};

export default CurrentDateTime;
