import { NavLink } from "react-router-dom";

const Error = () => {
    return (
        <div className="bg-white">
            <img className="max-h-[90vh] mx-auto" src="https://i.ibb.co/Pt003Vj/notfound.jpg" alt="" />
            <NavLink><button className="btn btn-primary flex mx-auto">Go Home</button></NavLink>
        </div>
    );
};

export default Error;