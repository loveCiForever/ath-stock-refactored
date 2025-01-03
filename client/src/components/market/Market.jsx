import { useEffect, useState } from "react";
import axios from "axios";

import CollapseAllIcon from "../../assets/icon/collapseAllIcon.png";
import ExpandAllIcon from "../../assets/icon/expandAllIcon.png";
import ArrowUp from "../../assets/icon/upArrowIcon.png";
import ArrowDown from "../../assets/icon/downArrowIcon.png";
import HorizontalIcon from "../../assets/icon/horizontalIcon.png";

import MarketsGraph from "./MarketsGraph";

const Market = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [marketData, setMarketData] = useState({
    vnindex: {},
    vn30: {},
    hnxindex: {},
    hnx30: {},
  });

  const fetchDailyMarketIndices = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/api/market_indices"
      );
      setMarketData(response.data);
      // console.log("Market Data:", response.data);
    } catch (error) {
      console.error("Error fetching market data:", error);
    }
  };

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  const checkData = (data) => {
    return data && data.length > 0 ? true : false;
  };

  const getMarketInfo = (data) => {
    if (checkData(data)) {
      return {
        indexValue: data[0].IndexValue,
        change: data[0].Change,
        ratioChange: parseFloat(data[0].RatioChange).toFixed(2),
      };
    }
    return {
      indexValue: "N/A",
      change: "N/A",
      ratioChange: "N/A",
    };
  };

  const getStatusArrow = (data) => {
    if (checkData(data)) {
      if (data[0].Change > 0) {
        return ArrowUp;
      } else if (data[0].Change < 0) {
        return ArrowDown;
      }
    }

    return HorizontalIcon;
  };

  const getBgColor = (data) => {
    if (checkData(data)) {
      if (data[0].Change > 0) {
        return "bg-green-200";
      } else if (data[0].Change < 0) {
        return "bg-red-200";
      }
    }

    return "bg-gray-200";
  };

  const getTextColor = (data) => {
    if (checkData(data)) {
      if (data[0].Change > 0) {
        return "text-green-700";
      } else if (data[0].Change < 0) {
        return "text-red-700";
      }
    }

    return "text-gray-700";
  };

  const vnindex = getMarketInfo(marketData.vnindex.data);
  const vn30 = getMarketInfo(marketData.vn30.data);
  const hnxindex = getMarketInfo(marketData.hnxindex.data);
  const hnx30 = getMarketInfo(marketData.hnx30.data);

  useEffect(() => {
    fetchDailyMarketIndices();
    const interval = setInterval(() => {
      fetchDailyMarketIndices();
    }, 5000);
    return () => clearInterval(interval);
  });

  // ['VNINDEX', 'HNXINDEX', 'UPCOMINDEX', 'VN30', 'VN100', 'HNX30']

  return (
    <div className="flex flex-col w-[1000px] h-auto mt-[0px] bg-white">
      <div className="flex flex-col items-start">
        <button
          className={`flex items-center justify-center uppercase text-gray-600 tracking-widest font-bold text-[12px] ${
            isExpanded ? "px-0" : "px-10"
          } `}
          onClick={handleExpandClick}
        >
          <img
            className="h-4 w-4 mr-[4px]"
            src={isExpanded ? CollapseAllIcon : ExpandAllIcon}
            alt={isExpanded ? "Collapse All Icon" : "Expand All Icon"}
          />
          Visualize
        </button>

        {!isExpanded && (
          <div className="flex flex-row items-center justify-between w-full px-10 mt-2">
            <div className="flex bg-white border border-gray-200 rounded-lg p-2 w-[23%] ">
              <div
                className={`p-2 rounded-lg self-center flex justify-center items-center ${getBgColor(
                  marketData.vnindex.data
                )} `}
              >
                <img
                  src={getStatusArrow(marketData.vnindex.data)}
                  alt={"Down Arrow"}
                  className="w-4 h-4 opacity-100"
                />
              </div>

              <div className="flex flex-col w-[50%] ml-2 ">
                <div className="text-[12px] font-semibold text-gray-700">
                  VN-INDEX
                </div>
                <div className="text-[12px] tracking-wider">
                  {vnindex.indexValue}
                </div>
              </div>

              <div className="flex flex-col items-end w-[30%] ml-2 text-[12px] tracking-wide text-red-700 ">
                <div className="font-semibold">
                  {vnindex.ratioChange}{" "}
                  {checkData(marketData.vnindex.data) ? "%" : ""}
                </div>
                <div>
                  {vnindex.change}{" "}
                  {checkData(marketData.vnindex.data) ? "%" : ""}
                </div>
              </div>
            </div>

            <div className="flex bg-white border border-gray-200 rounded-lg p-2 w-[23%] ">
              <div
                className={`p-2 rounded-lg self-center flex justify-center items-center ${getBgColor(
                  marketData.hnxindex.data
                )} `}
              >
                <img
                  src={getStatusArrow(marketData.hnxindex.data)}
                  alt={"Down Arrow"}
                  className="w-4 h-4 opacity-100"
                />
              </div>

              <div className="flex flex-col w-[50%] ml-2 ">
                <div className="text-[12px] font-semibold text-gray-700">
                  HNX-INDEX
                </div>
                <div className="text-[12px] tracking-wider">
                  {hnxindex.indexValue}
                </div>
              </div>

              <div className="flex flex-col items-end w-[30%] ml-2 text-[12px] tracking-wide text-red-700 ">
                <div className="font-semibold">
                  {hnxindex.ratioChange}{" "}
                  {checkData(marketData.hnxindex.data) ? "%" : ""}
                </div>
                <div>
                  {hnxindex.change}{" "}
                  {checkData(marketData.hnxindex.data) ? "%" : ""}
                </div>
              </div>
            </div>

            <div className="flex bg-white border border-gray-200 rounded-lg p-2 w-[23%] ">
              <div
                className={`p-2 rounded-lg self-center flex justify-center items-center ${getBgColor(
                  marketData.vn30.data
                )} `}
              >
                <img
                  src={getStatusArrow(marketData.vn30.data)}
                  alt={"Down Arrow"}
                  className="w-4 h-4 opacity-100"
                />
              </div>

              <div className="flex flex-col w-[50%] ml-2 ">
                <div className="text-[12px] font-semibold text-gray-700">
                  VN-30
                </div>
                <div className="text-[12px] tracking-wider">
                  {vn30.indexValue}
                </div>
              </div>

              <div className="flex flex-col items-end w-[30%] ml-2 text-[12px] tracking-wide text-red-700 ">
                <div className="font-semibold">
                  {vn30.ratioChange}{" "}
                  {checkData(marketData.vn30.data) ? "%" : ""}
                </div>
                <div>
                  {vn30.change}{" "}
                  {checkData(marketData.vn30.data) ? "%" : ""}
                </div>
              </div>
            </div>

            <div className="flex bg-white border border-gray-200 rounded-lg p-2 w-[23%] ">
              <div
                className={`p-2 rounded-lg self-center flex justify-center items-center ${getBgColor(
                  marketData.hnx30.data
                )} `}
              >
                <img
                  src={getStatusArrow(marketData.hnx30.data)}
                  alt={"Down Arrow"}
                  className="w-4 h-4 opacity-100"
                />
              </div>

              <div className="flex flex-col w-[50%] ml-2 ">
                <div className="text-[12px] font-semibold text-gray-700">
                  HNX-30
                </div>
                <div className="text-[12px] tracking-wider">
                  {hnx30.indexValue}
                </div>
              </div>

              <div className="flex flex-col items-end w-[30%] ml-2 text-[12px] tracking-wide text-red-700 ">
                <div className="font-semibold">
                  {hnx30.ratioChange}{" "}
                  {checkData(marketData.hnx30.data) ? "%" : ""}
                </div>
                <div>
                  {hnx30.change}{" "}
                  {checkData(marketData.hnx30.data) ? "%" : ""}
                </div>
              </div>
            </div>
          </div>
        )}

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
                  {vnindex.indexValue}
                </span>
                <span
                  className={`flex items-center justify-end w-[20%] mr-4 ${getTextColor(
                    marketData.vnindex.data
                  )}`}
                >
                  {vnindex.change}
                </span>
                <div className="flex items-center justify-end w-[30%]">
                  <div
                    className={`flex w-full items-center justify-center py-[4px] rounded-md px-1 ${getBgColor(
                      marketData.vnindex.data
                    )}`}
                  >
                    <img
                      src={getStatusArrow(marketData.vnindex.data)}
                      alt={"Arrow Down"}
                      className=" w-5 mr-[3px]"
                    />
                    <span
                      className={`${getTextColor(marketData.vnindex.data)}`}
                    >
                      {vnindex.ratioChange}{" "}
                      {checkData(marketData.vnindex.data) ? "%" : ""}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex my-3 w-full items-center justify-between text-gray-600 hover:bg-gray-100 rounded-md">
                <div className="w-[6px] h-[20px] rounded-l-sm rounded-r-sm bg-yellow-500"></div>
                <span className="flex ml-2 w-[25%]">HNX-INDEX</span>
                <span className="flex items-center justify-end w-[25%]">
                  {hnxindex.indexValue}
                </span>
                <span
                  className={`flex items-center justify-end w-[20%] mr-4 ${getTextColor(
                    marketData.hnxindex.data
                  )}`}
                >
                  {hnxindex.change}
                </span>
                <div className="flex items-center justify-end w-[30%]">
                  <div
                    className={`flex w-full items-center justify-center py-[4px] rounded-md px-1 ${getBgColor(
                      marketData.hnxindex.data
                    )}`}
                  >
                    <img
                      src={getStatusArrow(marketData.hnxindex.data)}
                      alt={"Arrow Down"}
                      className=" w-5 mr-[3px]"
                    />
                    <span
                      className={`${getTextColor(marketData.hnxindex.data)}`}
                    >
                      {hnxindex.ratioChange}{" "}
                      {checkData(marketData.hnxindex.data) ? "%" : ""}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex my-3 w-full items-center justify-between text-gray-600 hover:bg-gray-100 rounded-md">
                <div className="w-[6px] h-[20px] rounded-l-sm rounded-r-sm bg-blue-500"></div>
                <span className="flex ml-2 w-[25%]">VN-30</span>
                <span className="flex items-center justify-end w-[25%]">
                  {vn30.indexValue}
                </span>
                <span
                  className={`flex items-center justify-end w-[20%] mr-4 ${getTextColor(
                    marketData.vn30.data
                  )}`}
                >
                  {vn30.change}
                </span>
                <div className="flex items-center justify-end w-[30%]">
                  <div
                    className={`flex w-full items-center justify-center py-[4px] rounded-md px-1 ${getBgColor(
                      marketData.vn30.data
                    )}`}
                  >
                    <img
                      src={getStatusArrow(marketData.vn30.data)}
                      alt={"Arrow Down"}
                      className=" w-5 mr-[3px]"
                    />
                    <span className={`${getTextColor(marketData.vn30.data)}`}>
                      {vn30.ratioChange}{" "}
                      {checkData(marketData.vn30.data) ? "%" : ""}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex my-3 w-full items-center justify-between text-gray-600 hover:bg-gray-100 rounded-md">
                <div className="w-[6px] h-[20px] rounded-l-sm rounded-r-sm bg-green-500"></div>
                <span className="flex ml-2 w-[25%]">HNX-30</span>
                <span className="flex items-center justify-end w-[25%]">
                  {hnx30.indexValue}
                </span>
                <span
                  className={`flex items-center justify-end w-[20%] mr-4 ${getTextColor(
                    marketData.hnx30.data
                  )}`}
                >
                  {hnx30.change}
                </span>
                <div className="flex items-center justify-end w-[30%]">
                  <div
                    className={`flex w-full items-center justify-center py-[4px] rounded-md px-1 ${getBgColor(
                      marketData.hnx30.data
                    )}`}
                  >
                    <img
                      src={getStatusArrow(marketData.hnx30.data)}
                      alt={"Arrow Down"}
                      className=" w-5 mr-[3px]"
                    />
                    <span className={`${getTextColor(marketData.hnx30.data)}`}>
                      {hnx30.ratioChange}{" "}
                      {checkData(marketData.hnx30.data) ? "%" : ""}
                    </span>
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
