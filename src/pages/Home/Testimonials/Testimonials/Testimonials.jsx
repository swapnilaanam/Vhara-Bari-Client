import { useEffect, useState } from "react";
import Testimonial from "../Testimonial/Testimonial";
import axios from "axios";

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/testimonials')
            .then(response => setTestimonials(response.data))
            .catch(error => console.log(error));
    }, [])

    return (
        <div className="py-28 bg-green-50 px-4 lg:px-0">
            <h2 className="text-3xl font-medium text-center uppercase tracking-wider">Testimonials</h2>
            <div className="flex flex-col lg:flex-row justify-center items-center gap-20 pt-24">
                {
                    testimonials.map(testimonial => <Testimonial
                        key={testimonial._id} testimonial={testimonial}
                    >
                    </Testimonial>)
                }
            </div>
        </div>
    );
};

export default Testimonials;