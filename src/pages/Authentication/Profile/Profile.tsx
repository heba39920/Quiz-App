// import { Mail, ShieldCheck } from "lucide-react";
// import React from "react";
// import { useSelector } from "react-redux";

// const Profile = () => {
//   const auth = useSelector((state: any) => state.auth);

//   console.log(auth.user);
//   return (
//     <div className="max-w-4xl mx-auto px-6 py-10">
//       {/* Top Card */}
//       <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center gap-6 mb-8">
//         <div className="w-24 h-24 rounded-full overflow-hidden ring-2 ring-blue-500">
//           <img
//             src="/images/profile-placeholder.png"
//             alt="Profile"
//             className="w-full h-full object-cover"
//           />
//         </div>
//         <div>
//           <h2 className="text-2xl font-bold text-gray-800">
//             {auth.user.first_name} {auth.user.last_name}
//           </h2>
//           <p className="text-gray-500 flex items-center gap-2 mt-1">
//             <ShieldCheck size={16} className="text-blue-500" />
//             {auth.role}
//           </p>
//           <span className="inline-block mt-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">
//             ✅ {auth.user.status}
//           </span>
//         </div>
//       </div>

//       {/* Info Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="bg-white p-4 rounded-xl shadow">
//           <p className="text-sm text-gray-500 mb-1">Email</p>
//           <p className="flex items-center gap-2 font-medium text-gray-800">
//             <Mail size={16} /> {auth.user.email}
//           </p>
//         </div>
//         <div className="bg-white p-4 rounded-xl shadow">
//           <p className="text-sm text-gray-500 mb-1">Account ID</p>
//           <p className="font-medium text-gray-800">{auth.user._id}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
