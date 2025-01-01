
// Libraries and Hooks
import { useEffect, useState } from "react";

// Components
import Header from "../components/header/Header";
import SideBar from "../components/sideBar/SideBar";

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
    <div>
      <Header toggleSideBar={() => toggleSideBar(!isSideBarOpen)} />
      {isSideBarOpen && <SideBar toggleSideBar={toggleSideBar} />}
      
    </div>
  );
};

export default HomePage;
