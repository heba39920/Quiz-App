import React from "react";

const GroupList = () => {
  return (
    <>
        <section>
                <div className="Group-header flex justify-end mb-4">
                        <button
                            className="inline-flex items-center gap-2 px-6 py-2 main-border text-black text-sm font-medium rounded-3xl hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            aria-label="Add Group"
                        >
                            <svg
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4v16m8-8H4"
                            />
                            </svg>
                            <span className="hidden sm:inline">Add Group</span>
                        </button>
                </div>
                <div className="Group-List main-border  text-black p-4">
                       <h2 className="main-text text-xl font-semibold">Group List</h2>
                       <div className="Group-card">
                                <div className="grid grid-cols-2 gap-4">
                                        <div>1</div>
                                        <div>2</div>
                                </div>
                       </div>
                </div>
      </section>
    </>
  );
};

export default GroupList;
