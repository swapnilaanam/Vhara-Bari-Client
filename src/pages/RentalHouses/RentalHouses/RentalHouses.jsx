import axios from "axios";
import RentalHouse from "../RentalHouse/RentalHouse";
import { useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const RentalHouses = () => {

    const [rentalHouses, setRentalHouses] = useState();
    const [searchParams, setSearchParams] = useSearchParams();
    const [city, setCity] = useState(searchParams.get('city'));

    const searchInputRef = useRef();

    const handleSearch = () => {
        setCity(searchInputRef.current?.value);
    }

    useEffect(() => {
        if (city) {
            axios.get(`http://localhost:5000/houses?city=${city}`)
            .then(response => setRentalHouses(response.data.filter(rentalHouse => rentalHouse.status === 'Approved')));
        } else {
            axios.get(`http://localhost:5000/houses`)
            .then(response => setRentalHouses(response.data.filter(rentalHouse => rentalHouse.status === 'Approved')));
        }
    }, [city]);

    return (
        <div className="w-full min-h-screen bg-green-50 pt-20 pb-28">
            <h4 className="text-center text-3xl font-medium uppercase tracking-wider">All The Rental Houses</h4>
            <div className="join flex justify-center mt-10 mb-20">
                <div>
                    <div>
                        <input className="input join-item bg-white text-black w-52 lg:w-80 h-10 border-2 border-gray-300" placeholder="Search By City..." defaultValue={city} ref={searchInputRef} />
                    </div>
                </div>
                <div className="indicator">
                    <button onClick={handleSearch} className="bg-emerald-600 text-white font-medium join-item px-14">Search</button>
                </div>
            </div>
            <div className="px-4 max-w-7xl mx-auto flex justify-center gap-20 flex-wrap">
                {
                    rentalHouses?.length > 0 ? (
                    rentalHouses.map(rentalHouse => <RentalHouse
                        key={rentalHouse._id}
                        rentalHouse={rentalHouse}
                    >
                    </RentalHouse>
                    )) : (
                        <h2 className="mt-2 text-xl font-medium">No House Available For Rent...</h2>
                    )
                }
            </div>
        </div>
    );
};

export default RentalHouses;