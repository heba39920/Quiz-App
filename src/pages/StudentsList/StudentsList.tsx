import { BsArrowRight } from "react-icons/bs"


const StudentsList = () => {
  return (
    <div className="m-[21px] border-1 border-[#00000033] p-[20px]">
        <h2>Students list</h2>
        <ul className="flex gap-5 mt-4 mb-5">
            <li className="border-1 rounded-4xl border-[#00000033] px-[35px] py-[6px]">Group 1</li>
            <li>Group 1</li>
            <li>Group 1</li>
        </ul>
      <div className="flex flex-col">
       <div className="flex w-[100%] items-center justify-between  border-1 border-[#00000033] mb-2.5">
   <div className="flex items-center">
     <img className="w-[70px] h-[70px] object-fill me-5" src="https://i.pravatar.cc/400" alt="avatar" />
    <div className="details">
      <div className=" font-semibold">Emmanuel James</div>
      <div className=" font-medium">class rank: 2nd | Average score: 87%</div>
    </div>
   </div>
    <div className="me-3 bg-[#0D1321] text-white rounded-full p-1.5"><BsArrowRight size={20}/></div>
  </div>
   
      </div>
    </div>
  )
}

export default StudentsList
