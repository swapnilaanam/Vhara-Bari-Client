import { useRef } from 'react';
import homeBannerImage from '../../../assets/images/home-banner-copy.jpg';
import { useNavigate } from 'react-router-dom';

const HomeBanner = () => {
    const citySearchRef = useRef();

    const navigate = useNavigate();

    const handleCitySearch = () => {
        const city = citySearchRef.current.value;

        navigate(`/rentalhouses?city=${city}`)
    }

    return (
        <div className="hero min-h-[660px]" style={{ backgroundImage: `url(${homeBannerImage})` }}>
            <div className="hero-overlay bg-opacity-70"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-lg">
                    <h1 className="mb-5 text-3xl lg:text-5xl font-bold">
                        <span className="text-green-500">Dreamed It?</span>
                        <span className="text-warning"> Rent It.</span></h1>
                    <p className="mb-5">
                        Everyone Has A Dream House Of Their Own! But Does Everyone Have To Own One? With Us Rent
                        Your Dream Like House!
                    </p>
                    <div className="join flex justify-center mt-7 mb-10">
                        <div>
                            <div>
                                <input className="input input-bordered join-item bg-white text-black w-48 lg:w-72 border-2 border-gray-300" placeholder="Search Rental Houses By City..." ref={citySearchRef} />
                            </div>
                        </div>
                        <div className="indicator">
                            <button onClick={handleCitySearch} className="btn btn-warning join-item px-8">Search</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeBanner;