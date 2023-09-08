import city1Image from '../../../assets/images/city-1.jpg';
import city1ImageAlt from '../../../assets/images/city-1-alt.jpg';
import city2Image from '../../../assets/images/city-2.jpg';
import city2ImageAlt from '../../../assets/images/city-2-alt.jpg';
import city3Image from '../../../assets/images/city-3.jpg';
import city3ImageAlt from '../../../assets/images/city-3-alt.jpg';
import { Link } from 'react-router-dom';

const Cities = () => {

    return (
        <div className="py-28 bg-gray-100 px-4 lg:px-0">
            <h2 className="text-4xl font-medium text-center mb-20">Our Journey, Through City</h2>
            <div className="max-w-7xl mx-auto grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
                <div className="rounded-lg bg-gray-100 lg:col-span-2">
                    <Link to="/rentalhouses?city=Sylhet" className="group relative block shadow-2xl">
                        <div className="relative h-[350px] sm:h-[450px]">
                            <img
                                src={city1ImageAlt}
                                alt=""
                                className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0"
                            />

                            <img
                                src={city1Image}
                                alt=""
                                className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
                            />
                        </div>

                        <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                            <h3 className="text-xl font-medium text-white bg-green-600 p-3">Sylhet</h3>

                            <p className="mt-2 max-w-[40ch] text-base bg-white p-3">
                                We Started Our Journey In The Holy City Of Sylhet.
                            </p>
                        </div>
                    </Link>
                </div>
                <div className="rounded-lg bg-gray-100">
                    <Link to="/rentalhouses?city=Dhaka" className="group relative block shadow-xl">
                        <div className="relative h-[350px] sm:h-[450px]">
                            <img
                                src={city2Image}
                                alt=""
                                className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0"
                            />

                            <img
                                src={city2ImageAlt}
                                alt=""
                                className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
                            />
                        </div>

                        <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                            <h3 className="text-xl font-medium text-white bg-green-600 p-3">Dhaka</h3>

                            <p className="mt-2 max-w-[40ch] text-base bg-white p-3">
                                We expanded in the heart of Bangladesh as our second city.
                            </p>
                        </div>
                    </Link>
                </div>
                <div className="rounded-lg bg-gray-100">
                    <Link to="/rentalhouses?city=Chittagong" className="group relative block shadow-xl">
                        <div className="relative h-[350px] sm:h-[450px]">
                            <img
                                src={city3Image}
                                alt=""
                                className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0"
                            />

                            <img
                                src={city3ImageAlt}
                                alt=""
                                className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
                            />
                        </div>

                        <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                            <h3 className="text-xl font-medium text-white bg-green-600 p-3">Chittagong</h3>
                            <p className="mt-2 max-w-[40ch] text-base bg-white p-3">
                                We had the most success in the city of sea and hills.
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cities;