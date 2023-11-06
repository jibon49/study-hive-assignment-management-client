import { useEffect, useState } from "react";
import background from "/circle-scatter-haikei.svg"

const Feature = () => {


    const [features, setFeatures] = useState([])

    useEffect(() => {
        fetch('feature-data.json')
            .then(res => res.json())
            .then(data => setFeatures(data))
    }, [])

    return (
        <div className="text-center text-[#353f58]">
            <div className="py-20 bg-cover min-h-[90vh]" style={{ backgroundImage: `url(${background})` }}>
                <h1 className="text-3xl font-bold">Learn With Friends</h1>
                <p className="">Learn with friends by doing great assignment together</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto mt-10">
                    {
                        features.map(feature => <div key={feature.id} className="hero text-start shadow-lg rounded-lg bg-white ">
                            <div className="hero-content flex-col lg:flex-row">
                                <img src={feature.icon} className="w-24" />
                                <div>
                                    <h1 className="text-xl font-bold">{feature.title}</h1>
                                    <p className="py-6">{feature.description}</p>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Feature;