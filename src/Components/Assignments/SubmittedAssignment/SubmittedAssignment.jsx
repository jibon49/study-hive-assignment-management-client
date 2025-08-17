import { useState } from "react";

import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";


const SubmittedAssignment = () => {

    const submittedAssignments = useLoaderData() || [];
    const [unConfirmedAssignment, setUnConfirmedAssignment] = useState(Array.isArray(submittedAssignments) ? submittedAssignments : []);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleGiveMark = (id, modalId) => {
        document.getElementById(`my_modal_${modalId}`).showModal()
    }

    const handleSubmitModal = (e, assignment) => {

        e.preventDefault();
        setLoading(true);
        setError(null);
        
        const form = e.target;
        const id = assignment._id

        const marks = form.marks.value;
        const examinersFeedback = form.feedback.value;

        console.log(assignment, marks, examinersFeedback)

        fetch(`${import.meta.env.VITE_API_BASE_URL}/submitted/${id}`,
        
        {
            method: "PATCH",
            headers: {
                'content-type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                status: 'confirmed', obtainedMarks: marks,
                examinersFeedback: examinersFeedback
            })
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    
                    Swal.fire({
                        title: 'Success',
                        text: 'Assignment marked successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                    const remaining = unConfirmedAssignment.filter(submitted => submitted._id !== id)
                    setUnConfirmedAssignment(remaining)
                    
                    // Close the modal
                    document.getElementById(`my_modal_${assignment.assignmentId}`).close();
                    form.reset();
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error submitting marks:', error);
                setError('Failed to submit marks. Please try again.');
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to submit marks. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                setLoading(false);
            })

    }

    return (
        <div>
            <div className="p-8 rounded-md shadow-md">
                <h2 className="text-white text-2xl font-semibold mb-4">Submitted Assignments</h2>
                
                {/* Error State */}
                {error && (
                    <div className="mb-6">
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                            <strong className="font-bold">Error!</strong>
                            <span className="block sm:inline"> {error}</span>
                        </div>
                    </div>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center py-8">
                        <div className="loading loading-spinner loading-lg text-primary"></div>
                        <span className="ml-4 text-lg text-white">Processing...</span>
                    </div>
                )}

                <div className="overflow-x-auto">
                    <table className="text-center text-base table">
                        <thead>
                            <tr className="bg-indigo-500 text-white text-lg">
                                <th className="py-2 px-4">Assignment Title</th>
                                <th className="py-2 px-4">Marks</th>
                                <th className="py-2 px-4">Examinee Name</th>
                                <th className="py-2 px-4">Status</th>
                                <th className="py-2 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(unConfirmedAssignment) && unConfirmedAssignment.length > 0 ? (
                                unConfirmedAssignment
                                    .filter((assignment) => assignment.status === "pending")
                                    .map((assignment) => (
                                        <tr key={assignment._id} className="text-center">
                                            <td className="py-2 px-4">{assignment.title}</td>
                                            <td className="py-2 px-4">{assignment.marks}</td>
                                            <td className="py-2 px-4">{assignment.examineeName} <br />
                                            {assignment.currentUserEmail}
                                            </td>
                                            <td className="py-2 px-4 text-red-500">{assignment.status}</td>
                                            <td className="py-2 px-4">
                                                <button
                                                    onClick={() => handleGiveMark(assignment._id, assignment.assignmentId)}
                                                    disabled={loading}
                                                    className="bg-white text-[#16eead] px-3 py-1 rounded-full hover:bg-[#16eead] hover:text-white focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    Give Mark
                                                </button>


                                                <dialog id={`my_modal_${assignment.assignmentId}`} className="modal modal-bottom sm:modal-middle">
                                                    <div className="modal-box">
                                                        <h3 className="font-bold text-lg">Assignment Details</h3>

                                                        <button
                                                            onClick={() => document.getElementById(`my_modal_${assignment.assignmentId}`).close()}
                                                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                                        >
                                                            ✕
                                                        </button>


                                                        <form onSubmit={(e) => handleSubmitModal(e, assignment)}>
                                                            <div className="form-control mb-5">
                                                                <label className="label">
                                                                    <span className="text-xl font-semibold">Google Drive Link (PDF)</span>
                                                                </label>
                                                                <a href={assignment.link} 
                                                                   target="_blank" 
                                                                   rel="noopener noreferrer"
                                                                   className="underline text-start overflow-hidden hover:hover:overflow-auto text-blue-500">
                                                                    {assignment.link}
                                                                </a>
                                                            </div>


                                                            <div className="form-control mb-5">
                                                                <label className="label">
                                                                    <span className="text-xl font-semibold">Examinees Note</span>
                                                                </label>
                                                                <div className="border p-4 bg-gray-100 rounded-md">
                                                                    <p className="text-lg">{assignment.upDescription}</p>
                                                                </div>
                                                            </div>


                                                            <div className="form-control mb-5">
                                                                <label className="label">
                                                                    <span className="text-xl font-semibold">Marks (Max: {assignment.marks})</span>
                                                                </label>
                                                                <input
                                                                    type="number"
                                                                    name="marks"
                                                                    min={0}
                                                                    max={assignment.marks}
                                                                    className="input input-bordered w-full bg-[#F3F3F3]"
                                                                    placeholder="Enter marks"
                                                                    required
                                                                    disabled={loading}
                                                                />
                                                            </div>

                                                            <div className="form-control mb-5">
                                                                <label className="label">
                                                                    <span className="text-xl font-semibold">Feedback</span>
                                                                </label>
                                                                <textarea
                                                                    name="feedback"
                                                                    className="textarea textarea-bordered w-full bg-[#F3F3F3] h-40"
                                                                    placeholder="Enter feedback"
                                                                    required
                                                                    disabled={loading}
                                                                />
                                                            </div>

                                                            <div className="modal-action form-control">
                                                                <button 
                                                                    type="submit" 
                                                                    className="btn"
                                                                    disabled={loading}
                                                                >
                                                                    {loading ? (
                                                                        <>
                                                                            <span className="loading loading-spinner loading-sm"></span>
                                                                            Submitting...
                                                                        </>
                                                                    ) : (
                                                                        'Submit Marks'
                                                                    )}
                                                                </button>
                                                            </div>
                                                        </form>

                                                    </div>
                                                </dialog>



                                            </td>
                                        </tr>

                                    ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="py-8 text-center">
                                        <div className="text-gray-500">
                                            <p className="text-lg">No pending assignments to review.</p>
                                            <p className="text-sm mt-2">All submitted assignments have been graded.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>
            </div>


        </div>
    );
};

export default SubmittedAssignment;