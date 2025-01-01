
// Libraries and Hooks
import { useEffect, useState } from "react";

// Components
import Branding from "../branding/Branding";
import Hamburger from "./Hamburger.jsx";
import Notification from "./Notification.jsx";
import SignIn from "./SignIn.jsx";





// eslint-disable-next-line react/prop-types
const Header = ({ toggleSideBar }) => {
  const [isScrolled, setIsScrolled] = useState(false);

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
