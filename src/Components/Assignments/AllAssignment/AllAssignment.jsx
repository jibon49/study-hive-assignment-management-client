import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";


const AllAssignment = () => {

    const assignments = useLoaderData() || [];
    const [allAssignments, setAllAssignments] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [selectedDifficulty, setSelectedDifficulty] = useState('All');
    const [filteredAssignment, setFilteredAssignment] = useState([]);



    const [itemsPerPage, setItemsPerPage] = useState(10);
    const count = Array.isArray(assignments) ? assignments.length : 0;
    const numberOfPages = Math.ceil(count / itemsPerPage)
    const pages = [...Array(numberOfPages).keys()];

    const [currentPage, setCurrentPage] = useState(0);



    useEffect(() => {
        setLoading(true);
        setError(null);
        
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/pagination-assignments?page=${currentPage}&size=${itemsPerPage}`)
            .then(data => {
                // Ensure data.data is an array before setting it
                if (Array.isArray(data.data)) {
                    setAllAssignments(data.data)
                } else {
                    console.error('API response is not an array:', data.data);
                    setAllAssignments([]);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching assignments:', error);
                setError('Failed to load assignments. Please check your connection and try again.');
                setAllAssignments([]);
                setLoading(false);
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
            setFilteredAssignment(Array.isArray(allAssignments) ? allAssignments : [])
        }
        else {
            const filteredAss = Array.isArray(allAssignments) 
                ? allAssignments.filter(ass => ass.difficulty === selectedDifficulty)
                : [];
            setFilteredAssignment(filteredAss);
        }

    }, [allAssignments, selectedDifficulty])

    return (
        <div>

            <div className="flex mx-auto items-center max-w-6xl justify-between mb-4 mt-20">
                <h1 className="text-3xl font-bold">Available assignments: <span className="text-indigo-500">{count}</span></h1>
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

            {/* Error State */}
            {error && (
                <div className="max-w-6xl mx-auto mb-8">
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        <strong className="font-bold">Error!</strong>
                        <span className="block sm:inline"> {error}</span>
                    </div>
                </div>
            )}

            {/* Loading State */}
            {loading && (
                <div className="flex justify-center items-center py-20">
                    <div className="loading loading-spinner loading-lg text-primary"></div>
                    <span className="ml-4 text-lg">Loading assignments...</span>
                </div>
            )}

            {/* Assignment Grid */}
            {!loading && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
                    {
                        Array.isArray(filteredAssignment) && filteredAssignment.length > 0 ? (
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
                        ) : !error && (
                            <div className="col-span-full text-center py-8">
                                <p className="text-gray-500 text-lg">No assignments found.</p>
                                <p className="text-gray-400 text-sm mt-2">Check back later or try creating a new assignment.</p>
                            </div>
                        )
                    }
                </div>
            )}

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