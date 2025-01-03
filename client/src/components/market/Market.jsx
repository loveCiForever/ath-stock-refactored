import { useEffect, useState } from "react";
import axios from "axios";

import CollapseAllIcon from "../../assets/icon/collapseAllIcon.png";
import ExpandAllIcon from "../../assets/icon/expandAllIcon.png";
import ArrowUp from "../../assets/icon/upArrowIcon.png";
import ArrowDown from "../../assets/icon/downArrowIcon.png";

import MarketsGraph from "./MarketsGraph";

const Market = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [array, setArray] = useState([]);
  const [isUp] = useState(true);

  const fetchAPI_MARKET = async () => {
    const response = await axios.get("http://127.0.0.1:8080/api/users");
    // console.log(response.data.users);
    setArray(response.data.users);
  };

  useEffect(() => {
    fetchAPI_MARKET();
  });

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  // ['VNINDEX', 'HNXINDEX', 'UPCOMINDEX', 'VN30', 'VN100', 'HNX30']

  return (
    <div className="flex flex-col w-[1000px] h-auto mt-[0px] bg-white">
      <div className="flex flex-col items-start">
        <button
          className="flex items-center justify-center uppercase text-gray-600 tracking-widest font-bold text-[12px] mr-[10px]"
          onClick={handleExpandClick}
        >
          <img
            className="h-4 w-4 mr-[4px]"
            src={isExpanded ? CollapseAllIcon : ExpandAllIcon}
            alt={isExpanded ? "Collapse All Icon" : "Expand All Icon"}
          />
          Visualize
          <p>
            {array.map((user, index) => {
              <div key={index}>
                <span>{user}</span>
              </div>;
            })}
          </p>
        </button>

        {isExpanded && (
          <div className="flex w-full h-[400px] border border-gray-100 rounded-xl shadow-md items-center justify-between my-[10px] px-6 py-4">
            <div className="flex flex-col w-[60%] h-full">
              <div className="flex items-center justify-between font-semibold text-gray-500 text-[15px]">
                <button className="hover:bg-gray-100 px-5">1 Day</button>
                <button className="hover:bg-gray-100 px-5">1 Week </button>
                <button className="hover:bg-gray-100 px-5">1 Month</button>
                <button className="hover:bg-gray-100 px-5">1 Year</button>
                <button className="hover:bg-gray-100 px-5">5 Year</button>
              </div>

              <div className="w-full h-full flex items-center justify-center">
                <MarketsGraph />
              </div>
            </div>
            <div className="flex flex-col w-[40%] h-full ml-6 items-center justify-center  font-semibold text-[15px]">
              <div className="flex my-3 w-full items-center justify-between text-gray-600 hover:bg-gray-100 rounded-md">
                <div className="w-[6px] h-[20px] rounded-l-sm rounded-r-sm bg-red-500"></div>
                <span className="flex ml-2 w-[25%]">VN-INDEX</span>
                <span className="flex items-center justify-end w-[25%]">
                  1.269,71
                </span>
                <span className="flex items-center justify-end w-[20%] mr-4 text-green-700">
                  +2,93
                </span>
                <div className="flex items-center justify-end w-[25%] ">
                  <div className="flex w-full items-center justify-center py-[4px] rounded-md bg-green-100">
                    <img
                      src={isUp ? ArrowUp : ArrowDown}
                      alt={isUp ? "Arrow Up" : "Arrow Down"}
                      className="w-5 mr-[3px]"
                    />
                    <span className="text-green-700">0,23%</span>
                  </div>
                </div>
              </div>

              <div className="flex my-3 w-full items-center justify-between text-gray-600 hover:bg-gray-100 rounded-md">
                <div className="w-[6px] h-[20px] rounded-l-sm rounded-r-sm bg-blue-500"></div>
                <span className="flex ml-2 w-[25%]">HNX-INDEX</span>
                <span className="flex items-center justify-end w-[25%]">
                  227,69
                </span>
                <span className="flex items-center justify-end w-[20%] mr-4 text-green-700">
                  +0.26
                </span>
                <div className="flex items-center justify-end w-[25%] ">
                  <div className="flex w-full items-center justify-center py-[4px] rounded-md bg-green-100">
                    <img
                      src={isUp ? ArrowUp : ArrowDown}
                      alt={isUp ? "Arrow Up" : "Arrow Down"}
                      className="w-5 mr-[3px]"
                    />
                    <span className="text-green-700">0,11%</span>
                  </div>
                </div>
              </div>

              <div className="flex my-3 w-full items-center justify-between text-gray-600 hover:bg-gray-100 rounded-md">
                <div className="w-[6px] h-[20px] rounded-l-sm rounded-r-sm bg-green-500"></div>
                <span className="flex ml-2 w-[25%]">VN30</span>
                <span className="flex items-center justify-end w-[25%]">
                  1.343,20
                </span>
                <span className="flex items-center justify-end w-[20%] mr-4 text-red-700">
                  -1,55
                </span>
                <div className="flex items-center justify-end w-[25%] ">
                  <div
                    className={`flex w-full items-center justify-center py-[4px] rounded-md bg-red-100 }`}
                  >
                    <img
                      src={ArrowDown}
                      alt={isUp ? "Arrow Up" : "Arrow Down"}
                      className="w-5 mr-[3px]"
                    />
                    <span className="text-red-700">0,12%</span>
                  </div>
                </div>
              </div>

              <div className="flex my-3 w-full items-center justify-between text-gray-600 hover:bg-gray-100 rounded-md">
                <div className="w-[6px] h-[20px] rounded-l-sm rounded-r-sm bg-yellow-500"></div>
                <span className="flex ml-2 w-[25%]">HNX-30</span>
                <span className="flex items-center justify-end w-[25%]">
                  479,29
                </span>
                <span className="flex items-center justify-end w-[20%] mr-4 text-green-700">
                  +1,24
                </span>
                <div className="flex items-center justify-end w-[25%] ">
                  <div className="flex w-full items-center justify-center py-[4px] rounded-md bg-green-100">
                    <img
                      src={ArrowUp}
                      alt={isUp ? "Arrow Up" : "Arrow Down"}
                      className="w-5 mr-[3px]"
                    />
                    <span className="text-green-700">0,26%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center justify-center"></div>
    </div>
  );
};

export default Market;
