import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";


const AllAssignment = () => {

    const assignments = useLoaderData();
    const [allAssignments, setAllAssignments] = useState(assignments)

    const [selectedDifficulty, setSelectedDifficulty] = useState('All');
    const [filteredAssignment, setFilteredAssignment] = useState(assignments);



    const [itemsPerPage, setItemsPerPage] = useState(10);
    const count = assignments.length
    const numberOfPages = Math.ceil(count / itemsPerPage)
    const pages = [...Array(numberOfPages).keys()];

    const [currentPage, setCurrentPage] = useState(0);



    useEffect(() => {
        axios.get(`online-group-study-assignment-server-rcov966xi-jibon49.vercel.app/pagination-assignments?page=${currentPage}&size=${itemsPerPage}`,
        {withCredentials:true}
        )
            .then(data => {
                setAllAssignments(data.data)
            })
    }, [currentPage, itemsPerPage])


    const handleItemsPerPage = e => {
        const val = parseInt(e.target.value);
        setItemsPerPage(val);
        setCurrentPage(0);

    }


    const handlePrevious = () => {
        if (currentPage > 0)
            setCurrentPage(currentPage - 1)
    }
    const handleNext = () => {
        if (currentPage < pages.length - 1)
            setCurrentPage(currentPage + 1)
    }


    const handleFilterChange = (e) => {
        setSelectedDifficulty(e.target.value);


    }

    useEffect(() => {
        if (selectedDifficulty === 'All') {
            setFilteredAssignment(allAssignments)
        }
        else {
            const filteredAss = allAssignments.filter(ass => ass.difficulty === selectedDifficulty);
            setFilteredAssignment(filteredAss);
        }

    }, [allAssignments, selectedDifficulty])

    return (
        <div>

            <div className="flex mx-auto items-center max-w-6xl justify-between mb-4 mt-20">
                <h1 className="text-3xl font-bold">Available assignments: <span className="text-indigo-500">{assignments.length}</span></h1>
                <div>
                    <label className="mr-2 font-bold">Filter by Difficulty:</label>
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
                {
                    filteredAssignment.map(assignment =>
                        <div key={assignment._id} className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mt-8">
                            <div className="flex items-center justify-center p-6">
                                <img className="h-56 w-auto lg:w-80 rounded-xl object-cover" src={assignment.imageUrl} alt="Assignment Thumbnail" />
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
                                    <Link to={`/view-assignment/${assignment._id}`}>
                                        <button className="bg-[#16eead] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-opacity-80">
                                            View Assignment
                                        </button>
                                    </Link>
                                    <Link to={`/update-assignment/${assignment._id}`}>
                                        <button className="bg-[#16eead] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-opacity-80">
                                            Update Assignment
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>

            <div className="max-w-6xl mx-auto items-center flex mt-20">
                <div className="join mx-auto">

                    <button className="join-item btn mr-2"
                        onClick={handlePrevious}
                    >Previous page</button>
                    {
                        pages.map(number => <button
                            onClick={() => setCurrentPage(number)}
                            key={number} className={`join-item btn ${currentPage === parseInt(number) ? 'bg-[#16eead]' : ''}`}>{number}</button>)
                    }

                    <button
                        onClick={handleNext}
                        className="join-item btn ml-2 rounded-r-lg">Next</button>

                    <select value={itemsPerPage} onChange={handleItemsPerPage}
                        className="bg-base-200 ml-5 rounded-r-lg px-3"
                        name="" id="">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">20</option>
                    </select>
                </div>
            </div>

        </div>
    );
};

export default AllAssignment;