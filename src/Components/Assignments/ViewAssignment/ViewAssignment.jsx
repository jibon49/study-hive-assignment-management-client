import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../AuthProviders/AuthProviders";
import Swal from "sweetalert2";



const ViewAssignment = () => {
    

    const navigate = useNavigate();
    const assignment = useLoaderData();
    const { user } = useContext(AuthContext)
    const currentUserEmail = user.email
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const examineeName = user.displayName

    const { _id, assignmentId, title, formattedDueDate, imageUrl, difficulty, marks, description, creatorEmail } = assignment;

    const [alreadySubmit, setAlreadySubmit] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/submitted')
            .then(res => res.json())
            .then(data => {
                setAlreadySubmit(data)
            })
    }, [])


    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const upDescription = form.upDescription.value;
        const link = form.link.value;


        console.log(upDescription, link)


        const submittedAssignment = { assignmentId, title, formattedDueDate, imageUrl, difficulty, marks, description, creatorEmail, upDescription, link, currentUserEmail,examineeName }

        console.log(submittedAssignment)


        const inSubmit = alreadySubmit.find(assign => (assign.assignmentId === assignmentId) && (assign.currentUserEmail === currentUserEmail))

        if (hasSubmitted) {
            document.getElementById('my_modal_1').close();
            Swal.fire({
                title: 'Error!',
                text: 'You have already submitted the assignment',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
            return;
        }

        if (inSubmit) {

            document.getElementById('my_modal_1').close();
            Swal.fire({
                title: 'Error!',
                text: 'You have already submitted the assignment',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
        else {
            axios.post('http://localhost:5000/submitted', submittedAssignment)
                .then(data => {
                    console.log(data.data)

                    if (data.data.insertedId) {
                        document.getElementById('my_modal_1').close();
                        Swal.fire({
                            title: 'Success',
                            text: 'Assignment Submitted Successfully',
                            icon: 'success',
                            confirmButtonText: 'Cool'
                        })
                        setHasSubmitted(true)
                    }
                })

        }


    }

    const handleDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                if (currentUserEmail === creatorEmail) {
                    fetch(`http://localhost:5000/assignments/${_id}`, {
                        method: "DELETE"
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data)
                            if (data.deletedCount > 0) {
                                Swal.fire(
                                    'Deleted!',
                                    'Assignment has been deleted.',
                                    'success'
                                )
                                navigate('/all-assignment')
                            }
                        })
                }

                else{
                    Swal.fire({
                        title: 'Error!',
                        text: 'You dont have permission to delete this assignment',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    })
                }


            }
        })
    }



    useEffect(() => {
        setHasSubmitted(false)
    }, [assignment])

    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mt-8">
            <div className="flex items-center p-8 justify-center">
                <img className="rounded-md w-full object-cover" src={imageUrl} alt="Assignment Image" />
            </div>
            <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{title}</div>
                <p className="mt-2 text-gray-500">{description}</p>
                <div className="mt-4">
                    <span className="text-[#16eead] capitalize text-sm font-medium">Difficulty: {difficulty}</span>
                    <span className="text-sm font-medium text-gray-500 ml-2">Marks: {marks}</span>
                </div>
                <div className="mt-4">
                    <span className="text-gray-500">Due Date:</span>
                    <span className="text-sm font-medium text-gray-800 ml-2">{formattedDueDate}</span>
                </div>
                <div className="mt-6 flex justify-between">


                    <Link to={'/all-assignment'}>
                        <button className="bg-indigo-400 text-white px-4 py-2 rounded-full">Go back</button>
                    </Link>


                    {/* button 1 */}
                    <button className="bg-[#16eead] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-opacity-80 " onClick={() => document.getElementById('my_modal_1').showModal()}>
                        Take Assignment
                    </button>

                    <dialog id="my_modal_1" className=" modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Upload Assignment</h3>

                            <button onClick={() => document.getElementById('my_modal_1').close()} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

                            <form onSubmit={handleSubmit}>
                                <div className="form-control mb-5">
                                    <label className="label">
                                        <span className="text-xl font-semibold"> Description</span>
                                    </label>
                                    <textarea
                                        name="upDescription"
                                        placeholder="description"
                                        className="textarea textarea-bordered w-full bg-[#F3F3F3] h-40"

                                        required />
                                </div>


                                <div className="form-control">
                                    <label className="label">
                                        <span className="text-xl font-semibold">Pdf link</span>
                                    </label>
                                    <input type="text"
                                        name="link" min="1" placeholder="pdf link" className="input input-bordered w-full bg-[#F3F3F3]" required />
                                </div>

                                <div className="modal-action form-control">

                                    <button className="btn">Submit</button>

                                </div>
                            </form>


                        </div>


                    </dialog>


                    <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-opacity-80">
                        Delete Assignment
                    </button>
                </div>
            </div>
        </div>

    );
};

export default ViewAssignment;