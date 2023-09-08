import Lottie from "lottie-react";

import service1Animation from '../../../assets/animation/service.json';
import service2Animation from '../../../assets/animation/service-2.json';
import service3Animation from '../../../assets/animation/service-3.json';

const Services = () => {
    return (
        <div className="py-28 bg-green-100">
            <h2 className="text-4xl font-medium text-center">Why Choose Us?</h2>
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-center items-center lg:items-end gap-16 lg:gap-28 pt-14 text-center">
                <div className="w-80">
                    <Lottie animationData={service1Animation} className="h-72" />
                    <span className="text-2xl font-medium">Ready To Move-In Houses</span>
                    <p className="text-base font-medium mt-4">
                        Rent The House With A Click And We Handover Your Dream House Keys Within A Day.
                    </p>
                </div>
                <div className="w-80">
                    <Lottie animationData={service2Animation} className="h-72" />
                    <span className="text-2xl font-medium">Secure Verified Houses</span>
                    <p className="text-base font-medium mt-4">
                        All Rental Houses Are Checked And Verified Manually Before Appearing In Our Website.
                    </p>
                </div>
                <div className="w-80">
                    <Lottie animationData={service3Animation} className="h-64" />
                    <span className="text-2xl font-medium">Easy Card Payments</span>
                    <p className="text-base font-medium mt-4">
                        We Provide Easy Visa And Mastercard Card Payments To Pay Your Rent On Our Website.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Services;