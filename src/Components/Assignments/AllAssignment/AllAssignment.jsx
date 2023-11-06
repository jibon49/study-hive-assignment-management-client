import { useLoaderData } from "react-router-dom";


const AllAssignment = () => {

    const assignments = useLoaderData();

    return (
        <div>
            <h1>All assignment:{assignments.length}</h1>
        </div>
    );
};

export default AllAssignment;