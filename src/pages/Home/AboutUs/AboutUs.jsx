import { Link } from "react-router-dom";

import aboutImage from '../../../assets/images/about-us.jpg';

const AboutUs = () => {
    return (

        <section
            className="overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2 sm:items-center pt-20 pb-28 px-4 md:px-0"
        >
            <div className="p-8 md:p-12 lg:px-16 lg:py-28" data-aos="fade-right"  data-aos-duration="2500">
                <div
                    className="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right"
                >
                    <h2 className="text-2xl font-medium md:text-3xl uppercase tracking-wider">
                        About Us, Our History
                    </h2>

                    <p className="hidden text-gray-700 md:mt-7 md:block mx-6">
                        We have been the leading rental house platform accross the country. Over the year, we have been a trust to million on their journey to find their perfect home.
                    </p>

                    <div className="mt-4 md:mt-8">
                        <Link
                            href="/rentalhouses"
                            className="inline-block rounded bg-emerald-600 px-12 py-3 text-sm md:text-lg font-medium text-white transition hover:bg-emerald-700 focus:outline-none focus:ring focus:ring-yellow-400"
                        >
                            Start Your Rental Journey
                        </Link>
                    </div>
                </div>
            </div>

            <img
                alt="House"
                src={aboutImage}
                className="mt-4 md:mt-0 h-full w-full object-cover sm:h-[calc(100%_-_2rem)] sm:self-end sm:rounded-ss-[30px] md:h-[calc(100%_-_4rem)] md:rounded-ss-[60px]"
                data-aos="fade-left" 
                data-aos-duration="2500"
            />
        </section>

    );
};

export default AboutUs;