import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";


const AllAssignment = () => {

    const assignments = useLoaderData();
    const [selectedDifficulty, setSelectedDifficulty] = useState('All');
    const [filteredAssignment, setFilteredAssignment] = useState(assignments)



    const handleFilterChange = (e) => {
        setSelectedDifficulty(e.target.value);

        
    }

    useEffect(() => {
        if(selectedDifficulty === 'All'){
            setFilteredAssignment(assignments)
        }
        else{
           const filteredAss = assignments.filter(ass=>ass.difficulty === selectedDifficulty );
            setFilteredAssignment(filteredAss);
        }
        
    }, [assignments, selectedDifficulty])

    return (
        <div>
            <h1>All assignment:{assignments.length}</h1>
            <div className="flex mx-auto items-center max-w-6xl justify-end mb-4">
                <label className="mr-2">Filter by Difficulty:</label>
                <select 
                    value={selectedDifficulty} 
                    onChange={handleFilterChange} 
                    className="px-3 py-2 border rounded">
                    <option value="All">All</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto">
                {
                    filteredAssignment.map(assignment=>
                        <div key={assignment._id} className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mt-8">
                    <div className="flex items-center justify-center p-6">
                        <img className=" object-cover" src={assignment.imageUrl} alt="Assignment Thumbnail" />
                    </div>
                    <div className="p-6">
                        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{assignment.title}</div>
                        <div className="mt-2">
                            <span className="text-gray-500">Marks:</span>
                            <span className="text-sm font-medium text-gray-800 ml-2">{assignment.marks}</span>
                        </div>
                        <div className="mt-2">
                            <span className="text-gray-500">Difficulty:</span>
                            <span className="text-sm capitalize font-medium text-gray-800 ml-2">{assignment.difficulty}</span>
                        </div>
                        <div className="mt-4 flex justify-between">
                            <button className="bg-[#16eead] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-opacity-80">
                                View Assignment
                            </button>
                            <button className="bg-[#16eead] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-opacity-80">
                                Update Assignment
                            </button>
                        </div>
                    </div>
                </div>
                        )
                }
            </div>



        </div>
    );
};

export default AllAssignment;