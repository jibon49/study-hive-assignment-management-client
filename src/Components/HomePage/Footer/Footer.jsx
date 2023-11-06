import { BsTelephonePlus } from 'react-icons/bs';
import { HiOutlineMailOpen } from 'react-icons/hi';
import { CiLocationOn } from 'react-icons/ci';

const Footer = () => {
    return (
        <footer className='mt-20'>
            <footer className='bg-[#16eead] p-5 flex flex-col md:flex-row justify-around text-white'>
                <h1 className='text-2xl font-bold'>Get hands on great assignment</h1>
                <div className='flex flex-col md:flex-row items-center gap-5'>
                    <h1 className='font-bold'>Follow us on</h1>
                    <div className='flex items-center gap-3'>
                        <a href=""><img className='w-7' src="https://i.ibb.co/Wskp7s4/facebook.png" alt="" /></a>

                        <a href=""><img className='w-7' src="https://i.ibb.co/YW2YCR1/instagram.png" alt="" /></a>

                        <a href=""><img className='w-7' src="https://i.ibb.co/7jSVgsg/twitter.png" alt="" /></a>

                        <a href=""><img className='w-7' src="https://i.ibb.co/fC9wtXm/github.png" alt="" /></a>
                    </div>
                </div>
            </footer>
            <footer data-aos="fade-down" className="footer p-10 md:p-20 lg:p-28">

                <nav className="lg:ml-28 text-lg">
                    <header className="footer-title">Links</header>
                    <a className="link link-hover hover:text[#16eead]">About</a>
                    <a className="link link-hover hover:text[#16eead]">Event</a>
                    <a className="link link-hover hover:text[#16eead]">FAQ</a>
                    <a className="link link-hover hover:text[#16eead]">Blog</a>
                </nav>

                <nav className="lg:ml-28 text-lg">
                    <header className="footer-title">Services</header>
                    <a className="link link-hover hover:text-[#16eead]">Help</a>
                    <a className="link link-hover hover:text-[#16eead]">Talk to us</a>
                    <a className="link link-hover hover:text-[#16eead]">Report a problem</a>
                    <a className="link link-hover hover:text-[#16eead]">Contact info</a>
                </nav>

                <nav className="text-lg">
                    <header className="footer-title">Contact</header>
                    <div className='flex items-center gap-3'>
                        <BsTelephonePlus className='text-2xl'></BsTelephonePlus>
                        <a className="link link-hover hover:text-[#16eead]">+1 763-227-5032</a>
                    </div>
                    <div className='flex items-center gap-3'>
                        <HiOutlineMailOpen className='text-2xl'></HiOutlineMailOpen>
                        <a className="link link-hover hover:text-[#16eead]">info@TechBay.com</a>
                    </div>
                    <div className='flex items-center gap-3'>
                        <CiLocationOn className='text-2xl'></CiLocationOn>
                        <a className="link link-hover hover:text-[#16eead]">2752 Willison Street Eagan,<br /> United State</a>
                    </div>

                </nav>

            </footer>
            <aside className="text-center p-5">
                <hr className="p-2" />
                <p>Copyright © 2023 - All right reserved by TechBay Ltd</p>
            </aside>
        </footer>
    );
};

export default Footer;