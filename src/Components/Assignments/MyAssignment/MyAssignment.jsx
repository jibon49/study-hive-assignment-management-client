import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../AuthProviders/AuthProviders";


const MyAssignment = () => {

    const { user, loading } = useContext(AuthContext);

    let email = "mymail";

    if (!loading) {
        email = user.email
    }


    const [myAssignments, setMyAssignments] = useState([])

    const url = `${import.meta.env.VITE_API_BASE_URL}/my-assignment?email=${email}`

    useEffect(() => {

        if (!loading) {
            fetch(url, {credentials:'include'})
                .then(res => res.json())
                .then(data => setMyAssignments(data))
        }
    }, [loading, url])

    const handleView = (id, modalId) => {
        console.log('clicked handleView', id)
        document.getElementById(`my_modal_${modalId}`).showModal()

    }

    return (
        <div>
            {
                loading ? <span className="loading loading-spinner text-center mx-auto flex loading-lg"></span>
                :
                <div>
            <h1>My Assignment</h1>
            <div className="p-8 rounded-md shadow-md">
                <h2 className="text-white text-2xl font-semibold mb-4">My Assignments</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-white">
                        <thead>
                            <tr className="bg-indigo-500 text-white">
                                <th className="py-2 px-4">Assignment Title</th>
                                <th className="py-2 px-4">Status</th>
                                <th className="py-2 px-4">Assignment Marks</th>
                                <th className="py-2 px-4">Obtained Marks</th>
                                <th className="py-2 px-4">Feedback</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myAssignments.map((assignment) => (
                                <tr key={assignment.assignmentId} className="text-center">
                                    <td className="py-2 px-4">{assignment.title}</td>
                                    <td className="py-2 px-4">
                                        {
                                            assignment.status === 'pending' ? <span className="text-red-500">
                                                Pending
                                            </span>
                                                :
                                                <span className="text-[#16ee3d]">
                                                    Confirmed
                                                </span>
                                        }
                                    </td>
                                    <td className="py-2 px-4">{assignment.marks}</td>
                                    <td className="py-2 px-4">
                                        {
                                            assignment.status === 'pending' ? 'N/A' :
                                                assignment.obtainedMarks
                                        }
                                    </td>
                                    <td className="py-2 px-4">
                                        {
                                            assignment.status === 'pending' ? 'N/A' :
                                                <button
                                                    onClick={() => handleView(assignment._id, assignment.assignmentId)}
                                                    className="bg-white text-[#16eead] px-3 py-1 rounded-full hover:bg-[#16eead] hover:text-white focus:outline-none"
                                                >
                                                    View
                                                </button>
                                        }
                                        <dialog id={`my_modal_${assignment.assignmentId}`} className="modal modal-bottom sm:modal-middle">
                                            <div className="modal-box">
                                                <p className="py-4">{assignment.examinersFeedback}</p>
                                                <form method="dialog">
                                                    <button className="btn">Close</button>
                                                </form>
                                            </div>
                                        </dialog>
                                    </td>
                                </tr>
                            ))}
                            
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
            }
        </div>
    );
};

export default MyAssignment;