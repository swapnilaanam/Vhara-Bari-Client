import Lottie from 'lottie-react';
import quoteAnimation from '../../../../assets/animation/qoute.json';

const Testimonial = ({ testimonial }) => {
    return (
        <div className="card w-80 lg:w-96 bg-white border border-gray-600 shadow-xl relative" data-aos="zoom-in-left" data-aos-duration="2500">
            <div className="w-full flex justify-end">
                <Lottie animationData={quoteAnimation} className="absolute w-20"/>
            </div>
            <div className="card-body items-center mt-7">
                <h2 className="card-title text-lg">{testimonial.name}, {testimonial.role}</h2>
                <p className="text-sm leading-6 text-gray-700 text-center">{testimonial.feedback}</p>
            </div>
        </div>
    );
};

export default Testimonial;