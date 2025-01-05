// Libraries and Hooks
import { useEffect, useState } from "react";
import axios from "axios";

// Components
import Header from "../components/header/Header";
import SideBar from "../components/sideBar/SideBar";
import Footer from "../components/footer/Footer";
import SearchBar from "../components/searchBar/SearchBar";
import Market from "../components/market/Market";
import MayBeYouCare from "../components/mayBeYouCare/MayBeYouCare";
// Assets

const HomePage = () => {
  useEffect(() => {
    document.title = "Home Page";
  });

  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const toggleSideBar = (isOpen) => {
    setIsSideBarOpen(isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.querySelector(".sidebar");
      if (sidebar && !sidebar.contains(event.target) && isSideBarOpen) {
        toggleSideBar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSideBarOpen]);

  return (
    <div className="flex flex-col items-center min-w-full min-h-screen">
      <div className="fixed inset-x-0 min-w-[1000px] bg-red-00 w-full">
        <Header toggleSideBar={() => toggleSideBar(!isSideBarOpen)} />
        {isSideBarOpen && <SideBar toggleSideBar={toggleSideBar} />}
      </div>

      <div className="flex items-center justify-center w-auto mt-20">
        <Market />
      </div>

      <SearchBar />

      <div className='flex w-[1000px] bg-red-000 px-10'>
        <div className='flex-col'>
          <div className='flex items-stretch justify-center bg-red mt-[20px] h-auto//'>
            <MayBeYouCare />
          </div>
          <div className='flex mt-10 mb-0 bg-red-00'>
            {/* <FinancialNew /> */}
          </div>
        </div>
      </div>

      <div className=" w-full flex items-center justify-center">
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default HomePage;
