import React, { useContext } from "react";
// import { useNavigate } from "react-router-dom";
import AppContext from "../../../context/AppContext";
import axios from "axios";
import { error, success } from "../../../helpers/Alert";

const StudentResult = () => {
  const { resultsByStudent, getResultsByStudent } = useContext(AppContext);
  // console.log(
  //   "🚀 ~ file: StudentResult.jsx:7 ~ StudentResult ~ resultsByStudent:",
  //   resultsByStudent
  // );

  let sn = 1;

  const base_url = process.env.REACT_APP_BASE_URL;
  // const navigate = useNavigate();

  const deleteHandler = async (id) => {
    try {
      // console.log("TEST ID!!!!!!!: ", id);
      const response = await axios.delete(`${base_url}/tests/delete?id=${id}`, {
        headers: { "content-type": "application/json" },
      });
      // console.log("DELETED TEST!!!!!!: ", response);
      if (response.status === 200) {
        success("Deleted test successfully");
        getResultsByStudent();
        // navigate("/admin/students");
        // goBack();
      }
    } catch (err) {
      console.log(err);
      error(err.response.data.error);
      error(err.response.data.message);
    }
  };

  return (
    <div className="w-[70%] shadow-lg bg-white p-8 flex flex-col gap-4 rounded-lg">
      {/* name & image */}
      <div className="flex w-full gap-4 items-center justify-start">
        <span className="text-xl font-sans font-semibold">Results </span>
      </div>

      <div className="w-full mt-5">
        <table className="w-full text-center table-fixed">
          <thead className="text-gray-700 h-12">
            <tr>
              <th className="w-[4rem]">S/N</th>
              <th>Course</th>
              <th>Score</th>
              <th></th>
            </tr>
          </thead>
          <div className="my-4"></div>

          <tbody>
            {resultsByStudent ? (
              <>
                {resultsByStudent.map((item, i) => (
                  <>
                    <tr key={i} className=" h-12 bg-teal-400/20 text-black">
                      <td>{sn++}</td>
                      <td>{item.courseTitle}</td>
                      <td>
                        {item.correctAnswers} 0f {item.totalQuestions}
                      </td>
                      <td
                        className="text-lg text-black font-bold cursor-pointer hover:text-red-400"
                        onClick={() => deleteHandler(item._id)}
                      >
                        x
                      </td>
                    </tr>
                    <div className="mb-5">x</div>
                  </>
                ))}
              </>
            ) : (
              <>
                <tr className="h-12 bg-teal-400/20">
                  <td></td>
                  <td>No results yet</td>
                  <td></td>
                </tr>
              </>
            )}
            {/* <div className="my-2"></div> */}
            {/* <tr className="h-12 bg-teal-400/20">
              <td>1</td>
              <td>Computer Science</td>
              <td>13 0f 60</td>
            </tr>
            <div className="mb-5"></div>
            <tr className="h-12 bg-teal-400/20">
              <td>1</td>
              <td>Nursing</td>
              <td>40 0f 60</td>
            </tr>
            <div className="mb-5"></div> */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentResult;
