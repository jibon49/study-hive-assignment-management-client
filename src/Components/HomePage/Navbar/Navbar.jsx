
import { NavLink } from "react-router-dom";
import userImg from "/user.png";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../AuthProviders/AuthProviders";
import logo from "/logo.png"







const Navbar = () => {


    const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light");

    useEffect(() => {
        localStorage.setItem("theme", theme);
        const localTheme = localStorage.getItem("theme");
        document.querySelector("html").setAttribute("data-theme", localTheme);
    }, [theme]);

    const toggleTheme = (e) => {
        if (e.target.checked) {
            setTheme("dark");
        }
        else {
            setTheme("light");
        }
    }

    const { user, logOut } = useContext(AuthContext)



    const links = <>

        <li><NavLink to='/'
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-[#16eead] font-bold" : ""
            }
        >Home</NavLink></li>

        <li><NavLink to='/create-assignment'
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-[#16eead] font-bold" : ""
            }
        >Create Assignment</NavLink></li>
        <li><NavLink to='/all-assignment'
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-[#16eead] font-bold" : ""
            }
        >All Assignment</NavLink></li>
        <li><NavLink to='/my-Assignment'
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-[#16eead] font-bold" : ""
            }
        >My Assignment </NavLink></li>


        <li><NavLink to='/submitted-assignment'
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-[#16eead] font-bold" : ""
            }
        >Submitted Assignment</NavLink></li>

    </>


    const handleLogout = () => {
        logOut();
    }

    return (


        <div className="navbar px-5 sticky top-0 glass z-10">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className=" menu-sm dropdown-content text-[#363636] mt-3 z-[1] p-2 bg-base-100 w-52">
                        <li><NavLink to='/'
                            className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "text-[#16eead] font-bold" : ""
                            }
                        >Home</NavLink></li>
                        {links}
                    </ul>
                </div>
                <div className="flex items-center gap-4">
                    <img className="h-12" src={logo} alt="" />
                    <a className=" normal-case font-extrabold text-xl text-[#007dfe]">StudyHive</a>
                </div>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="flex gap-5 px-1">
                    {links}
                </ul>
            </div>


            <div className="navbar-end">
                <input type="checkbox"
                    onChange={toggleTheme}
                    checked={theme === "light" ? false : true}
                    className="toggle toggle-error mr-5" />
                {
                    user ?
                        <>
                            <div>
                                <div className="flex items-center gap-2 group">
                                    <img className="w-10 h-10 rounded-full bg-fit mr-2" src={`${user.photoURL
                                        }`} alt="" />
                                    <p className="mr-2 group-hover:block hidden font-semibold capitalize">{user.displayName}</p>
                                </div>

                            </div>
                            <button onClick={handleLogout} className="hover:text-[#16eead] font-semibold">Logout</button>
                        </>
                        :
                        <>
                            <img className="w-10 h-10 mr-5" src={userImg} alt="" />
                            <NavLink to="/login" className="hover:text-[#16eead] font-semibold">Login</NavLink>
                        </>
                }
            </div>
        </div>
    );
};

export default Navbar;