
import { NavLink } from "react-router-dom";
import userImg from "/user.png";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../AuthProviders/AuthProviders";








const Navbar = () => {


    const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme"):"light");

    useEffect(()=>{
        localStorage.setItem("theme",theme);
        const localTheme = localStorage.getItem("theme");
        document.querySelector("html").setAttribute("data-theme", localTheme);
    },[theme]);

    const toggleTheme = (e)=>{
        if(e.target.checked){
            setTheme("dark");
        }
        else{
            setTheme("light");
        }
    }

    const {user,logOut} = useContext(AuthContext)

    console.log(user)


    const links = <>
        <li><NavLink to='/'
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-[#16eead] font-bold" : ""
            }
        >Home</NavLink></li>
        <li><NavLink to='/add-product'
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-[#16eead] font-bold" : ""
            }
        >Add Product</NavLink></li>
        <li><NavLink to='/my-cart'
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-[#16eead] font-bold" : ""
            }
        >My Cart</NavLink></li>
        <li><NavLink to='/all-products'
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-[#16eead] font-bold" : ""
            }
        >All Products</NavLink></li>


    </>


const handleLogout=()=>{
    logOut();
}

    return (


        <div className="navbar bg-[#363636] text-white px-5">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content text-[#363636] mt-3 z-[1] p-2 bg-base-100 w-52">
                        {links}
                    </ul>
                </div>
                <a className=" normal-case font-extrabold text-xl text-[#16eead]">TechBay</a>
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
                        <><img className="w-10 h-10 rounded-full bg-fit mr-5" src={`${user.photoURL
                        }`} alt="" />
                        <p className="mr-2">{user.displayName}</p>
                            <button onClick={handleLogout} className="hover:text-[#16eead] font-semibold">Logout</button>
                            </>
                        :
                        <>
                            <img className="w-10 h-10 mr-5" src={userImg} alt="" />
                            <NavLink to="/login" className="hover:text-[#16eead] font-semibold">Login</NavLink></>
                }
            </div>
        </div>
    );
};

export default Navbar;