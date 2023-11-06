import Banner from "../Banner/Banner";
import Blogs from "../Blogs/Blogs";
import Faq from "../Faq/Faq";
import Feature from "../Feature/Feature";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Feature></Feature>
            <Blogs></Blogs>
            <Faq></Faq>
        </div>
    );
};

export default Home;