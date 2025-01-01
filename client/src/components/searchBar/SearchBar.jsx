import searchIcon from "../../assets/icon/searchIcon.png";

const SearchBar = () => {
  return (
    <div className="flex items-center justify-center">
      <input
        type="search"
        name=""
        id=""
        className="mt-[30px] border border-gray-200 shadow-md mx-auto rounded-full h-[60px] py-4 px-14 w-[550px] bg-white
        placeholder:text-gray-700 placeholder:pl-2 placeholder:text-[16px] text-black bg-[left_12px_center] bg-no-repeat bg-left-center tracking-widest"
        placeholder="Search for stocks, ETF, news and more"
        style={{
          fontWeight: 400,
          backgroundImage: `url(${searchIcon})`,
          backgroundSize: "23px 23px",
          backgroundPosition: "left 25px center",
        }}
      />
    </div>
  );
};

export default SearchBar;
