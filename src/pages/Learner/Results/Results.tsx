import  { useState } from "react";
import { useResults } from "@/utils/hooks/StudentExam";
import styles from "./Results.module.css";

import Nodata from "@/components/NoData/Nodata";
import Loader from "@/components/Loader/Loader";

const Results = () => {
  const { data, isLoading, error } = useResults();
  const [selectedResult, setSelectedResult] = useState<any>(null);

 
  if (error) return <p>No Results Available Now</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Quiz results</h2>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.th}>Title</th>
            <th className={styles.th}>Score</th>
            <th className={styles.th}>Difficulty</th>
            <th className={styles.th}>Questions Number</th>
            <th className={styles.th}>Date</th>
            <th className={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
         {isLoading ? (
              <tr>
                <td colSpan={6} className="h-[500px]">
                  <Loader />
                </td>
              </tr>
         ) : data.length === 0 ? (
            <tr>
              <td colSpan={6}>
                <Nodata message="No results found." /> {/* Show NoData if no results */}
              </td>
            </tr>
         ) : (
            data.map((item: any) => {
              const quiz = item.quiz;
              const Score = item.result.score;
              const Difficulty = quiz.difficulty;
              const questionsNumber = quiz.questions_number;
              const date = new Date(quiz.schadule).toLocaleDateString("en-GB");

              return (
                <tr
                  key={item.result._id}
                  style={{ borderBottom: "1px solid #ccc", textAlign: "center" }}
                >
                  <td className={styles.td}>{quiz.title}</td>
                  <td className={styles.td}>{Score}</td>
                  <td className={styles.td}>{Difficulty}</td>
                  <td className={styles.td}>{questionsNumber}</td>
                  <td className={styles.td}>{date}</td>
                  <td className={styles.td}>
                    <button
                      className={styles.viewButton}
                      onClick={() => setSelectedResult(item)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              );
            })
         )}
        </tbody>
      </table>

      {/* Modal */}
      {selectedResult && (
        <div className={styles.modalOverlay} onClick={() => setSelectedResult(null)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>Results Details</h3>
            <div className={styles.modalBody}>
              <p><strong>Title:</strong> {selectedResult.quiz.title}</p>
              <p><strong>Participant:</strong> {selectedResult.result.participant.first_name} {selectedResult.result.participant.last_name}</p>
              <p><strong>Score:</strong> {selectedResult.result.score}</p>
              <p><strong>Difficulty:</strong> {selectedResult.quiz.difficulty}</p>
              <p><strong>Number of Questions:</strong> {selectedResult.quiz.questions_number}</p>
              <p><strong>Scheduled Date:</strong> {new Date(selectedResult.quiz.schadule).toLocaleString("en-GB")}</p>
            </div>
            <button onClick={() => setSelectedResult(null)} className={styles.closeButton}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Results;
