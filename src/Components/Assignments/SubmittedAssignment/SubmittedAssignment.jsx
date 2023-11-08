import { useState } from "react";

import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";


const SubmittedAssignment = () => {




    const submittedAssignments = useLoaderData();

    const [unConfirmedAssignment, setUnConfirmedAssignment] = useState(submittedAssignments)

    const handleGiveMark = (id, modalId) => {
        document.getElementById(`my_modal_${modalId}`).showModal()
    }

    const handleSubmitModal = (e, assignment) => {

        e.preventDefault();
        const form = e.target;
        const id = assignment._id

        const marks = form.marks.value;
        const examinersFeedback = form.feedback.value;

        console.log(assignment, marks, examinersFeedback)

        fetch(`online-group-study-assignment-server-rcov966xi-jibon49.vercel.app/submitted/${id}`,
        
        {
            method: "PATCH",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                status: 'confirmed', obtainedMarks: marks,
                examinersFeedback: examinersFeedback
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    
                    Swal.fire({
                        title: 'Success',
                        text: 'Assignment marked successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                    const remaining = submittedAssignments.filter(submitted => submitted._id !== id)
                    setUnConfirmedAssignment(remaining)
                }
            })

    }

    return (
        <div>
            <div className="p-8 rounded-md shadow-md">
                <h2 className="text-white text-2xl font-semibold mb-4">Submitted Assignments</h2>
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
                            {unConfirmedAssignment
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
                                                className="bg-white text-[#16eead] px-3 py-1 rounded-full hover:bg-[#16eead] hover:text-white focus:outline-none"
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
                                                            <a href={assignment.link} className="underline text-start overflow-hidden hover:hover:overflow-auto
                                                        text-blue-500
                                                        ">
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
                                                                <span className="text-xl font-semibold">Marks</span>
                                                            </label>
                                                            <input
                                                                type="number"
                                                                name="marks"
                                                                min={0}
                                                                max={assignment.marks}
                                                                className="input input-bordered w-full bg-[#F3F3F3]"
                                                                placeholder="Enter marks"
                                                                required
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
                                                            />
                                                        </div>

                                                        <div className="modal-action form-control">
                                                            <button type="submit" className="btn">
                                                                Submit Marks
                                                            </button>
                                                        </div>
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
    );
};

export default SubmittedAssignment;