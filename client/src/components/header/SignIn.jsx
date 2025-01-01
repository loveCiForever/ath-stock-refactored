import { useNavigate } from "react-router-dom";

const SignInButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className="flex items-center justify-center ml-1 active:scale-[.90] active:duration-75 transition-all shadow-xs hover:border hover:rounded-lg hover:px-3 hover:py-1 hover:bg-gray-200 hover:border-white"
      onClick={() => {
        navigate("/signin");
      }}
    >
      <p className="mb-[0px] font-semibold text-sm">
        Sign in
      </p>
    </button>
  );
};

export default SignInButton;
