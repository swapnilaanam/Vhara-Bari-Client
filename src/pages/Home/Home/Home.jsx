import AboutUs from '../AboutUs/AboutUs';
import Agents from '../Agents/Agents';
import Cities from '../Cities/Cities';
import Faq from '../Faq/Faq';
import FeaturedHouses from '../FeaturedHouses/FeaturedHouses/FeaturedHouses';
import HomeBanner from '../HomeBanner/HomeBanner';
import Partners from '../Partners/Partners/Partners';
import Services from '../Services/Services';
import Testimonials from '../Testimonials/Testimonials/Testimonials';

const Home = () => {
    return (
        <div className="overflow-hidden">
            <HomeBanner />
            <AboutUs />
            <Services />
            <FeaturedHouses />
            <Agents />
            <Cities />
            <Testimonials />
            <Faq />
            <Partners />
        </div>
    );
};

export default Home;