import { useEffect, useState } from "react";
import axios from "axios";

import InfoIcon from "../../assets/icon/infoIcon.png";
import UpArrow from "../../assets/icon/UpArrowIcon.png";
import PlusCircle from "../../assets/icon/plusIcon.png";

// tickers = ['VIC', 'ACB', 'FPT', 'BID', 'SSI', 'VIB', 'CTG']

const MayBeYouCare = () => {
  const [stockData, setStockData] = useState({
    vic: {},
    acb: {},
    fpt: {},
    bid: {},
    ssi: {},
    vib: {},
    ctg: {},
  });

  const fetchStockDailyOhlc = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/stock_price");
      setStockData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching stock data", error);
    }
  };

  const checkValidData = (data) => {
    return data && data.length > 0 ? true : false;
  };

  const getStockInfo = (data) => {
    if (checkValidData(data)) {
      return {
        closePrice: data[0].Close,
        highPrice: data[0].High,
        lowPrice: data[0].Low,
        openPrice: data[0].Open,
        volume: data[0].Volume,
      };
    }
    return {
      closePrice: "N/A",
      highPrice: "N/A",
      lowPrice: "N/A",
      openPrice: "N/A",
      volume: "N/A",
    };
  };

  const vic = getStockInfo(stockData.vic.data);
  const acb = getStockInfo(stockData.acb.data);
  const fpt = getStockInfo(stockData.fpt.data);
  const bid = getStockInfo(stockData.bid.data);
  const ssi = getStockInfo(stockData.ssi.data);
  const vib = getStockInfo(stockData.vib.data);
  const ctg = getStockInfo(stockData.ctg.data);
  
  useEffect(() => {
    fetchStockDailyOhlc();
    const interval = setInterval(() => {
      fetchStockDailyOhlc();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-[650px]">
      <div className="flex items-center justify-start w-full mb-4">
        <h1 className="text-xl font-semibold text-gray-600">May be you care (Sai API)</h1>
        <h1> note: per = (c htruoc - s hsau)/ (c htruoc) </h1>
        <div className="relative inline-block group">
          <button className="focus:outline-none">
            <img
              src={InfoIcon}
              alt="Info"
              className="w-[17px] mb-[2px] ml-[7px]"
            />
          </button>
          <span className="absolute left-1/2 transform -translate-x-1/2 mt-[30px] w-[200px] p-[10px] bg-white border-[2px] shadow-sm text-gray-700 text-sm rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none tracking-normal font-inter// text-[14px]">
            The system relies on your recent search content, the types of
            securities you follow, and other activities to generate this list
          </span>
        </div>
      </div>

      <button className="flex items-center justify-between w-[650px] text-sm bg-red-000 h-6 py-6 hover:bg-gray-100 border-t border-gray-200">
        <span className="text-center w-[70px] h-6 px-2 py-1 text-xs font-semibold tracking-widest text-white bg-orange-500 rounded-md">
          VIC
        </span>
        {/* <h1 className="flex items-center w-[280px] h-full justify-start font-semibold tracking-wider text-gray-600 bg-red-00">
          Ngân Hàng Thương Mại Quốc Tế
        </h1> */}
        <div className="flex items-center justify-start w-[90px] h-full font-semibold bg-green-00 ">
          O {vic.openPrice}
        </div>
        <div className="flex items-center justify-start w-[90px] h-full font-semibold bg-green-00 ">
          H {vic.highPrice}
        </div>
        <div
          className={`flex w-[90px] h-full items-center justify-start font-semibold tracking-wider bg-red-00 pr-4//////`}
        >
          L {vic.lowPrice}
        </div>
        <div
          className={`flex w-[90px] h-full items-center justify-start font-semibold tracking-wider bg-red-00 pr-4//////`}
        >
          C {vic.closePrice}
        </div>
        {/* <div
          className={`flex w-[90px] h-6 px-2 py-1 rounded-md font-semibold tracking-wider items-center justify-center bg-green-200 }`}
        >
          <img
            src={UpArrow}
            alt={"uparrow"}
            className="w-4 h-4 mr-1 opacity-100"
          />
          21,1 %
        </div> */}
      </button>
      <button className="flex items-center justify-between w-[650px] text-sm bg-red-000 h-6 py-6 hover:bg-gray-100 border-t border-gray-200">
        <span className="text-center w-[70px] h-6 px-2 py-1 text-xs font-semibold tracking-widest text-white bg-orange-500 rounded-md">
          ACB
        </span>
        {/* <h1 className="flex items-center w-[280px] h-full justify-start font-semibold tracking-wider text-gray-600 bg-red-00">
          Ngân Hàng Thương Mại Quốc Tế
        </h1> */}
        <div className="flex items-center justify-start w-[90px] h-full font-semibold bg-green-00 ">
          O {acb.openPrice}
        </div>
        <div className="flex items-center justify-start w-[90px] h-full font-semibold bg-green-00 ">
          H {acb.highPrice}
        </div>
        <div
          className={`flex w-[90px] h-full items-center justify-start font-semibold tracking-wider bg-red-00 pr-4//////`}
        >
          L {acb.lowPrice}
        </div>
        <div
          className={`flex w-[90px] h-full items-center justify-start font-semibold tracking-wider bg-red-00 pr-4//////`}
        >
          C {acb.closePrice}
        </div>
        {/* <div
          className={`flex w-[90px] h-6 px-2 py-1 rounded-md font-semibold tracking-wider items-center justify-center bg-green-200 }`}
        >
          <img
            src={UpArrow}
            alt={"uparrow"}
            className="w-4 h-4 mr-1 opacity-100"
          />
          21,1 %
        </div> */}
      </button>
      <button className="flex items-center justify-between w-[650px] text-sm bg-red-000 h-6 py-6 hover:bg-gray-100 border-t border-gray-200">
        <span className="text-center w-[70px] h-6 px-2 py-1 text-xs font-semibold tracking-widest text-white bg-orange-500 rounded-md">
          FPT
        </span>
        {/* <h1 className="flex items-center w-[280px] h-full justify-start font-semibold tracking-wider text-gray-600 bg-red-00">
          Ngân Hàng Thương Mại Quốc Tế
        </h1> */}
        <div className="flex items-center justify-start w-[90px] h-full font-semibold bg-green-00 ">
          O {fpt.openPrice}
        </div>
        <div className="flex items-center justify-start w-[90px] h-full font-semibold bg-green-00 ">
          H {fpt.highPrice}
        </div>
        <div
          className={`flex w-[90px] h-full items-center justify-start font-semibold tracking-wider bg-red-00 pr-4//////`}
        >
          L {fpt.lowPrice}
        </div>
        <div
          className={`flex w-[90px] h-full items-center justify-start font-semibold tracking-wider bg-red-00 pr-4//////`}
        >
          C {fpt.closePrice}
        </div>
        {/* <div
          className={`flex w-[90px] h-6 px-2 py-1 rounded-md font-semibold tracking-wider items-center justify-center bg-green-200 }`}
        >
          <img
            src={UpArrow}
            alt={"uparrow"}
            className="w-4 h-4 mr-1 opacity-100"
          />
          21,1 %
        </div> */}
      </button>
      <button className="flex items-center justify-between w-[650px] text-sm bg-red-000 h-6 py-6 hover:bg-gray-100 border-t border-gray-200">
        <span className="text-center w-[70px] h-6 px-2 py-1 text-xs font-semibold tracking-widest text-white bg-orange-500 rounded-md">
          BID
        </span>
        {/* <h1 className="flex items-center w-[280px] h-full justify-start font-semibold tracking-wider text-gray-600 bg-red-00">
          Ngân Hàng Thương Mại Quốc Tế
        </h1> */}
        <div className="flex items-center justify-start w-[90px] h-full font-semibold bg-green-00 ">
          O {bid.openPrice}
        </div>
        <div className="flex items-center justify-start w-[90px] h-full font-semibold bg-green-00 ">
          H {bid.highPrice}
        </div>
        <div
          className={`flex w-[90px] h-full items-center justify-start font-semibold tracking-wider bg-red-00 pr-4//////`}
        >
          L {bid.lowPrice}
        </div>
        <div
          className={`flex w-[90px] h-full items-center justify-start font-semibold tracking-wider bg-red-00 pr-4//////`}
        >
          C {bid.closePrice}
        </div>
        {/* <div
          className={`flex w-[90px] h-6 px-2 py-1 rounded-md font-semibold tracking-wider items-center justify-center bg-green-200 }`}
        >
          <img
            src={UpArrow}
            alt={"uparrow"}
            className="w-4 h-4 mr-1 opacity-100"
          />
          21,1 %
        </div> */}
      </button>
      <button className="flex items-center justify-between w-[650px] text-sm bg-red-000 h-6 py-6 hover:bg-gray-100 border-t border-gray-200">
        <span className="text-center w-[70px] h-6 px-2 py-1 text-xs font-semibold tracking-widest text-white bg-orange-500 rounded-md">
          SSI
        </span>
        {/* <h1 className="flex items-center w-[280px] h-full justify-start font-semibold tracking-wider text-gray-600 bg-red-00">
          Ngân Hàng Thương Mại Quốc Tế
        </h1> */}
        <div className="flex items-center justify-start w-[90px] h-full font-semibold bg-green-00 ">
          O {ssi.openPrice}
        </div>
        <div className="flex items-center justify-start w-[90px] h-full font-semibold bg-green-00 ">
          H {ssi.highPrice}
        </div>
        <div
          className={`flex w-[90px] h-full items-center justify-start font-semibold tracking-wider bg-red-00 pr-4//////`}
        >
          L {ssi.lowPrice}
        </div>
        <div
          className={`flex w-[90px] h-full items-center justify-start font-semibold tracking-wider bg-red-00 pr-4//////`}
        >
          C {ssi.closePrice}
        </div>
        {/* <div
          className={`flex w-[90px] h-6 px-2 py-1 rounded-md font-semibold tracking-wider items-center justify-center bg-green-200 }`}
        >
          <img
            src={UpArrow}
            alt={"uparrow"}
            className="w-4 h-4 mr-1 opacity-100"
          />
          21,1 %
        </div> */}
      </button>
      <button className="flex items-center justify-between w-[650px] text-sm bg-red-000 h-6 py-6 hover:bg-gray-100 border-t border-gray-200">
        <span className="text-center w-[70px] h-6 px-2 py-1 text-xs font-semibold tracking-widest text-white bg-orange-500 rounded-md">
          VIB
        </span>
        {/* <h1 className="flex items-center w-[280px] h-full justify-start font-semibold tracking-wider text-gray-600 bg-red-00">
          Ngân Hàng Thương Mại Quốc Tế
        </h1> */}
        <div className="flex items-center justify-start w-[90px] h-full font-semibold bg-green-00 ">
          O {vib.openPrice}
        </div>
        <div className="flex items-center justify-start w-[90px] h-full font-semibold bg-green-00 ">
          H {vib.highPrice}
        </div>
        <div
          className={`flex w-[90px] h-full items-center justify-start font-semibold tracking-wider bg-red-00 pr-4//////`}
        >
          L {vib.lowPrice}
        </div>
        <div
          className={`flex w-[90px] h-full items-center justify-start font-semibold tracking-wider bg-red-00 pr-4//////`}
        >
          C {vib.closePrice}
        </div>
        {/* <div
          className={`flex w-[90px] h-6 px-2 py-1 rounded-md font-semibold tracking-wider items-center justify-center bg-green-200 }`}
        >
          <img
            src={UpArrow}
            alt={"uparrow"}
            className="w-4 h-4 mr-1 opacity-100"
          />
          21,1 %
        </div> */}
      </button>
      <button className="flex items-center justify-between w-[650px] text-sm bg-red-000 h-6 py-6 hover:bg-gray-100 border-t border-gray-200">
        <span className="text-center w-[70px] h-6 px-2 py-1 text-xs font-semibold tracking-widest text-white bg-orange-500 rounded-md">
          CTG
        </span>
        {/* <h1 className="flex items-center w-[280px] h-full justify-start font-semibold tracking-wider text-gray-600 bg-red-00">
          Ngân Hàng Thương Mại Quốc Tế
        </h1> */}
        <div className="flex items-center justify-start w-[90px] h-full font-semibold bg-green-00 ">
          O {ctg.openPrice}
        </div>
        <div className="flex items-center justify-start w-[90px] h-full font-semibold bg-green-00 ">
          H {ctg.highPrice}
        </div>
        <div
          className={`flex w-[90px] h-full items-center justify-start font-semibold tracking-wider bg-red-00 pr-4//////`}
        >
          L {ctg.lowPrice}
        </div>
        <div
          className={`flex w-[90px] h-full items-center justify-start font-semibold tracking-wider bg-red-00 pr-4//////`}
        >
          C {ctg.closePrice}
        </div>
        {/* <div
          className={`flex w-[90px] h-6 px-2 py-1 rounded-md font-semibold tracking-wider items-center justify-center bg-green-200 }`}
        >
          <img
            src={UpArrow}
            alt={"uparrow"}
            className="w-4 h-4 mr-1 opacity-100"
          />
          21,1 %
        </div> */}
      </button>
    </div>
  );
};

export default MayBeYouCare;
