
import { useContext, useState } from 'react';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

import Swal from 'sweetalert2'
import axios from 'axios';
import { AuthContext } from '../../../AuthProviders/AuthProviders';

const CreateAssignment = () => {

    const {user} = useContext(AuthContext)

    const [dueDate, setDueDate] = useState(null)

    const handleAddAssignment = e => {
        e.preventDefault();
        const form = e.target;

        const title = form.title.value;
        const imageUrl = form.image.value;
        const difficulty = form.difficulty.value;
        const marks = form.marks.value;
        const description = form.description.value;
        const creatorEmail = user.email;
        const formattedDueDate = dueDate ? dueDate.toLocaleString() : '';


        const createAssignment = {title, formattedDueDate, imageUrl, difficulty, marks, description, creatorEmail}




        console.log(createAssignment);


        axios.post('http://localhost:5000/create-assignment',createAssignment)
         .then(data=>{
            console.log(data.data);
            if(data.data.insertedId){
                Swal.fire({
                    title: 'Success',
                    text: 'Assignment created Successfully',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                  })
            }
        })


    }

    return (
        <div className="max-w-7xl mx-auto mt-20">
            <form onSubmit={handleAddAssignment}>

                {/* title and image */}
                <div className="flex md:flex gap-5">
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="text-xl font-semibold">Title</span>
                        </label>
                        <input type="text" name="title" placeholder="title" className="input input-bordered w-full bg-[#F3F3F3]" required />
                    </div>
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="text-xl font-semibold">Image</span>
                        </label>
                        <input type="text" name="image" placeholder="image url" className="input input-bordered w-full bg-[#F3F3F3]" required />
                    </div>
                </div>

                {/* Difficulty and marks */}
                <div className="flex md:flex gap-5">
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="text-xl font-semibold">Difficulty</span>
                        </label>
                        <select name="difficulty" className="select select-bordered w-full bg-[#F3F3F3]">
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="text-xl font-semibold">Marks</span>
                        </label>
                        <input type="number" name="marks" min="1" placeholder="price" className="input input-bordered w-full bg-[#F3F3F3]" required />
                    </div>
                </div>

                <div className="flex md:flex gap-5">
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="text-xl font-semibold">Due</span>
                        </label>
                        <DatePicker
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
        </div>
    );
};

export default CreateAssignment;