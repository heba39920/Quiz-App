import { Link, useNavigate } from "react-router-dom";
import NotFoundImg from "@/assets/images/404.png";

const NotFound = () => {
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <img src={NotFoundImg} alt="Not Found" className="w-1/2 max-w-md mb-6" />

      <h2 className="text-3xl font-bold mb-2">Page Not Found</h2>

      <p className="text-gray-500 mb-6">
        The page you are looking for might have been removed,
        <br />
        had its name changed, or is temporarily unavailable.
      </p>

      <Link
        to="/"
        className="bg-main-color text-white font-semibold px-6 py-3 rounded-full hover:bg-opacity-90 transition mb-4"
      >
        Back to Home
      </Link>

      <button
        onClick={handleBackToLogin}
        className="bg-[#D28A7B] text-black font-semibold px-6 py-3 rounded-full hover:bg-opacity-80 transition"
      >
        Back to Login
      </button>
    </div>
  );
};

export default NotFound;
