
import defultAvater from "@/assets/images/default-avatar.png";
import { useCurrentUser } from "@/utils/hooks/Auth";
import { IoShieldCheckmark } from "react-icons/io5";
import { MdMailOutline } from "react-icons/md";
const Profile = () => {
 const { user } = useCurrentUser();

  
 
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Top Card */}
      <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center gap-6 mb-8 border dark:bg-[#0D1321] dark:text-white dark:border-[#fff]">
        <div className="w-24 h-24 rounded-full overflow-hidden ring-2 ring-[#f7d6bd] ">
          <img
            src={defultAvater}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800  dark:text-white">
            {user?.first_name} {user?.last_name}
          </h2>
          <p className="text-gray-500 flex items-center gap-2 mt-1  dark:text-white">
            /<IoShieldCheckmark size={16} className="text-blue-500" />
            {user?.role}
          </p>
          <span className="inline-block mt-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full ">
            ✅ {user?.status}
          </span>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
        <div className="bg-white p-4 rounded-xl shadow border dark:bg-[#0D1321] dark:border-[#fff]">
          <p className="text-sm text-gray-500 mb-1  dark:text-white">Email</p>
          <p className="flex items-center gap-2 font-medium text-gray-800  dark:text-white">
           <MdMailOutline size={16} /> {user?.email}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow border dark:bg-[#0D1321] dark:border-[#fff]">
          <p className="text-sm text-gray-500 mb-1 dark:text-white">Account ID</p>
          <p className="font-medium text-gray-800  dark:text-white">{user?._id}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
