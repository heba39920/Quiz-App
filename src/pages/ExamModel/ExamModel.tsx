import React from 'react'

const ExamModel =() => {

     const questions = [
    {
      id: 1,
      question: "What is the main purpose of the React library in front-end development?",
      options: [
        "A. To manage backend databases",
        "B. To perform mathematical operations",
        "C. To build user interfaces using components",
        "D. To style web pages using CSS",
      ],
      answer: "C. To build user interfaces using components",
    },
    {
      id: 2,
      question: "Which HTML tag is used to link an external CSS file to a webpage?",
      options: ["A. <script>", "B. <style>", "C. <link>", "D. <css>"],
      answer: "C. <link>",
    },
     {
      id: 3,
      question: "Which HTML tag is used to link an external CSS file to a webpage?",
      options: ["A. <script>", "B. <style>", "C. <link>", "D. <css>"],
      answer: "C. <link>",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
     

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Quizzes</h1>
          
        </div>

        {/* Questions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {questions.map((q) => (
            <div key={q.id} className="bg-white rounded-lg shadow p-4">
              <h3 className="font-semibold mb-3">Question {q.id}</h3>
              <p className="mb-4">{q.question}</p>
              <div className="space-y-2">
                {q.options.map((opt, index) => (
                  <label
                    key={index}
                    className={`block p-2 border rounded-lg cursor-pointer hover:bg-gray-50`}
                  >
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      value={opt}
                      className="mr-2"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="mt-6 text-right">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};


export default ExamModel