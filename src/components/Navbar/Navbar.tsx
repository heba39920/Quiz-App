
import { LuMenu } from "react-icons/lu";



const Navbar= () => {
  return (
    <div className="flex items-center px-4 h-full bg-gray-100 justify-between">
      {/* Menu button visible only on md and smaller screens */}
      <button
        onClick={() => {
        }}
        className="p-2 border rounded md:hidden" // hide on lg screens and above
      >
        <LuMenu size={24} />
      </button>
      <div className="ml-4 font-bold">Navbar</div>
    </div>
  );
};

export default Navbar;