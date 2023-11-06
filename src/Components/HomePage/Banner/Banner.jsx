

const Banner = () => {
    return (
        <div className="hero min-h-[90vh]" style={{ backgroundImage: 'url(https://i.ibb.co/SJ93LrM/group-students-library.jpg)' }}>
            <div className="hero-overlay bg-opacity-70"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-3xl text-white">
                    <h1 className="mb-5 text-5xl font-bold">Empowering Students</h1>
                    <p className="mb-5 text-xl">Create, Collaborate, Conquer Assignments Together</p>
                    <button className="btn btn-primary border-none bg-[#16eead] text-black hover:bg-[#6743fa]">Get Started</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;