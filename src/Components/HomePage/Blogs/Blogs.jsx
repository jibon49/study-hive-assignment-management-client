import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import background from "/blob-scene-haikei.svg"

import { FreeMode, Pagination, Navigation } from 'swiper/modules';
import { useState, useEffect } from 'react';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch('blogs-data.json')
            .then((res) => res.json())
            .then((data) => setBlogs(data));
    }, []);

    return (
        <div className="p-5 my-20 bg-cover bg-no-repeat" style={{ backgroundImage: `url(${background})` }}>
            <h1 className="text-3xl text-center font-bold mb-5">Blogs</h1>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                freeMode={true}
                pagination={{
                    clickable: true,
                }}
                modules={[FreeMode, Pagination]}
                className="mySwiper"
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                    },
                    425: {
                        slidesPerView: 1,
                    },
                    640: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                }}
            >
                {blogs.map((blog) => (
                    <SwiperSlide key={blog.id}>
                        <div className="card max-w-7xl card-compact mb-5 rounded-lg shadow-xl w-full  lg:h-[470px] p-5 bg-white">
                            <img className='rounded-lg h-[433px]' style={{ height: '400px' }} src={blog.image} alt="" />
                            <div className="card-body text-center">
                                <h2 className="text-xl text-start font-bold mb-2">{blog.title}</h2>
                                <p className='text-start'>{blog.description}</p>
                                <div className="flex items-center mb-2">
                                    <img src={blog.authorImage} alt={blog.author} className="w-8 h-8 rounded-full mr-2 object-cover" />
                                    <span className="text-gray-800">{blog.author}</span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Blogs;
