import { useContext, useState } from "react";
import DatePicker from "react-date-picker";
import { useLoaderData, useNavigate } from "react-router-dom";

import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../../AuthProviders/AuthProviders";


const UpdateAssignment = () => {

    const assignment = useLoaderData();
    const navigate = useNavigate();


    const { user } = useContext(AuthContext)

    const { _id, title, formattedDueDate, imageUrl, difficulty, marks, description, creatorEmail } = assignment;


    const userEmail = user.email

    const [dueDate, setDueDate] = useState(null)





    const handleUpdateAssignment = e => {
        e.preventDefault();
        const form = e.target;

        const title = form.title.value;
        const imageUrl = form.image.value;
        const difficulty = form.difficulty.value;
        const marks = form.marks.value;
        const description = form.description.value;
        const formattedDueDate = dueDate ? dueDate.toLocaleString() : '';


        const updateAssignment = { title, formattedDueDate, imageUrl, difficulty, marks, description, creatorEmail }




        console.log(updateAssignment);


        axios.put(`online-group-study-assignment-server-rcov966xi-jibon49.vercel.app/assignment/${_id}`, updateAssignment)
            .then(data => {
                console.log(data.data);
                if (data.data.modifiedCount > 0) {
                    Swal.fire({
                        title: 'Success',
                        text: 'Assignment updated Successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                    navigate('/all-assignment')
                }
            })


    }


    return (
        <div className="max-w-7xl mx-auto mt-20">

            {
                userEmail === creatorEmail ?
                    <form onSubmit={handleUpdateAssignment}>

                        {/* title and image */}
                        <div className="flex md:flex gap-5">
                            <div className="form-control md:w-1/2">
                                <label className="label">
                                    <span className="text-xl font-semibold">Title</span>
                                </label>
                                <input type="text"
                                    defaultValue={title}
                                    name="title"
                                    placeholder="title" className="input input-bordered w-full bg-[#F3F3F3]" required />
                            </div>
                            <div className="form-control md:w-1/2">
                                <label className="label">
                                    <span className="text-xl font-semibold">Image</span>
                                </label>
                                <input type="text" name="image"
                                    defaultValue={imageUrl}
                                    placeholder="image url" className="input input-bordered w-full bg-[#F3F3F3]" required />
                            </div>
                        </div>

                        {/* Difficulty and marks */}
                        <div className="flex md:flex gap-5">
                            <div className="form-control md:w-1/2">
                                <label className="label">
                                    <span className="text-xl font-semibold">Difficulty</span>
                                </label>
                                <select name="difficulty"
                                    defaultValue={difficulty}
                                    className="select select-bordered w-full bg-[#F3F3F3]">
                                    <option value="easy">Easy</option>
                                    <option value="medium">Medium</option>
                                    <option value="hard">Hard</option>
                                </select>
                            </div>
                            <div className="form-control md:w-1/2">
                                <label className="label">
                                    <span className="text-xl font-semibold">Marks</span>
                                </label>
                                <input type="number"
                                    defaultValue={marks}
                                    name="marks" min="1" placeholder="price" className="input input-bordered w-full bg-[#F3F3F3]" required />
                            </div>
                        </div>

                        <div className="flex md:flex gap-5">
                            <div className="form-control md:w-1/2">
                                <label className="label">
                                    <span className="text-xl font-semibold">Due</span>
                                </label>
                                <DatePicker
                                    defaultValue={formattedDueDate}
                                    required
                                    className=" p-4 border-none rounded bg-white shadow-md"
                                    onChange={date => setDueDate(date)}
                                    value={dueDate}
                                />
                            </div>
                        </div>




                        {/* description */}
                        <div className="">

                            <div className="form-control">
                                <label className="label">
                                    <span className="text-xl font-semibold"> Description</span>
                                </label>
                                <textarea
                                    defaultValue={description}
                                    name="description"
                                    placeholder="description"
                                    className="textarea textarea-bordered w-full bg-[#F3F3F3] h-40"

                                    required />
                            </div>
                        </div>

                        {/* submit */}
                        <div className=" w-full mx-auto mt-6">
                            <button className=" btn btn-outline w-full mb-2">
                                Submit
                            </button>
                        </div>
                    </form>
                    :
                    <div>
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold">Error:</strong>
                            <span className="block sm:inline"> You don not have the permission to update.</span>
                        </div>

                    </div>
            }

        </div>
    );
};

export default UpdateAssignment;