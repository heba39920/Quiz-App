import InputField from "@/components/InputField"



const Login = () => {
  return (
  <>
  <h2 className="text-xl text-lime-300 font-semibold mb-6">
    Continue your learning journey with QuizWiz!
  </h2>

  <div className="flex gap-4 mb-6">
    <button className="flex items-center gap-2 px-6 py-3 border-2 border-lime-400 text-lime-400 rounded-md bg-[#1a1e2f]">
      <span className="text-xl">🧑‍💼</span> Sign in
    </button>
    <button className="flex items-center gap-2 px-6 py-3 bg-[#1a1e2f] text-white rounded-md">
      <span className="text-xl">➕</span> Sign Up
    </button>
  </div>

  {/* المدخلات */}
  <form className="space-y-4">
    <div>
       <label className="text-sm block mb-1">Registered email address</label>
        <InputField
          icon="📧"
          placeholder="Type your email"
          type="email"
        />
      </div>
    

    <div>
      <label className="block mb-1 text-sm">Password</label>
      <>
        
        <label className="text-sm block mb-1">Password</label>
        <InputField
          icon="📧"
          placeholder="Type your password"
          type="password"
        />
      </>
    </div>

    <div className="flex justify-between items-center mt-4">
      <button
        type="submit"
        className="bg-white text-black font-semibold py-2 px-6 rounded-md flex items-center gap-2"
      >
        Sign In ✅
      </button>

      <a href="#" className="text-sm text-lime-400 underline">
        Forgot password? click here
      </a>
    </div>
  </form>
</>


  )
}

export default Login
