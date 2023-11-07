import { useContext } from "react";
import { AuthContext } from "../../../AuthProviders/AuthProviders";
import { useLoaderData } from "react-router-dom";


const SubmittedAssignment = () => {


    const {user} =useContext(AuthContext)
    
    const submittedAssignments = useLoaderData();


    const handleGiveMark=(id)=>{
        console.log(id,user)
    }

    return (
        <div>
            <div className=" p-8 rounded-md shadow-md">
                <h2 className="text-white text-2xl font-semibold mb-4">Submitted Assignments</h2>
                <table className="min-w-full border border-white">
                    <thead>
                        <tr className="bg-[#16eead] text-white">
                            <th className="py-2 px-4">Assignment Title</th>
                            <th className="py-2 px-4">Marks</th>
                            <th className="py-2 px-4">Examinee Name</th>
                            <th className="py-2 px-4">Actions</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {submittedAssignments.map((assignment) => (
                            <tr key={assignment.id} className="text-center">
                            <td className="py-2 px-4">{assignment.title}</td>
                            <td className="py-2 px-4">{assignment.marks}</td>
                            <td className="py-2 px-4">{assignment.examineeName}</td>
                            <td className="py-2 px-4">
                              <button
                                onClick={() => handleGiveMark(assignment._id)}
                                className="bg-white text-[#16eead] px-3 py-1 rounded-full hover:bg-[#16eead] hover:text-white focus:outline-none"
                              >
                                Give Mark
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                    
                </table>
            </div>

        </div>
    );
};

export default SubmittedAssignment;